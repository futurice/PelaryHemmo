import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { Image, View, ScrollView, StyleSheet, Modal, Text } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { addActivity, deleteActivity } from '../state/UserState';
import { setText, setAudio } from '../state/HemmoState';
import { getImage, getSizeByWidth, getFontSize } from '../services/graphics';
import AppButton from '../components/AppButton';
import { showSaveModal } from '../state/SessionState';
import DoneButton from '../components/DoneButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
  },
  thumbModal: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainActivity: {
    alignSelf: 'center',
    marginTop: getFontSize(2),
  },
  subActivityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  subActivity: {
    margin: getFontSize(1),
  },
  chosenThumb: {
    position: 'absolute',
    alignSelf: 'flex-start',
    right: 0,
  },
  titleRow: {},
  closeButton: {
    position: 'absolute',
    top: getFontSize(2),
    left: getFontSize(2),
  },
  subActivityThumbImage: {
    margin: getFontSize(3),
    alignSelf: 'center',
  },
  thumbRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbModalQuestion: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'ComicNeue-Bold',
    fontSize: getFontSize(2),
  },
  voteButton: {
    margin: getFontSize(1),
  },
  selectedThumbButton: {
    margin: getFontSize(1),
  },
  unselectedThumbButton: {
    margin: getFontSize(1),
    opacity: 0.5,
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: getFontSize(3),
  },
});

const activities = require('../data/activities.js');

const animationDuration = 300;

const thumbs = [
  { value: 1, imageName: 'thumb_up' },
  { value: 0, imageName: 'thumb_middle' },
  { value: -1, imageName: 'thumb_down' },
];

const mapStateToProps = state => ({
  chosenActivities: state.getIn([
    'user',
    'currentUser',
    'answers',
    'activities',
  ]),
});

