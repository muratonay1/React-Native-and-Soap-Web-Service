import React,{Component} from 'react';
import {View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ScrollView,
  Modal,
  FlatList,
  TouchableHighlight,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Actions} from 'react-native-router-flux';
import {Avatar,Tooltip,Button,Input,Tile} from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/Entypo';
console.disableYellowBox = true;
import IpChange from '../IpChange';

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
var ss;
var sx;
var sz;
var gelen_sehir="";//PROPS İLE KAYITLI ÜYENİN SEHİR BİLGİSİNİ YAZACAKSIN
var gelen_ilce="";//PROPS İLE KAYITLI ÜYENİN İLCE BİLGİSİNİ YAZACAKSIN
var Isim="";
var Soyisim="";
var Telefon="";
var E_Mail="";
var Sifre="";
let si=0;
let Ii=0;

function GetSehir_Isimleri() 
{
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp+"Sehir_Isimleri",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res=>res.json())
    .then((result)=> {
        ss = JSON.parse(result.d) //   tanımladığımız ss imize  dönen json stringi atıyoruz.
    },
    (error)=>{
      this.setState({  
        isLoaded:true,
        error
      });
    })
}

function GetIlce_Isimleri() 
{
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp+"Ilce_Isimleri",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },body: JSON.stringify({
        sehir:gelen_sehir
         })
    })
    .then(res=>res.json())
    .then((result)=> {
        sx = JSON.parse(result.d)
         //   tanımladığımız sx imize  dönen json stringi atıyoruz.
    },
    (error)=>{
      this.setState({  
        isLoaded:true,
        error
      });
    })
}
function UyeOlService() 
{
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp+"Uye_Ol",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },body: JSON.stringify({
        isim:Isim,
        soyisim:Soyisim,
        e_mail:E_Mail,
        telefon:Telefon,
        sifre:Sifre,
        sehir_id:si,
        ilce_id:Ii
         })
    })
    .then(res=>res.json())
    .then((result)=> {
        sz=result.d//   tanımladığımız sx imize  dönen json stringi atıyoruz.
        if(sz=="ok")
        {
          Alert.alert("Tebrikler","Hesabınız başarı ile oluşturuldu. Lütfen Giriş Yapın.",[
            {text:'Tamam', onPress:()=>Actions.Settings_settings1()}
          ]);
        }
        else{
          Alert.alert("Hata");
        }
    },
    (error)=>{
      this.setState({  
        isLoaded:true,
        error
      });
    })
    
    
}

export default class Settings_settingsKayit extends Component{
  constructor(props)
    {
        super(props)
        this.sehir_dizi=[];
        this.ilce_dizi=[];
        this.state={
            sehir_dizi:[],
            sehirler:[],
            modalSehirVisible:false,
            ilce_dizi:[],
            ilceler:[],
            modalIlceVisible:false,
            Isim:'',
            Soyisim:'',
            E_Mail:'',
            Telefon:'',
            Sifre:'',
            Sehir_Id:0,
            Ilce_Id:0,
            uyari:''
        }
    }
    setSehirModalVisible(visible) {
        this.setState({modalSehirVisible: visible});
      }

    setIlceModalVisible(visible) {
        this.setState({modalIlceVisible: visible});
      }
    
    componentDidMount(){
        GetSehir_Isimleri();
        
    }
    SehirFlatlistOnPress=(Sehir_ismi,Sehir_Idx)=>{
        gelen_sehir=Sehir_ismi.toString();
        this.setState({Sehir_Id:Sehir_Idx})
        si=this.state.Sehir_Id;
        GetIlce_Isimleri();
        this.setSehirModalVisible(false);
    }
    IlceFlatlistOnPress=(Ilce_ismi,Ilce_Idx)=>{
        gelen_ilce=Ilce_ismi.toString();
        this.setState({Ilce_Id:Ilce_Idx})
        Ii=this.state.Ilce_Id;
        this.setIlceModalVisible(false);
    }
    SehirListModal(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    
                    
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalSehirVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{marginTop: 22,justifyContent:'center',alignItems:'center'}}>
                            <View>
                            <View style={{flex:1,marginBottom:20}}>
                                <Text style={{color:'black',fontSize:16,fontFamily:'Sansation-Light',textAlign:'center',marginBottom:5,marginTop:5}}>Sehir Sec</Text>
                            </View>
                            <FlatList
                                style={{width:width*0.7,marginTop:15}}
                                data={this.state.sehirler}
                                
