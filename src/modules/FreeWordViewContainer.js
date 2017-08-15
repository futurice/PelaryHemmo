import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import { Image, View, StyleSheet, ScrollView } from 'react-native';

import AppButton from '../components/AppButton';
import DoneButton from '../components/DoneButton';
import { getImage, getSizeByWidth } from '../services/graphics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  scrollContainer: {
    paddingBottom: getSizeByWidth('done_button', 1).height,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  answers: state.getIn(['user', 'currentUser', 'answers']),
});

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(NavigationActions.back()),
  pushRoute: key => dispatch(NavigationActions.navigate({ routeName: key })),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FreeWordViewContainer extends Component {
  static navigationOptions = {
    title: 'Kerro vapaasti',
  };

  static propTypes = {
    back: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    answers: PropTypes.instanceOf(Map).isRequired,
  };

  renderRecordButton = () =>
    <View style={{ paddingVertical: 16 }}>
      <AppButton
        width={getSizeByWidth('record', 0.9).width}
        onPress={() => this.props.pushRoute('Record')}
        background="record"
        shadow
      />
    </View>;

  renderWriteButton = () =>
    <View style={{ paddingVertical: 16 }}>
      <AppButton
        width={getSizeByWidth('write', 0.9).width}
        onPress={() => this.props.pushRoute('Write')}
        background="write"
        shadow
      />
    </View>;

  renderDoneButton = () =>
    <DoneButton
      onPress={this.props.back}
      disabled={this.props.answers.get('freeWord').size === 0}
    />;

  render() {
    return (
      <Image source={getImage('forest').normal} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          overScrollMode={'always'}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.buttonContainer}>
            {this.renderRecordButton()}
            {this.renderWriteButton()}
          </View>
        </ScrollView>
        <View style={styles.doneButton}>
          {this.renderDoneButton()}
        </View>
      </Image>
    );
  }
}
