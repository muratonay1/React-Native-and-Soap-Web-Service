import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import UlkeSec_search1 from '../SearchPageComponent/UlkeSec_search1';
import Settings_settings1 from '../SettingsPageComponent/Settings_settings1';
import Ilanlar_search2 from '../SearchPageComponent/Ilanlar_search2';
import MeslekIcerik_search3 from '../SearchPageComponent/MeslekIcerik_search3';
import Profile_search4 from '../SearchPageComponent/Profile_search4';
import Settings_settingsKayit from '../SettingsPageComponent/Settings_settingsKayit';
import Settings_MainSettings from '../SettingsPageComponent/Settings_MainSettings';
import Settings_MainHesapBilgileri from '../SettingsPageComponent/Settings_MainHesapBilgileri';
import Settings_MainSifreDegistir from '../SettingsPageComponent/Settings_MainSifreDegistir';
import Settings_MainAdresBilgileri from '../SettingsPageComponent/Settings_MainAdresBilgileri';
import Adver_Main from '../AdverPageComponent/Adver_Main';
import deneme from '../AdverPageComponent/deneme';
import deneme1 from '../AdverPageComponent/deneme1';

export default class RouterControl extends Component {
  render() {
    return (
      <Router>
        <Scene key='Root'>                 
            <Scene key="UlkeSec_search1" component={UlkeSec_search1}  initial  hideNavBar />
            <Scene key="Ilanlar_search2" component={Ilanlar_search2}   />
            <Scene key="MeslekIcerik_search3" component={MeslekIcerik_search3}  />
            <Scene key="Profile_search4" component={Profile_search4}    />
            <Scene key="Settings_settings1" component={Settings_settings1}  hideNavBar />
            <Scene key="Settings_MainSettings" component={Settings_MainSettings}  hideNavBar />
            <Scene key="Settings_MainHesapBilgileri" component={Settings_MainHesapBilgileri}   hideNavBar />
            <Scene key="Settings_MainSifreDegistir" component={Settings_MainSifreDegistir}  hideNavBar />
            <Scene key="Settings_settingsKayit" component={Settings_settingsKayit}   hideNavBar />
            <Scene key="Settings_MainAdresBilgileri" component={Settings_MainAdresBilgileri}   hideNavBar />
            <Scene key="Adver_Main" component={Adver_Main}  hideNavBar  />
            <Scene key="deneme" component={deneme}   hideNavBar  />
            <Scene key="deneme1" component={deneme1}   hideNavBar  />                    
        </Scene>
      </Router>
    )
  }
}