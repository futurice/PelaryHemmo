import React from 'react';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeViewContainer from '../HomeViewContainer';
import LoginViewContainer from '../LoginViewContainer';
import SettingsViewContainer from '../settings/SettingsViewContainer';
import ActivityViewContainer from '../ActivityViewContainer';
import FreeWordViewContainer from '../FreeWordViewContainer';
import MoodViewContainer from '../MoodViewContainer';
import EndingViewContainer from '../EndingViewContainer';
import NavigationModal from './NavigationModal';
import Hemmo from './Hemmo';

const HomeNavigator = StackNavigator(
  {
    Home: { screen: HomeViewContainer },
    Login: { screen: LoginViewContainer },
    Settings: { screen: SettingsViewContainer },
  }, {
    headerMode: 'none',
    initialRouteName: 'Home',
    transitionConfig: () => ({
      screenInterpolator: (sceneProps) => {
        // Disable the transition animation when resetting to the home screen
        if (
          sceneProps.index === 0 &&
          sceneProps.scene.route.routeName !== 'Home' &&
          sceneProps.scenes.length > 2
        ) return null;

        // Otherwise, use the usual horizontal animation
        return CardStackStyleInterpolator.forHorizontal(sceneProps);
      },
    }),
  },
);

const FeedbackNavigator = TabNavigator(
  {
    Activity: { screen: ActivityViewContainer },
    Mood: { screen: MoodViewContainer },
    FreeWord: { screen: FreeWordViewContainer },
    Ending: { screen: EndingViewContainer },
  }, {
    initialRouteName: 'Activity',
    swipeEnabled: true,
    lazy: true,
    backBehavior: 'none',
  },
);

const FeedbackNavigatorWithHeader = StackNavigator(
  {
    FeedbackWithHeader: {
      screen: FeedbackNavigator,
      navigationOptions: ({ navigation }) => (
        {
          headerLeft: <NavigationModal />,
          headerRight: <Hemmo navigation={navigation} />,
          headerStyle: { backgroundColor: '#FFFFFF' },
        }
      ),
    },
  },
);

const AppNavigator = StackNavigator(
  {
    Home: { screen: HomeNavigator },
    Feedback: {
      screen: FeedbackNavigatorWithHeader,
    },
  }, { headerMode: 'none', initialRouteName: 'Home' },
);

export default AppNavigator;