                                renderItem={({ item }) => {
                                    return (
                                            <TouchableOpacity onPress={()=>this.SehirFlatlistOnPress(item.sehir_ismi,item.sehir_id)}>
                                                <View style={{flex:1,backgroundColor:'white',marginBottom:20,marginTop:20,borderBottomWidth:1,borderBottomColor:'#C8C8C8'}}></View>
                                                <Text style={{color:'black',fontSize:12,fontFamily:'Sansation-Light',textAlign:'center',marginBottom:5,marginTop:5}}>
                                                    {item.sehir_ismi}
                                                </Text>
                                            </TouchableOpacity>                     
                                    )
                            }} />

                            <TouchableHighlight
                                onPress={() => {
                                this.setSehirModalVisible(!this.state.modalSehirVisible);
                                }} style={{justifyContent:'center',alignItems:'center',height:height*0.09,backgroundColor:'#585858',borderRadius:11,marginBottom:15}}>
                                <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>Geri</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <TouchableHighlight onPress={() => {
                        this.sehirAktar();
                        this.setSehirModalVisible(true);

                    }} style={{justifyContent:'center',alignItems:'center',height:height*0.05,top:10,marginRight:10}}>
                        <Icon1 name="retweet" size={18} color="#202020"/>
                    
                    </TouchableHighlight>
                   
