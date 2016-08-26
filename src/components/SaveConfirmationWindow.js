import React, {PropTypes} from 'react';
import Hemmo from './Hemmo';
import SpeechBubble from './SpeechBubble';
import {getSize, getImage} from '../services/graphics';
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

const SaveConfirmationWindow = React.createClass({

  propTypes: {
    closeWindow: PropTypes.func,
    phase: PropTypes.string
  },

  close() {
    this.props.closeWindow(this.props.phase);
  },

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.close}>
        <View style={styles.container}>
          <Hemmo image={'hemmo_keski'} size={0.8}/>
          <SpeechBubble
            text={'saved'}
            hideBubble={this.close}
            bubbleType={'puhekupla_tallennettu'}
            style={{top: 100, left: 350, margin: 10, fontSize: 16, size: 0.4}}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(184, 184, 184, 0.9)'
  }
});

export default SaveConfirmationWindow;
