import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as NavigationState from '../modules/navigation/NavigationState';
import SpeechBubbleView from '../components/SpeechBubbleView';
import Hemmo from '../components/Hemmo';
import {getSize, getImage} from '../services/graphics';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const EndingView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      showBubble: true
    };
  },

  startOver() {
    this.props.dispatch(NavigationState.resetRoute());
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  restartAudioAndText() {
    this.setState({showBubble: true});
  },

  render() {

    if (this.state.showBubble === true) {
      var speechBubble = (
        <SpeechBubbleView
          text={'ending'}
          hideBubble={this.hideBubble}
          bubbleType={'puhekupla_oikea'}
          style={{top: 40, left: 100, margin: 45, fontSize: 14, size: 0.5}}/>
      );
    }
    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        <View style={styles.hemmo}>
          <Hemmo image={'hemmo_keski'} size={0.8} restartAudioAndText={this.restartAudioAndText}/>
        </View>
          <TouchableOpacity onPress={this.startOver} style={styles.info}>
            <Image source={getImage('lopetusteksti')} style={getSize('lopetusteksti', 0.4)}/>
          </TouchableOpacity>
        {speechBubble}
      </Image>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  info: {
    position: 'absolute',
    left: 20,
    bottom: 20
  },
  hemmo: {
    position: 'absolute',
    bottom: 50,
    right: 20
  }
});

export default connect()(EndingView);
