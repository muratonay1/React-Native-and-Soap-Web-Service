import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import RouterControl from '././RouterControl';
import {Actions, Router} from 'react-native-router-flux';
import User from '../User';

console.disableYellowBox = true;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;


export default class PageContainer extends Component{
    constructor(props)
    {
        super(props);
        this.state={
          searchIconColor:'#88cc00',
          settingsIconColor:'black',
          adverIconColor:'black',
        }
    }
   ChoosePage=async(text)=>{
     if(text=="search")
     {
        
        this.setState({searchIconColor:'#88cc00'})
        this.setState({settingsIconColor:'black'})
        await this.setState({adverIconColor:'black'})
        Actions.UlkeSec_search1();
     }
     if(text=="settings")
     {
        this.setState({searchIconColor:'black'})
        this.setState({settingsIconColor:'#88cc00'})
        await this.setState({adverIconColor:'black'})
        if(User.E_mail==null && User.Sifre==null)
        {
          Actions.Settings_settings1();
        }
        if(User.E_mail!=null && User.Sifre!=null)
        {
          Actions.Settings_MainSettings();
        }       
     }
     if(text=="advertisements")
     {
        this.setState({searchIconColor:'black'})
        this.setState({settingsIconColor:'black'})
        await this.setState({adverIconColor:'#88cc00'})
        Actions.Adver_Main();
     }
   } 
  render(){
    return(
      <SafeAreaView style={{flex:1}}>
        <View style={{flex:16, backgroundColor:'snow'}}>
          <RouterControl/>
        </View>

        <View style={{flex:1,backgroundColor:'#484848',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',height:height*0.1}}>

            <TouchableOpacity onPress={
              () => {
                this.ChoosePage("search")
              }
            } 
            style={{width:40,height:40,justifyContent:'center',alignItems:'center',flex:1,borderRadius:15}}>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                
                    <Icon name="search" size={25} color={this.state.searchIconColor}/>
                
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={
              () => {
                 
                this.ChoosePage("advertisements")
                }
            } 
            style={{width:40,height:40,justifyContent:'center',alignItems:'center',borderRadius:15,flex:1}}>
            <View  style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            
                <Icon1 name="appstore1" size={25} color={this.state.adverIconColor}/>
            
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={
              () => {
                 
                this.ChoosePage("settings")
                }
            } 
            style={{width:40,height:40,justifyContent:'center',alignItems:'center',borderRadius:15,flex:1}}>
              <View  style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              
                  <Icon name="users-cog" size={25} color={this.state.settingsIconColor}/>
              
              </View>
            </TouchableOpacity>
    
        </View>
        
      </SafeAreaView>
    )
  }
}