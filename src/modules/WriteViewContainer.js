import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import {
  Image,
  TextInput,
  Alert,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import { addFreeWord } from '../state/UserState';
import { getImage, getSizeByWidth } from '../services/graphics';
import DoneButton from '../components/DoneButton';
import SaveConfirmationWindow from '../components/SaveConfirmationWindow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  scrollContainer: {
    paddingBottom: getSizeByWidth('done_button', 1).height,
  },
  textBoxContainer: {
    paddingVertical: 32,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  answers: state.getIn(['user', 'currentUser', 'answers']),
  freeWordKey: state.getIn(['navigatorState', 'routes', 2, 'key']),
});

const mapDispatchToProps = dispatch => ({
  back: key => dispatch(NavigationActions.back({ key })),
  pushRoute: key => dispatch(NavigationActions.navigate({ routeName: key })),
  popRoute: () => dispatch(NavigationActions.back()),
  saveFreeWord: freeWord => dispatch(addFreeWord(freeWord)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class WriteViewContainer extends Component {
  static navigationOptions = {
    title: 'Kirjoita',
  };

  static propTypes = {
    back: PropTypes.func.isRequired,
    freeWordKey: PropTypes.string,
    popRoute: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    saveFreeWord: PropTypes.func.isRequired,
    answers: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    text: '',
    showSucceedingMessage: false,
    showSpinner: false,
  };

  error = () => {
    this.setState({ showSpinner: false });
    Alert.alert(
      'Ohops!',
      'Jokin meni pieleen! Tarkista nettiyhteys tai yritä myöhemmin uudelleen!',
      [{ text: 'Ok' }],
    );
  };

  renderTextForm = () =>
    <Image
      style={{
        height: 250,
        width: getSizeByWidth('textbox', 0.9).width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
      resizeMode="stretch"
      source={getImage('textbox').normal}
    >
      <TextInput
        multiline
        autoFocus={!this.state.text}
        numberOfLines={30}
        maxLength={500}
        onChangeText={text => this.setState({ text })}
        underlineColorAndroid="transparent"
        style={{
          flex: 1,
          textAlignVertical: 'top',
          margin: 16,
          fontFamily: 'Roboto-Regular',
        }}
      />
    </Image>;

  sendText = async () => {
    await this.props.saveFreeWord({ type: 'text', content: this.state.text });
    this.setState({ showSucceedingMessage: true });
  };

  renderDoneButton = () =>
    <DoneButton
      onPress={this.sendText.bind(this)}
      disabled={this.state.text.length === 0}
    />;

  hideSucceedingMessage = () => {
    if (this.state.showSucceedingMessage) {
      this.setState({ showSucceedingMessage: false });
      this.props.back(this.props.freeWordKey);
    }
  };

  renderSaveConfirmationWindow = () =>
    <SaveConfirmationWindow
      closeWindow={this.hideSucceedingMessage}
      visible={this.state.showSucceedingMessage}
    />;

  render() {
    if (this.state.showSpinner) {
      return <LoadingSpinner />;
    }

    return (
      <Image source={getImage('forest').normal} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          overScrollMode={'always'}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.textBoxContainer}>
            {this.renderTextForm()}
          </View>
        </ScrollView>
        {this.renderDoneButton()}
        {this.renderSaveConfirmationWindow()}
      </Image>
    );
  }
}
