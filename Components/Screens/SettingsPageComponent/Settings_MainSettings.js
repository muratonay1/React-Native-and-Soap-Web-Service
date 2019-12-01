import React,{Component} from 'react';
import {View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Actions} from 'react-native-router-flux';
import {Avatar,Tooltip,Button,Input,Tile} from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/FontAwesome';
import User from '../User';
console.disableYellowBox = true;

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class Settings_MainSettings extends Component{
  UygulamadanCikis=()=>{
    User.Id=null;
    User.Isim=null;
    User.Soyisim=null;
    User.E_mail=null;
    User.Telefon=null;
    User.Sifre=null;
    User.Sehir_id=null;
    User.Ilce_id = null;
    User.Sehir_ismi=null;
    User.Ilce_ismi=null;
    Actions.Settings_settings1();

  }
  
  render(){
    const inputStyle={
      fontSize: 10,
      textAlign:'center',
      width:'80%',
      marginRight:20,
      color:'#696969'
    };
    const buttonstyle={
      fontSize: 10,
      
    };
    return(
        <ScrollView>
          <View style={{flex:1}}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Avatar
              source={{
              uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              style={{width:width*0.4,height:height*0.25,marginTop:15,marginBottom:15,}}
              rounded/>
            </View>

            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',fontSize:15,marginTop:15}}>Hesap Bilgileri</Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity style={{backgroundColor:'snow',width:width*0.9,height:height*0.15,borderRadius:8}} onPress={()=>Actions.Settings_MainHesapBilgileri()}>
                <Text style={styles.bilgiler}>{User.Isim}</Text>
                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                  <View style={{flex:4}}>
                    <Text style={styles.bilgiler}>{User.E_mail}</Text>
                  </View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Icon name="rightcircleo" size={25} color="#25D366"/>
                  </View>
                </View>
                <Text style={styles.bilgiler}>{User.Telefon}</Text>
              </TouchableOpacity>
            </View>

            <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center',marginTop:15,flex:1}} >
              <TouchableOpacity style={{backgroundColor:'snow',width:width*0.9,height:height*0.05,borderRadius:8}} onPress={()=>Actions.Settings_MainSifreDegistir()}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:2}}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Icon3 name="lock-outline" size={25} color="#25D366"/>
                  </View>
                  <View style={{flex:8,justifyContent:'flex-start'}}>
                    <Text style={styles.bilgiler}>Şifre Değiştir</Text>
                  </View>
                  <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                    <Icon name="rightcircleo" size={25} color="#25D366"/>
                  </View>

                </View>
              </TouchableOpacity>
            </View>

            <View style={{alignItems:'center',justifyContent:'center',marginTop:15,flex:1}}>
              <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',fontSize:15}}>Adres Bilgileri</Text>
              <TouchableOpacity style={{backgroundColor:'snow',width:width*0.9,height:height*0.08,borderRadius:8,justifyContent:'center',alignItems:'center'}}  onPress={()=>Actions.Settings_MainAdresBilgileri()}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:1,flexDirection:'column'}}>                  
                  </View>
                  <View style={{flex:6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>                  
                    <Text style={styles.bilgiler}>{User.Sehir_ismi}</Text>                 
                    <Text style={styles.bilgiler}>{User.Ilce_ismi}</Text>                                   
                  </View>
                  <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Icon name="rightcircleo" size={25} color="#25D366"/>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{justifyContent:'center',alignItems:'center',marginTop:15}}>
              <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:width*0.55,height:height*0.07,backgroundColor:'#4285F4',borderRadius:11}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Icon3 name="share" size={25} color="white"/>
                  </View>
                  <View style={{flex:6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontFamily:'Rajdhani-Regular',fontWeight:'bold',}}>Arkadaşına tavsiye et</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            

            <View style={{justifyContent:'center',alignItems:'center',marginTop:15}}>
              <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:width*0.55,height:height*0.07,backgroundColor:'#4285F4',borderRadius:11}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Icon5 name="heart" size={25} color="#FD1D1D"/>
                  </View>
                  <View style={{flex:6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontFamily:'Rajdhani-Regular',fontWeight:'bold'}}> Uygulamayı Değerlendir</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{justifyContent:'center',alignItems:'center',marginTop:15}}>
              <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:width*0.55,height:height*0.07,backgroundColor:'#4285F4',borderRadius:11}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Icon4 name="help-circle-outline" size={25} color="white"/>
                  </View>
                  <View style={{flex:6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontFamily:'Rajdhani-Regular',fontWeight:'bold',marginRight:13}}>Yardım Merkezi</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{justifyContent:'center',alignItems:'center',marginTop:15}}>
              <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:width*0.55,height:height*0.07,backgroundColor:'snow',borderRadius:11}}
                onPress={()=>this.UygulamadanCikis()}
              >
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Icon name="logout" size={25} color="#505050"/>
                  </View>
                  <View style={{flex:6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#505050',fontFamily:'Rajdhani-Regular',fontWeight:'bold',marginRight:15}}>Çıkış Yap</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
        

    )
  }
}

const styles=StyleSheet.create({
  bilgiler:{
    marginStart:20,
    marginEnd:20,
    fontFamily:'Rajdhani',
    color:'gray',
    marginTop:5,
    marginBottom:5,
    fontSize:12
  }
})