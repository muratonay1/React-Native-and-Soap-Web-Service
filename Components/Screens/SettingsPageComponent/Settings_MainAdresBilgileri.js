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
    TextInput,
    Picker,
    Alert,
    Modal
} from 'react-native';
import {Avatar,Tooltip,Button,Input,Tile,PricingCard} from 'react-native-elements';
import Star from 'react-native-star-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {Actions} from 'react-native-router-flux';
import IpChange from '../IpChange';
import User from '../User';
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
var ss;
var sx;
var gelen_sehir=User.Sehir_ismi;//PROPS İLE KAYITLI ÜYENİN SEHİR BİLGİSİNİ YAZACAKSIN
var gelen_ilce=User.Ilce_ismi;//PROPS İLE KAYITLI ÜYENİN İLCE BİLGİSİNİ YAZACAKSIN
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
        sx = JSON.parse(result.d) //   tanımladığımız sx imize  dönen json stringi atıyoruz.
    },
    (error)=>{
      this.setState({  
        isLoaded:true,
        error
      });
    })
}
export default class Settings_MainAdresBilgileri extends Component{
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
            modalIlceVisible:false
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
    SehirFlatlistOnPress=(Sehir_ismi)=>{
        gelen_sehir=Sehir_ismi.toString();
        GetIlce_Isimleri();
        this.setSehirModalVisible(false);
    }
    IlceFlatlistOnPress=(Ilce_ismi)=>{
        gelen_ilce=Ilce_ismi.toString();
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
                                            <TouchableOpacity onPress={()=>this.SehirFlatlistOnPress(item.sehir_ismi)}>
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

                    }} style={{justifyContent:'center',alignItems:'center',height:height*0.05,top:10}}>
                        <Icon1 name="retweet" size={25} color="#202027"/>
                    
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
                                            <TouchableOpacity onPress={()=>this.IlceFlatlistOnPress(item.ilce_ismi)}>
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

                    }} style={{justifyContent:'center',alignItems:'center',height:height*0.05,top:10}}>
                        <Icon1 name="retweet" size={25} color="#202020"/>
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
           
            <View style={{flex:1}}>
            <View style={{flex:1,marginTop:20,justifyContent:'center',backgroundColor:'gray',alignItems:'center',height:height*0.1,flexDirection:'row'}}>
            <View style={{flex:1,flexDirection:'column',marginLeft:15}}>
                <TouchableOpacity onPress={()=>Actions.Settings_MainSettings()}>
                    <Icon1 name="leftcircleo" size={35} color="white"/>
                </TouchableOpacity>
                
            </View>
            
            <View style={{flex:8,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <Text style={header}>Adres Bilgileri</Text>
            </View>
            
        </View>

                <View style={{flex:8}}>
                    <View style={{marginTop:20,flexDirection:'row'}}>
                        <View style={{flex:6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <Input
                                placeholder=""
                                label="Sehir Bilgisi"
                                value={""+User.Sehir_ismi}
                                editable={false}
                                inputStyle={inputStyle}
                                leftIcon={{ type: 'AntDesign', name: 'edit' }}
                            />
                        </View>

                        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            {this.SehirListModal()}
                        </View>
                        
                    </View>
                    <View style={{marginTop:20,flexDirection:'row'}}>
                        <View style={{flex:6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <Input
                                placeholder=""
                                label="Ilce Bilgisi"
                                value={""+User.Ilce_ismi}
                                editable={false}
                                inputStyle={inputStyle}
                                leftIcon={{ type: 'AntDesign', name: 'edit' }}
                            />
                        </View>

                        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            {this.IlceListModal()}
                        </View>
                        
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:35}}>
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
                
                
            </View>
        )
    }
}