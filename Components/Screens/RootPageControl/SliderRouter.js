import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import StartSlider from '../SliderComponent/StartSlider';
import PageContainer from './PageContainer';
export default class SliderRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key='Root'>
        
          <Scene key="StartSlider" component={StartSlider} hideNavBar/>
          <Scene key="PageContainer" component={PageContainer} initial hideNavBar/>
            
        </Scene>
      </Router>
    )
  }
}