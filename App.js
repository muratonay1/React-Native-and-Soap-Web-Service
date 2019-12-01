import React,{Component} from 'react';
import {View,Text,StyleSheet,StatusBar} from 'react-native';
import RouterControl from './Components/Screens/RootPageControl/RouterControl';
import PageContainer from './Components/Screens/RootPageControl/PageContainer';
import StartSlider from './Components/Screens/SliderComponent/StartSlider';
import UlkeSec from './Components/Screens/SearchPageComponent/UlkeSec_search1';
import SliderRouter from './Components/Screens/RootPageControl/SliderRouter';

export default class App extends Component{
  SliderSecme=()=>{
    if(1==10)/**BURADA DAHA ÖNCEDEN UYGULAMAYA GİRİLİP GİRİLMEDİĞİ KONTROL EDİLECEK İLK DEFA GİRECEKSE SLİDER VE TANITIM GÖSTERİLECEK */
    {
        return <StartSlider/>
    }
    else{
        return <PageContainer/>
    }
  }
  render(){
    return(
      <View style={{flex:1}}>
                <StatusBar hidden />
                {this.SliderSecme()}
            </View>
    )
  }
}