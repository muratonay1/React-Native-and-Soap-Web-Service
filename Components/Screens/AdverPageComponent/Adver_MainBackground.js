import {View,Text,ScrollView,TouchableOpacity,Dimensions,Modal,TouchableHighlight,TextInput,FlatList,Alert} from 'react-native';
import React,{Component} from 'react';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {Avatar,Tooltip,Button,Input,Tile,PricingCard} from 'react-native-elements';
import IpChange from '../IpChange';
import User from '../User';
var JsonObje;
var ss;
var sx;
var sz;
var gelen_sehir="";//PROPS İLE KAYITLI ÜYENİN SEHİR BİLGİSİNİ YAZACAKSIN
var gelen_ilce="";//PROPS İLE KAYITLI ÜYENİN İLCE BİLGİSİNİ YAZACAKSIN
var gelen_meslek="";
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
var kullanici_id;
var meslek_id;
var derece;
var aciklama;
var sehir_id;
var ilce_id;
var telefon;
var ilan_baslik;
var cevap;
const txtStyle={
    fontSize:12,
    fontFamily:'Rajdhani-Regular',
    color:'#CCCC99',
    margin:10
};
const inputStyle={
    fontSize: 12,
    fontFamily:'Rajdhani-Regular',
    width:'80%',
    color:'snow',
    margin:10,
    borderBottomWidth:1,
    borderBottomColor:'yellow',
};
const modalstyle={
    justifyContent: 'center',
    alignItems: 'center',
};
const inputStyle1={
        fontSize: 12,
     
      width:'80%',
      color:'snow'
  };

function Get_Meslekler() 
{
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp+"Meslek_Goster",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res=>res.json())
    .then((result)=> {
        JsonObje = JSON.parse(result.d) //   tanımladığımız sx imize  dönen json stringi atıyoruz.
    },
    (error)=>{
      this.setState({  
        isLoaded:true,
        error
      });
    })
}
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

function Get_IlanYayinla() 
{
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp+"Ilan_Yayinla",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },body: JSON.stringify({
        kullanici_id:kullanici_id,
        meslek_id:meslek_id,
        aciklama:aciklama,
        sehir_id:sehir_id,
        ilce_id:ilce_id,
        telefon:telefon,
        ilan_baslik:ilan_baslik
         })
    })
    .then(res=>res.json())
    .then((result)=> {
        cevap =result.d
        if(cevap=="ok")
        {
            Alert.alert("Tebrikler","İlanınız başarıyla yayınlana alındı.",[
                {text:'Tamam'}
              ]);
        } 
        else
        {
            Alert.alert('hata');
        }//   tanımladığımız sx imize  dönen json stringi atıyoruz.
    },
    (error)=>{
      this.setState({  
        isLoaded:true,
        error
      });
    })
}
export default class Adver_MainBacground extends Component{
    constructor(props)
    {
        super(props);
        this.meslekler_dizi=[];
        this.sehir_dizi=[];
        this.ilce_dizi=[];
        this.state={
            ilanver_modal_visible:false,
            modalSehirVisible:false,
            modalIlceVisible:false,
            modalMeslekVisible:false,
            meslekler:[],
            meslekler_dizi:[],
            sehirler:[],
            sehir_dizi:[],
            ilceler:[],
            ilce_dizi:[],
            Sehir_Id:0,
            Ilce_Id:0,
            Meslek_Id:0,

            kullanici_id:0,
            meslek_id:0,
            derece:0,
            aciklama:'',
            sehir_id:0,
            ilce_id:0,
            telefon:'',
            ilan_baslik:'',
        }
    }
    componentDidMount(){
        Get_Meslekler();
        GetSehir_Isimleri();
    }

