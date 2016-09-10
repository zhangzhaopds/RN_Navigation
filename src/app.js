

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import Login from './Login';

class RN_Navigation extends Component {

  render() {
    let defaultName = 'Login';
    let defaultComponent = Login;
    return (
      <Navigator
      initialRoute={{name: defaultName, component: defaultComponent}}
      configureScene={(route) => {
        return Navigator.SceneConfigs.PushFromRight;
      }}
      renderScene={(route, navigator) => {
        global.navi = navigator;
        let Component = route.component;
        return (
          <Component {...route.params} navigator={navigator} />
        );
      }} />

    );
  }
}

AppRegistry.registerComponent('RN_Navigation', () => RN_Navigation);