const mapDispatchToProps = dispatch => ({
  addActivity: activity => dispatch(addActivity(activity)),
  deleteActivity: activity => dispatch(deleteActivity(activity)),
  setText: text => dispatch(setText(text)),
  setAudio: audio => dispatch(setAudio(audio)),
  showSaveModal: () => dispatch(showSaveModal()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ActivityViewContainer extends Component {
  static navigationOptions = {
    title: 'Tekeminen',
    headerRight: <View />, // Needed for a centered title,
    headerTitleStyle: styles.headerTitle,
    headerStyle: { height: getFontSize(8) },
  };

  static propTypes = {
    addActivity: PropTypes.func.isRequired,
    deleteActivity: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
    chosenActivities: PropTypes.instanceOf(Map).isRequired,
    showSaveModal: PropTypes.func.isRequired,
  };

  state = {
    modalVisible: false,
    chosenMainActivity: Map(),
    chosenSubActivity: Map(),
  };

  getSubActivityHeight = () =>
    getSizeByWidth('leikkiminen', 0.5).height + 2 * 5;

  getMainActivityHeight = () => getSizeByWidth('puuhasimme', 1).height + 2 * 5;

  chooseMainActivity = async activity => {
    const margin = 5;

    setTimeout(
      () =>
        this.scrollView.scrollTo({
          y:
            activity.get('id') *
            (getSizeByWidth('puuhasimme', 1).height + 2 * margin),
        }),
      0,
    );

    if (this.state.chosenMainActivity.get('id') === activity.get('id')) {
      await this.props.setAudio('');

      this.setState({
        chosenMainActivity: Map(),
      });
    } else {
      this.setState({
        chosenMainActivity: activity,
      });

      await this.props.setAudio(activity.get('audio'));
    }
  };

  chooseSubActivity = async subActivity => {
    await this.props.setAudio(subActivity.get('audio'));
    this.setState({ chosenSubActivity: subActivity, modalVisible: true });
  };

  chooseThumb = async thumbValue => {
    if (this.isSelected(thumbValue)) {
      await this.props.deleteActivity({
        main: this.state.chosenMainActivity.get('name'),
        sub: this.state.chosenSubActivity.get('name'),
      });
    } else {
      await this.props.addActivity({
        main: this.state.chosenMainActivity.get('name'),
        sub: this.state.chosenSubActivity.get('name'),
        thumb: thumbValue,
      });

      setTimeout(this.closeModal, 1000);
    }
  };

  closeModal = () => {
    this.props.setText('');
    this.props.setAudio('');

    this.setState({
      modalVisible: false,
      chosenSubActivity: Map(),
    });
  };

  isSelected = thumbValue =>
    thumbValue ===
    this.props.chosenActivities.getIn([
      this.state.chosenMainActivity.get('name'),
      this.state.chosenSubActivity.get('name'),
    ]);

  renderThumbButton = (thumb, i) =>
    <View
      key={i}
      style={
        this.isSelected(thumb.value)
          ? styles.selectedThumbButton
          : styles.unselectedThumbButton
      }
    >
      <AppButton
        background={thumb.imageName}
        onPress={() => this.chooseThumb(thumb.value)}
        width={getSizeByWidth('thumb_up', 0.2).width}
        shadow={this.isSelected(thumb.value)}
      />
    </View>;

  renderThumbButtons = () =>
    thumbs.map((thumb, i) => this.renderThumbButton(thumb, i));

  renderCloseButton = () =>
    <View style={styles.closeButton}>
      <AppButton
        background="close_small"
        onPress={this.closeModal}
        width={getSizeByWidth('close_small', 0.12).width}
      />
    </View>;

  renderThumbButtonRow = () =>
    <View style={styles.thumbRow}>
      {this.renderThumbButtons()}
    </View>;

  renderThumbModal = () =>
    this.state.modalVisible
      ? <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.thumbModal}>
            <Image
              source={getImage('modal').normal}
              style={getSizeByWidth('modal', 0.9)}
            >
              <View style={styles.titleRow}>
                {this.renderCloseButton()}
                <Image
                  source={
                    getImage(this.state.chosenSubActivity.get('key')).normal
                  }
                  style={[
                    styles.subActivityThumbImage,
                    getSizeByWidth('leikkiminen', 0.35),
                  ]}
                />
              </View>
              <Text style={styles.thumbModalQuestion}>
                {this.state.chosenSubActivity.get('text')}
              </Text>
              {this.renderThumbButtonRow()}
            </Image>
          </View>
        </Modal>
      : null;

  renderChosenThumb = thumb =>
    thumb !== undefined
      ? <Image
          source={getImage(thumb.imageName).shadow}
          style={[styles.chosenThumb, getSizeByWidth(thumb.imageName, 0.18)]}
        />
      : null;

  renderSubActivity = (subActivity, index) => {
    const existingThumbValue = this.props.chosenActivities.getIn([
      this.state.chosenMainActivity.get('name'),
      subActivity.get('name'),
    ]);

    const thumb = thumbs.find(t => t.value === existingThumbValue);

    return (
      <View style={styles.subActivity} key={index}>
        <AppButton
          background={subActivity.get('key')}
          onPress={() => this.chooseSubActivity(subActivity)}
          width={getSizeByWidth('leipominen', 0.43).width}
          shadow
        >
          {this.renderChosenThumb(thumb)}
        </AppButton>
      </View>
    );
  };

  renderSubActivities = mainActivity =>
    <View style={styles.subActivityContainer}>
      {mainActivity
        .get('subActivities')
        .map((subActivity, index) =>
          this.renderSubActivity(subActivity, index),
        )}
    </View>;

  renderMainActivity = (mainActivity, index) =>
    <View style={styles.mainActivity} key={index}>
      <AppButton
        background={mainActivity.get('key')}
        onPress={() => this.chooseMainActivity(mainActivity)}
        width={getSizeByWidth('puuhasimme', 0.9).width}
        shadow
      />
    </View>;

  renderMainActivities = () =>
    <ScrollView
      /**
       * This is a hack which allows scrolling to positions currently outside of
       * the ScrollView. As soon as an activity is selected, expand the scrolling
       * view height to equal to the height of all visible activities and
       * subactivities.
       */
      contentContainerStyle={{
        minHeight: this.state.chosenMainActivity.isEmpty()
          ? null
          : activities.length * this.getMainActivityHeight() +
            Math.ceil(
              this.state.chosenMainActivity.get('subActivities').size /
                2 *
                this.getSubActivityHeight(),
            ),
        paddingBottom: getSizeByWidth('done_button', 1).height,
      }}
      ref={scrollView => {
        this.scrollView = scrollView;
      }}
    >
      <Accordion
        align="bottom"
        duration={animationDuration}
        sections={activities}
        activeSection={
          !this.state.chosenMainActivity.isEmpty()
            ? this.state.chosenMainActivity.get('id')
            : false
        }
        renderHeader={this.renderMainActivity}
        renderContent={this.renderSubActivities}
        underlayColor={'#fff'}
      />
    </ScrollView>;

  render() {
    return (
      <Image source={getImage('forest').normal} style={styles.container}>
        {this.renderMainActivities()}
        {this.renderThumbModal()}
        <DoneButton
          onPress={this.props.showSaveModal}
          disabled={this.props.chosenActivities.size === 0}
        />
      </Image>
    );
  }
}