    setIlanVerModalVisible(visible) 
    {
        if(User.Id==null)
        {
            Alert.alert("Opps!","İlan verebilmeniz için giriş yapın.")
        }
        else{
            this.setState({ilanver_modal_visible: visible});
        }
        
    }
    setSehirModalVisible(visible)
    {
        this.setState({modalSehirVisible: visible});
    }
    setIlceModalVisible(visible) {
        this.setState({modalIlceVisible: visible});
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

    MeslekFlatlistOnPress=(Meslek_Idx,Meslek_ismi)=>{
        gelen_meslek=Meslek_ismi.toString();
        this.setState({Meslek_Id:Meslek_Idx})
        Mi=this.state.Meslek_Id;
        this.setMeslekModalVisible(false);
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
    setMeslekModalVisible(visible)
    {
        this.setState({modalMeslekVisible: visible});
    }
    meslek_aktar= async()=>{
        if(this.state.meslekler.length == 0 || this.state.meslekler == null)
        {
            for(let i = 0 ; i < JsonObje.length ; i++)
            {
            this.meslekler_dizi.push({meslek_id:[JsonObje[i].Id],meslek_ismi:[JsonObje[i].Meslek_Ismi]})
            }
             this.setState({meslekler:[...this.meslekler_dizi]})
        }
        if(this.state.meslekler.length != 0)
        {
            
        }
    }
    MeslekListModal=()=>{
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalMeslekVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{marginTop: 22,justifyContent:'center',alignItems:'center'}}>
                            <View>
                            <View style={{flex:1,marginBottom:20}}>
                                <Text style={{color:'black',fontSize:16,fontFamily:'Sansation-Light',textAlign:'center',marginBottom:5,marginTop:5}}>Meslek Sec</Text>
                            </View>
                            <FlatList
                                style={{width:width*0.7,marginTop:15}}
                                data={this.state.meslekler}
                                
                                renderItem={({ item }) => {
                                    return (
                                            <TouchableOpacity onPress={()=>this.MeslekFlatlistOnPress(item.meslek_id,item.meslek_ismi)}>
                                                <View style={{flex:1,backgroundColor:'white',marginBottom:20,marginTop:20,borderBottomWidth:1,borderBottomColor:'#C8C8C8'}}></View>
                                                <Text style={{color:'black',fontSize:12,fontFamily:'Sansation-Light',textAlign:'center',marginBottom:5,marginTop:5}}>
                                                    {item.meslek_ismi}
                                                </Text>
                                            </TouchableOpacity>                     
                                    )
                            }} />

                            <TouchableHighlight
                                onPress={() => {
                                this.setMeslekModalVisible(!this.state.modalMeslekVisible);
                                }} style={{justifyContent:'center',alignItems:'center',height:height*0.09,backgroundColor:'#585858',borderRadius:11,marginBottom:15}}>
                                <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>Geri</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <TouchableHighlight onPress={() => {
                        this.meslek_aktar();
                        this.setMeslekModalVisible(true);

                    }} style={{justifyContent:'flex-end',alignItems:'center',height:height*0.05,top:10}}>
                        <Icon1 name="retweet" size={25} color="snow"/>
                    
                    </TouchableHighlight>
                   
                </View>
        )
    }
    IlanYayinlaButtonPress=()=>{
        
        if(this.state.ilan_baslik=="" ||this.state.aciklama==""||this.state.telefon==""||this.state.sehir_id==0||this.state.ilce_id==0 ||this.state.meslek_id==0)
        {
            Alert.alert("Dur","Lütfen boş alan bırakmayın.")
        }
        if(this.state.ilan_baslik !="" && this.state.aciklama !="" && this.state.telefon !="" && this.state.gelen_sehir !="" && this.state.gelen_ilce !="" && this.state.gelen_meslek != 0)
        {
            kullanici_id=parseInt(User.Id);
            ilan_baslik=this.state.ilan_baslik;
            aciklama=this.state.aciklama;
            telefon=this.state.telefon;
            sehir_id=parseInt(this.state.Sehir_Id);
            ilce_id=parseInt(this.state.Ilce_Id);
            meslek_id=parseInt(this.state.Meslek_Id);
            
            
            Get_IlanYayinla();
        
        //Promise.resolve(this.KayitCheck());
        }
    }
    IlanVerModal=()=>{
        return(
            <Modal
                        animationType="slide"
                        style={modalstyle}
                        transparent={true}
                        visible={this.state.ilanver_modal_visible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>                     
                        <View style={{marginTop:60,width:width*0.95,justifyContent:'center',alignItems:'center',backgroundColor:'#17223b',opacity:1,marginBottom:height*0.15,borderRadius:15,marginLeft:10}}>
                        <View style={{flex:1,marginTop:40}}>
                            <Text style={{color:'white',fontSize:15,fontFamily:'Rajdhani-Regular',textAlign:'center',marginBottom:5,marginTop:5,textDecorationLine:'underline'}}>Ilan Ver</Text>
                            </View>
                        <View>
                            <ScrollView>
                            <View style={{flex:0.6,marginTop:15,flexDirection:'row',justifyContent:'center'}}>
                                
                                <TextInput
                                    placeholder="İlan Başlığı Girin."
                                    label="Açıklama"
                                    multiline={true}
                                    onChangeText={(ilan_baslik)=> this.setState({ilan_baslik})}
                                    placeholderTextColor="snow"
                                    style={{marginTop:10,fontSize:12,fontFamily:'Rajdhani-Regular',color:'white',marginLeft:5,borderBottomWidth:1,borderBottomColor:'yellow',width:width*0.8}}
                                />

                            </View>
                            <View style={{flex:0.6,marginTop:15,flexDirection:'row',justifyContent:'center'}}>
                                
                                <TextInput
                                    placeholder="Aciklama Girin."
                                    label="Açıklama"
                                    multiline={true}
                                    onChangeText={(aciklama)=> this.setState({aciklama})}
                                    placeholderTextColor="snow"
                                    style={{fontSize:12,fontFamily:'Rajdhani-Regular',color:'white',marginLeft:5,borderBottomWidth:1,borderBottomColor:'yellow',width:width*0.8}}
                                />

                            </View>
                            <View style={{flex:0.6,marginTop:15,flexDirection:'row',justifyContent:'center'}}>
                                <TextInput
                                    placeholder="Telefon Numarası Girin."
                                    label="Açıklama"
                                    multiline={true}
                                    onChangeText={(telefon)=> this.setState({telefon})}
                                    placeholderTextColor="snow"
                                    style={{fontSize:12,fontFamily:'Rajdhani-Regular',color:'white',marginLeft:5,borderBottomWidth:1,borderBottomColor:'yellow',width:width*0.8}}
                                />
                            </View>
                            <View style= {{flex:1,flexDirection:'row'}}>
                                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    <TextInput
                                            placeholder="Şehir Seç"
                                            label="Açıklama"
                                            multiline={false}
                                            editable={false}
                                            value={gelen_sehir}
                                            placeholderTextColor="snow"
                                            style={{fontSize:12,fontFamily:'Rajdhani-Regular',color:'white',borderBottomWidth:1,borderBottomColor:'yellow',width:width*0.6}}
                                        />
                                </View>
                                <View style={{flex:0.2,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    {this.SehirListModal()}
                                </View>
                            </View>

                            <View style= {{flex:1,flexDirection:'row'}}>
                                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <TextInput
                                        placeholder="İlçe Seç"
                                        label="Açıklama"
                                        multiline={false}
                                        editable={false}
                                        value={gelen_ilce}
                                        placeholderTextColor="snow"
                                        style={{fontSize:12,fontFamily:'Rajdhani-Regular',color:'white',borderBottomWidth:1,borderBottomColor:'yellow',width:width*0.6}}
                                    />
                                </View>
                                <View style={{flex:0.2,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    {this.IlceListModal()}
                                </View>
                            </View>

                            <View style= {{flex:1,flexDirection:'row'}}>
                                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <TextInput
                                        placeholder="Meslek Dalını Seç"
                                        label="Açıklama"
                                        multiline={false}
                                        editable={false}
                                        value={gelen_meslek}
                                        placeholderTextColor="snow"
                                        style={{fontSize:12,fontFamily:'Rajdhani-Regular',color:'white',borderBottomWidth:1,borderBottomColor:'yellow',width:width*0.6}}
                                    />
                                </View>
                                <View style={{flex:0.2,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    {this.MeslekListModal()}
                                </View>
                            </View>
                            
                            </ScrollView>
                        </View>
                        <View style={{flexDirection:'row',flex:1,marginBottom:40}}>
                            <TouchableHighlight
                            onPress={() => {
                                this.IlanYayinlaButtonPress()
                            }} style={{justifyContent:'center',alignItems:'center',height:height*0.04,backgroundColor:'#585858',borderRadius:11,width:width*0.4,top:-50}}>
                            <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>Yayınla</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => {
                                this.setIlanVerModalVisible(!this.state.ilanver_modal_visible);
                                
                            }} style={{justifyContent:'center',alignItems:'center',height:height*0.04,backgroundColor:'#585858',borderRadius:11,marginBottom:height*0.04,width:width*0.4,top:-50}}>
                            <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>İptal</Text>
                        </TouchableHighlight>
                            </View>
                    </View>
                    </Modal>
        )
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

                    }} style={{justifyContent:'flex-end',alignItems:'center',height:height*0.05,top:10}}>
                        <Icon1 name="retweet" size={25} color="snow"/>
                    
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

                    }} style={{justifyContent:'center',alignItems:'center',height:height*0.05,top:10}}>
                        <Icon1 name="retweet" size={25} color="snow"/>
                    </TouchableHighlight>
                   
            </View>
        )
    }
    render(){
        return(
            <ScrollView>
            <View style={{marginTop:25,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:60,height:60,backgroundColor:'transparent',borderRadius:120}}
                    onPress={()=>this.setIlanVerModalVisible(true)}    
                >
                    <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    <Icon1 name="pluscircle" size={25} color="#34A853"/>
                        </View>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontFamily:'Rajdhani-Regular',fontWeight:'bold'}}>İlan Ver</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {this.IlanVerModal()}
                <Text>Son Güncellemelerde yapılanlar;</Text>
                <Text>Son Güncellemelerde yapılanlar;</Text>
                <Text>Haberler... </Text>
                <Text>Test 12345123123123123</Text>
            </View>
            </ScrollView>
            
        )
    }
}