import React, {PropTypes} from 'react';
import {
  Animated,
  NavigationExperimental as Navigation
} from 'react-native';

const NavigationTabView = React.createClass({
  propTypes: {
    router: PropTypes.func.isRequired,
    navigationState: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
    shouldRenderHeader: PropTypes.bool,
    viewUserProfile: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {shouldRenderHeader: true};
  },

  renderHeader(props) {
    return (
      <Navigation.Header
        {...props}
        getTitle={state => state.key}
      />
    );
  },

  renderScene(props) {
    console.log('RENDERING SCENE ' + props.scene.navigationState.key);
    return (
      <Navigation.Card
        {...props}
        key={props.scene.navigationState.key}
        renderScene={this.props.router}
        viewUserProfile={this.props.viewUserProfile}
      />
    );
  },

  render() {
    return (
      <Navigation.AnimatedView
        style={{flex: 1}}
        navigationState={this.props.navigationState}
        onNavigate={this.props.onNavigate}
        //selectUser={this.props.selectUser}
        //renderOverlay={this.props.shouldRenderHeader ? this.renderHeader : null}
        renderScene={this.renderScene}
        applyAnimation={(pos, navState) => {
          // This is the default animation. We redefine it here to be
          // able to attach a onComplete handler
          Animated
            .spring(pos, {toValue: navState.index, bounciness: 0})
            .start(() => {
              this.props.onNavigate({type: 'animation-completed'});
            });
        }}
      />
    );
  }
});

export default NavigationTabView;
