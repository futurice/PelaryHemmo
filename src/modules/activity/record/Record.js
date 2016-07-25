import React, {PropTypes} from 'react';
import {List} from 'immutable';
import Button from '../../../components/Button';
import Hemmo from '../../../components/Hemmo';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import SpeechBubbleView from '../../../components/SpeechBubbleView';
import ProgressBarClassic from 'react-native-progress-bar-classic';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

var TimerMixin = require('react-timer-mixin');
var styles = require('./styles.js');
var activities = require('../activities.js');
var buttonPanel;

const Record = React.createClass({

  propTypes: {
    savedActivities: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired
  },
  mixins: [TimerMixin],

  getInitialState() {
    return {
      enableWriting: false,
      showBubble: true,
      progress: 0,
      recording: false,
      generalFeedbackView: false
    };
  },

  enableWriting() {
    this.setState({enableWriting: true});
  },

  disableWriting() {
    this.setState({enableWriting: false});
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  renderBubble(text, x, y, triangle) {
    if (this.state.showBubble === true) {
      return (<SpeechBubbleView
        text={text}
        hideBubble={this.hideBubble}
        position={{x, y, triangle}}/>);
    }
    else {
      return null;
    }
  },

  // TODO: SAVE WRITTEN TEXT TO STATE
  saveText() {
    this.moveToNext();
  },

  skip() {
    this.moveToNext();
  },

  moveToNext() {
    if (this.props.activityIndex === -1) {
      if (this.state.generalFeedbackView === false) {
        this.setState({enableWriting: false, showBubble: true, progress: 0, generalFeedbackView: true});
        this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: false}));
      }
      else {
        this.props.dispatch(NavigationState.pushRoute({key: 'End', allowReturn: false}));
      }
    }
    else {
      this.props.dispatch(NavigationState.pushRoute({key: 'NewRound', allowReturn: false}));
    }
  },

  record() {
    this.setInterval(
      () => {
        console.log('Up up up!');
        this.setState({progress: this.state.progress + 1});
      },
      1000
    );
  },

  renderTitlePanel() {
    var i = this.props.savedActivities.get(this.props.activityIndex).get('main');
    var j = this.props.savedActivities.get(this.props.activityIndex).get('sub');
    return (
      <View style={styles.titleRow}>
        <Text style={styles.mainTitle}>{activities[i].get('key')}</Text>
        <Text style={styles.subtitle}>{activities[i].get('subActivities').get(j)}</Text>
      </View>
    );
  },

  renderRecordPanel() {
    return (
      <View style={styles.recordRow}>
        <View style={styles.buttonArea}>
          <TouchableOpacity onPress={this.record} style={styles.recHighlight}>
            <View style={styles.rec}/>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <ProgressBarClassic valueStyle={'none'} progress={this.state.progress} />
        </View>
      </View>
    );
  },

  renderButtonPanel(icon, text, onPress) {
    var saveOrWriteButton = (<Button
      style={styles.writeButton} highlightStyle={styles.writeButtonHighlight}
      onPress={onPress} text={text} icon={icon}/>);

    var skipButton = (<Button
      style={styles.skipButton} highlightStyle={styles.skipButtonHighlight}
      onPress={this.skip} text={'Ohita'} icon={'angle-right'}/>);

    return (
      <View style={styles.extraRow}>
        {saveOrWriteButton}
        {skipButton}
      </View>
    );
  },

  renderWritingPanel() {
    return (
      <View style={styles.writingContainer}>
        <View style={styles.textInput}>
          <TextInput
            multiline = {true}
            numberOfLines = {30}
            maxLength = {150}
            underlineColorAndroid = 'transparent'
            style={styles.textForm}/>
        </View>
        <Icon onPress={this.disableWriting} name='times-circle' size={40} style={styles.closeButton}/>
      </View>
    );
  },

  render() {

    var speechBubble;

    if (this.props.activityIndex === -1) {
      if (this.state.generalFeedbackView === false) {
        speechBubble = this.renderBubble('emotionFeedback', 40, 180, 260);
      }
      else {
        speechBubble = this.renderBubble('generalFeedback', 20, 260, 180);
      }
    }
    else {
      var titlePanel = this.renderTitlePanel();
      speechBubble = this.renderBubble('record', 10, 150, 330);
    }

    var actionPanel = this.renderRecordPanel();

    if (this.state.enableWriting === true) {
      var writingView = this.renderWritingPanel();
      buttonPanel = this.renderButtonPanel('save', 'Tallenna', this.saveText);
    }
    else {
      buttonPanel = this.renderButtonPanel('pencil', 'Kirjoita', this.enableWriting);
    }
    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          {titlePanel}
          {actionPanel}
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.hemmoRow}>
            <Hemmo x={40} y={100}/>
          </View>
          {buttonPanel}
        </View>
        {writingView}
        {speechBubble}
      </View>
    );
  }
});

export default Record;