                </View>
        )
    }

    IlceListModal(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>                                       
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalIlceVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{marginTop: 22,justifyContent:'center',alignItems:'center'}}>
                            <View>
                            <View style={{flex:1,marginBottom:20}}>
                                <Text style={{color:'black',fontSize:16,fontFamily:'Sansation-Light',textAlign:'center',marginBottom:5,marginTop:5}}>Ilce Sec</Text>
                            </View>
                            <FlatList
                                style={{width:width*0.7}}
                                data={this.state.ilceler}
                                renderItem={({ item }) => {
                                    return (
                                            <TouchableOpacity onPress={()=>this.IlceFlatlistOnPress(item.ilce_ismi,item.ilce_no)}>
                                                <View style={{flex:1,backgroundColor:'white',marginBottom:20,marginTop:20,borderBottomWidth:1,borderBottomColor:'#C8C8C8'}}></View>
                                                <Text style={{color:'black',fontSize:12,fontFamily:'Sansation-Light',textAlign:'center',marginBottom:5,marginTop:5}}>
                                                    {item.ilce_ismi}
                                                </Text>
                                            </TouchableOpacity>                     
                                    )
                            }} />

                            <TouchableHighlight
                                onPress={() => {
                                this.setIlceModalVisible(!this.state.modalIlceVisible);
                                }} style={{justifyContent:'center',alignItems:'center',height:height*0.09,backgroundColor:'#585858',borderRadius:11,marginBottom:15}}>
                                <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>Geri</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <TouchableHighlight onPress={() => {
                        this.ilceAktar();
                        this.setIlceModalVisible(true);

                    }} style={{justifyContent:'center',alignItems:'center',height:height*0.05,top:10,marginRight:10}}>
                        <Icon1 name="retweet" size={18} color="#202020"/>
                    </TouchableHighlight>
                   
            </View>
        )
    }
    
    
    sehirAktar= async()=>{
        gelen_ilce="";
        if(this.state.sehirler.length == 0 || this.state.sehirler == null)
        {
            for(let i = 0 ; i < ss.length ; i++)
            {
            this.sehir_dizi.push({sehir_id:[ss[i].Id],sehir_ismi:[ss[i].Name]})
            }
             this.setState({sehirler:[...this.sehir_dizi]})
        }
        if(this.state.sehirler.length != 0)
        {
            
        }
        
    }

    ilceAktar= async()=>{
        if((this.state.ilceler.length == 0 || this.state.ilce_dizi.length == 0) || this.state.ilceler== null || this.state.ilce_dizi==null)
        {
            for(let i = 0 ; i < sx.length ; i++)
            {
              this.ilce_dizi.push({ilce_no:[sx[i].ilce_no],ilce_ismi:[sx[i].isim]})
            }
             this.setState({ilceler:[...this.ilce_dizi]})
        }
        if(this.state.ilceler.length != 0)
        {
            this.setState({ilceler:[]});
            this.ilce_dizi=[];
            for(let i = 0 ; i < sx.length ; i++)
            {
              this.ilce_dizi.push({ilce_no:[sx[i].ilce_no],ilce_ismi:[sx[i].isim]})
            }
             this.setState({ilceler:[...this.ilce_dizi]})
        }
    }

    KayitOlButtonPress=async()=>{
      if(this.state.Isim=="" ||this.state.Soyisim==""||this.state.Telefon==""||this.state.E_Mail==""||this.state.Sifre=="" ||this.state.Sehir_Id==""||this.state.Ilce_Id=="")
      {
        Alert.alert("Dur","Lütfen boş alan bırakmayın.")
      }
      if(this.state.Isim !="" && this.state.Soyisim !="" && this.state.Telefon !="" && this.state.E_Mail !="" && this.state.Sifre !="" && this.state.Sehir_Id != ""&&this.state.Ilce_Id!="")
      {
        Isim=this.state.Isim;
        Soyisim=this.state.Soyisim;
        Telefon=this.state.Telefon;
        E_Mail=this.state.E_Mail;
        Sifre=this.state.Sifre;
        si=parseInt(this.state.Sehir_Id);
        Ii=parseInt(this.state.Ilce_Id);
        
        UyeOlService();
        
        //Promise.resolve(this.KayitCheck());
      }
      

      
    }
    KayitCheck(){
      if(sz=="ok")
      {
        
        gelen_sehir=""
        gelen_ilce=""
        
      }
      if(sz=="error")
      {
        Alert.alert("Hata");
      }
    }
  
  render(){
    const inputStyle={
      fontSize: 10,
      textAlign:'center',
      width:'80%',
      marginRight:20,
      color:'#696969',
      
    };
    const inputStyle1={
      fontSize: 10,
      textAlign:'center',
      width:'80%',
      marginLeft:20,
      color:'#696969'
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
          
            <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:30}}>
              <View style={{flex:1,justifyContent:'center'}}>
                <Text style={{fontSize:30, fontFamily:'netron',color:'#f50057',textAlign:'center'}}>LIFE ASSISTANT</Text>
                <Text style={{fontSize:20,fontFamily:'Rajdhani-Regular',textAlign:'center',marginTop:40}}>KAYIT OL</Text>
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
              <Input
                placeholder="İsim"
                inputStyle={inputStyle}
                onChangeText={(Isim)=> this.setState({Isim})}
                leftIcon={{ type: 'entypo', name: 'pencil', color: '#696969' }}
              />
              <Input
                placeholder="Soyisim"
                inputStyle={inputStyle}
                onChangeText={(Soyisim)=> this.setState({Soyisim})}
                leftIcon={{ type: 'entypo', name: 'pencil', color: '#696969' }}
              />
              <Input
                placeholder="Telefon"
                inputStyle={inputStyle}
                onChangeText={(Telefon)=> this.setState({Telefon})}
                leftIcon={{ type: 'entypo', name: 'phone', color: '#696969' }}
              />
              <View style={{flexDirection:'row'}}>
                <View style={{flex:8,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                  <Input
                    placeholder="Şehir Seç"
                    value={gelen_sehir}
                    editable={false}
                    inputStyle={inputStyle1}
                    leftIcon={{ type: 'AntDesign', name: 'edit' }}
                  />
                </View>
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                  {this.SehirListModal()}
                </View>
              </View>

              <View style={{flexDirection:'row'}}>
                <View style={{flex:8,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                  <Input
                    placeholder="İlçe Seç"
                    value={gelen_ilce}
                    editable={false}
                    inputStyle={inputStyle1}
                    leftIcon={{ type: 'AntDesign', name: 'edit' }}
                  />
                </View>
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                  {this.IlceListModal()}
                </View>
              </View>
              
                            
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                {/**Hesap Oluşturma Alert bölümü */}
              </View>
              <TouchableOpacity style={{width:width,height:50,backgroundColor:'#f50057',justifyContent:'center',alignItems:'center',marginTop:20}}
                onPress={()=>this.KayitOlButtonPress()}
              >
                <Icon name="rightcircleo" size={50} color="white"/>
              </TouchableOpacity>

              <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row',marginTop:20}}>
                <TouchableOpacity onPress={()=>Actions.Settings_settings1()} style={{marginBottom:10}}>
                  <Text style={{fontFamily:'Rajdhani-Regular',fontSize:16,color:'red',textDecorationLine:'underline'}}>Giriş Yap</Text>
                </TouchableOpacity>
              </View>
              
            </View>

         
        </ScrollView>
        

    )
  }
}