import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import AudioRecorder from '../components/AudioRecorder';
import LoadingSpinner from '../components/LoadingSpinner';
import { addFreeWord } from '../state/UserState';

const mapStateToProps = state => ({
  answers: state.getIn(['user', 'currentUser', 'answers']),
  text: state.getIn(['hemmo', 'text']),
  audio: state.getIn(['hemmo', 'audio']),
  freeWordKey: state.getIn(['navigatorState', 'routes', 2, 'key']),
});

const mapDispatchToProps = dispatch => ({
  back: key => dispatch(NavigationActions.back({ key })),
  pushRoute: key => dispatch(NavigationActions.navigate({ routeName: key })),
  popRoute: () => dispatch(NavigationActions.back()),
  saveFreeWord: freeWord => dispatch(addFreeWord(freeWord)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RecordViewContainer extends Component {
  static navigationOptions = {
    title: 'Nauhoita',
  };

  static propTypes = {
    back: PropTypes.func.isRequired,
    popRoute: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    freeWordKey: PropTypes.string,
    saveFreeWord: PropTypes.func.isRequired,
    answers: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    text: '',
    activeWidget: null,
    showTextForm: false,
    progress: 0,
    showSucceedingMessage: false,
    showSpinner: false,
    recordType: null,
  };

  error = () => {
    this.setState({ showSpinner: false });
    Alert.alert(
      'Ohops!',
      'Jokin meni pieleen! Tarkista nettiyhteys tai yritä myöhemmin uudelleen!',
      [{ text: 'Ok' }],
    );
  };

  storeRecording = (type, content) => {
    this.props.saveFreeWord({ type, content });
    this.setState({ recordType: type });
    this.props.back(this.props.freeWordKey);
  };

  render() {
    if (this.state.showSpinner) {
      return <LoadingSpinner />;
    }

    return (
      <AudioRecorder
        save={this.storeRecording}
        disabled={this.props.text.length > 0 || this.props.audio.length > 0}
      />
    );
  }
}
