import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Linking,
    ScrollView,
    ImageBackground,
    Image,
    FlatList,
    TouchableHighlight,
    TextInput
} from 'react-native';
import {Avatar,Tooltip,Button,Input,Tile,PricingCard} from 'react-native-elements';
import Star from 'react-native-star-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {Actions} from 'react-native-router-flux';
import User from '../User';

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
var isim=User.Isim;
var email=User.E_mail;
var telefon=User.Telefon;
export default class Settings_MainHesapBilgileri extends Component{
    render(){
        const inputStyle={
            fontSize: 14,
            textAlign:'center',
            width:'80%',
            marginRight:20
        };
        const header={
            fontSize: 18,
            textAlign:'center',
            width:'80%',
            color:'snow',
            fontFamily:'Rajdhani-Regular',
            marginRight:29
        };
        return(
            <ScrollView>
                <View style={{flex:1}}>
                    <View style={{flex:1,marginTop:20,justifyContent:'center',backgroundColor:'gray',alignItems:'center',height:height*0.1,flexDirection:'row'}}>
                        <View style={{flex:1,flexDirection:'column',marginLeft:15}}>
                            <TouchableOpacity onPress={()=>Actions.Settings_MainSettings()}>
                                <Icon1 name="leftcircleo" size={35} color="white"/>
                            </TouchableOpacity>
                            
                        </View>
                        
                        <View style={{flex:8,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <Text style={header}>Hesap Bilgileri</Text>
                        </View>
                    
                    </View>

                    <View style={{flex:1,marginTop:20,justifyContent:'center',alignItems:'center'}}>
                        <Input
                            value={""+User.Isim}
                            editable={true}
                            inputStyle={inputStyle}
                            leftIcon={{ type: 'materialicons', name: 'business-center' }}
                        />
                    </View>

                    <View style={{flex:1,marginTop:20,justifyContent:'center',alignItems:'center'}}>
                        <Input
                            value={""+User.E_mail}
                            editable={true}
                            inputStyle={inputStyle}
                            leftIcon={{ type: 'materialicons', name: 'email' }}
                        />
                    </View>

                    <View style={{flex:1,marginTop:20,justifyContent:'center',alignItems:'center'}}>
                        <Input
                            value={""+User.Telefon}
                            editable={true}
                            inputStyle={inputStyle}
                            leftIcon={{ type: 'materialicons', name: 'phone' }}
                        />
                    </View>

                    <View style={{flex:1,marginTop:20,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:width*0.55,height:height*0.07,backgroundColor:'#4285F4',borderRadius:11}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    <Icon1 name="save" size={25} color="white"/>
                                </View>
                                <View style={{flex:6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'white',fontFamily:'Rajdhani-Regular',fontWeight:'bold',marginRight:13}}>Kaydet</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                
            </ScrollView>
        )
    }
}