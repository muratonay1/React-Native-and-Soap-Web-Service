import React,{Component} from 'react';
import {View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Actions} from 'react-native-router-flux';
import {Avatar,Tooltip,Button,Input,Tile} from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/Entypo';
import User from '../User';
import IpChange from '../IpChange';
console.disableYellowBox = true;

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
var cevap;
var email="";
var sifre="";
function GirisYapService() 
{
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp+"Giris_Yap",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },body: JSON.stringify({
        e_mail:email,
        sifre:sifre
         })
    })
    .then(res=>res.json())
    .then((result)=> {
        
        if(result.d!=null)
        {
          cevap = JSON.parse(result.d)
          User.Id=[cevap[0].Id];
          User.Isim=[cevap[0].Isim];
          User.Soyisim=[cevap[0].Soyisim];
          User.E_mail=[cevap[0].E_Mail];
          User.Telefon=[cevap[0].Telefon]
          User.Sifre=[cevap[0].Sifre];
          User.Sehir_id=[cevap[0].Sehir_Id];
          User.Ilce_id = [cevap[0].Ilce_Id];
          User.Sehir_ismi=[cevap[0].Name];
          User.Ilce_ismi=[cevap[0].isim1];
          Actions.Settings_MainSettings();
          
        }
        if(result.d == null)
        {
          Alert.alert("Opps!","Hatalı E-Mail veya Şifre girişi tespit edildi.");
          
        } //   tanımladığımız sx imize  dönen json stringi atıyoruz.

    },
    (error)=>{
      this.setState({  
        isLoaded:true,
        error
      });
    })
}
export default class Settings_settings1 extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      E_Mail:'',
      Sifre:''
    }
  }
  KayitSayfasi(){
    Actions.Settings_settingsKayit();
  }
  GirisCheck=async()=>{
    if(this.state.E_Mail != "" && this.state.Sifre != "")
    {
      email= this.state.E_Mail;
      sifre=this.state.Sifre;
      GirisYapService();
      
    }
    if(this.state.E_Mail == "" || this.state.Sifre == "")
    {
      Alert.alert("Dikkat","Boş alanlar mevcut");
    }
    
  }
  
  render(){
    
    const inputStyle={
      fontSize: 10,
      textAlign:'center',
      width:'80%',
      marginRight:20,
      color:'#696969'
    };

    return(
        <ScrollView>
          
            <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:30}}>
              <View style={{flex:1,justifyContent:'center'}}>
                <Text style={{fontSize:30, fontFamily:'netron',color:'#f50057',textAlign:'center'}}>LIFE ASSISTANT</Text>
                <Text style={{fontSize:20,fontFamily:'Rajdhani-Regular',textAlign:'center',marginTop:40}}>GİRİŞ YAP</Text>
              </View>
              <View style={{flex:1}}>
                <TouchableOpacity style={{backgroundColor:'#e8e8e8',width:120,height:120,borderRadius:60,justifyContent:'center',alignItems:'center'}}>
                <Icon name="dingding" size={80} color="#f50057"/>
                </TouchableOpacity>
              </View>
             
            </View>
            <View style={{flex:1}}>
              <Input
                placeholder="E-mail"
                inputStyle={inputStyle}
                onChangeText={(E_Mail)=> this.setState({E_Mail})}
                leftIcon={{ type: 'font-awesome', name: 'user', color: '#696969' }}
              />
              <Input
                placeholder="Şifre"
                inputStyle={inputStyle}
                onChangeText={(Sifre)=> this.setState({Sifre})}
                leftIcon={{ type: 'entypo', name: 'key', color: '#696969' }}
              />
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                {/**Hesap Oluşturma Alert bölümü */}
              </View>
              <TouchableOpacity style={{width:width,height:50,backgroundColor:'#f50057',justifyContent:'center',alignItems:'center',marginTop:20}} 
                onPress={()=>this.GirisCheck()}
                >
                <Icon name="rightcircleo" size={50} color="white"/>
              </TouchableOpacity>

              <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row',marginTop:20}}>
                <Text style={{fontFamily:'Rajdhani-Regular'}}>Hesabın Yok mu?</Text>
                <TouchableOpacity onPress={()=>{this.KayitSayfasi()}}>
                  <Text style={{fontFamily:'Rajdhani-Regular',fontSize:12,color:'gray',textDecorationLine:'underline'}}>Hesap Oluştur</Text>
                </TouchableOpacity>
              </View>
              
            </View>

         
        </ScrollView>
        

    )
  }
}