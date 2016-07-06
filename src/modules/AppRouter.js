/*eslint-disable react/prop-types*/

import React from 'react';
import HomeViewContainer from './home/HomeViewContainer';
import SettingsViewContainer from './settings/SettingsViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const onNavigate = props.onNavigate;
  const key = props.route.key;

  console.log('NAVIGATION KEY ON ' + key);

  if (key === 'Home') {
    return <HomeViewContainer onNavigate={onNavigate}/>;
  }
  else if (key === 'Settings') {
    return <SettingsViewContainer onNavigate={onNavigate}/>;
  }

  throw new Error('Unknown navigation key: ' + key);
}
