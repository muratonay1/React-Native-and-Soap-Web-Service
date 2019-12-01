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
    Modal,
    SafeAreaView
} from 'react-native';
import {Avatar,Tooltip,Button,Input,Tile,PricingCard} from 'react-native-elements';
import Star from 'react-native-star-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {Actions} from 'react-native-router-flux';
import User from '../User';
import Adver_MainBackground from '../AdverPageComponent/Adver_MainBackground';
import IpChange from '../IpChange';
//Star rating style
const starStyle = {
    width: 100,
    height: 20,
    marginBottom: 20,
};
//react native element "Input" için style
const inputStyle={
    fontSize: 12,
    fontFamily:'Rajdhani-Regular',
    width:'80%',
    color:'snow',
    margin:10
};

//Ilanlarım settings modalı için sabit text style
const txtStyle={
    fontSize:12,
    fontFamily:'Rajdhani-Regular',
    color:'#CCCC99',
    margin:10
}
//Ilanlarım settings modalı için değişken text style
const txtStyle1={
    fontSize:12,
    fontFamily:'Rajdhani-Regular',
    color:'#CCCC99',
    
}

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

var JsonObje;
let id=User.id;

function Get_Ilanlarim() 
{
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp+"Ilanlarim",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },body: JSON.stringify({
        Uye_id:parseInt(User.Id)
         })
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

const favoriler=[
    {'meslek_ismi':'Acentacı','sehir':'Ankara','ilce':'Ayas','telefon':'0555 555 55 55','aciklama':'favorilerdesin 1','derece':'2'},
    {'meslek_ismi':'Muslukçu','sehir':'Kars','ilce':'Sarıkamış','telefon':'0444 444 44 44','aciklama':'favorilerdesin 2','derece':'3'},
    {'meslek_ismi':'Temizlikçi','sehir':'Kayseri','ilce':'Melikgazi','telefon':'0333 333 33 33','aciklama':'favorilerdesin 3','derece':'1'},
    {'meslek_ismi':'Bebek Bakıcısı','sehir':'Bitlis','ilce':'Tatvan','telefon':'0222 222 22 22','aciklama':'favorilerdesin 4','derece':'5'},
    {'meslek_ismi':'Kuru Temizlemeci','sehir':'Ağrı','ilce':'Hamur','telefon':'0111 111 11 11','aciklama':'favorilerdesin 5','derece':'4'},
]
export default class Adver_Main extends Component{

    constructor(props)
    {
        super(props);
        this.ilanlarim_dizi=[];
        this.state={
            //Tabpage dekorasyon renk ve alt çizgi kontrolü
            ilanlarColor:'#CCCC99',
            favorilerColor:'#686868',
            ilanlarDecoration:'underline',
            favorilerDecoration:'none',
            modal_ilanlar_Visible:false,
            modal_ilanlarim_Settings_Visible:false,
            edit_modal_visible:false,
            favoriler_modal_visible:false,
            ilanlarim:[],
            ilanlarim_dizi:[],
            telefon:'',
            sehir:'',
            ilce:'',
            aciklama:'',
            ilan_basligi:'',
            text:'',
            textPlaceHolder:''
           
        }
    }

    //uST MENUYE TIKLANINCA RENKJ DEĞİŞİMİ VE FLATLİSTE İLANLARIMI AKTARMAYI BAŞLATAN FONKSİYON
    MenuButtonPressEvent=async(btn_name)=>{
        if(btn_name=="ilanlarım")
        {
            if(User.Id==null)
            {
                Alert.alert("Opps!","İlanlarınızı gitmek için giriş yapın.")
            }
            else{
                this.setState({ilanlarColor:'#CCCC99'});
                this.setState({favorilerColor:'#686868'});
                this.setState({ilanlarDecoration:'underline'});
                await this.setState({favorilerDecoration:'none'});
                this.FlatListIlanlarimAktar();
                //this.setIlanSettingsModalVisible(true);
                //this.setEditModalVisible(true);
            }
            
            
        }
        if(btn_name=="favoriler")
        {
            if(User.Id==null)
            {
                Alert.alert("Opps!","Favorilerinize gitmek için giriş yapın.")
            }
            else{
                this.setState({ilanlarColor:'#686868'});
                this.setState({favorilerColor:'#CCCC99'});
                this.setState({ilanlarDecoration:'none'});
                await this.setState({favorilerDecoration:'underline'});
                this.FlatlistFavorilerimAktar();
            }
           
        }
    }

    componentDidMount()
    {
        Get_Ilanlarim();
    }
    //Ilanlarım flatlistine item aktarmasını yapan ana döngü fonksiyonu
    FlatListIlanlarimAktar=()=>
    {
        
        if(JsonObje.length==0 || JsonObje==null)
        {
            Alert.alert('Yayında olan bir ilanın bulunamadı.');
        }
        if(JsonObje != null || !JsonObje.length<=0)
        {
            this.setState({ilanlarim:[]});
            this.ilanlarim_dizi=[];
            for(let i=0;i<JsonObje.length;i++)
            {
                
                this.ilanlarim_dizi.push({
                    meslek_ismi:[JsonObje[i].Meslek_Ismi],
                    aciklama:[JsonObje[i].Aciklama],
                    sehir_ismi:[JsonObje[i].Name],
                    ilce_ismi:[JsonObje[i].isim],
                    telefon:[JsonObje[i].Telefon],
                    ilan_baslik:[JsonObje[i].Ilan_Baslik]
                })
            }
            this.setState({ilanlarim:[...this.ilanlarim_dizi]});
            this.setIlanModalVisible(true);
        }
    }

    FlatlistFavorilerimAktar=()=>{
        this.setFavorilerModalVisible(true);
    }
    //Ilanlarım modalının görünürlüğünü değiştiren fonksiyon
    setIlanModalVisible(visible) 
    {
        this.setState({modal_ilanlar_Visible: visible});
    }
    setFavorilerModalVisible(visible) 
    {
        this.setState({favoriler_modal_visible: visible});
    }
    //Ilanlarım modalının "Ilanı düzenle" alt modalının görünürlüğünü değiştiren fonksiyon
    setIlanSettingsModalVisible(visible) 
    {
        this.setState({modal_ilanlarim_Settings_Visible: visible});
    }
    //Ilanlarım modalının "Edit"görünürlüğünü değiştiren fonksiyon
    setEditModalVisible(visible) 
    {
        this.setState({edit_modal_visible: visible});
    }

    //"Ilanı Düzenle için oluşturulan modala tıklanan ilanın gönderilmesi"
    SettingsControl=(telefon,sehir,ilce,aciklama,ilan_basligi)=>{
        this.setState({telefon:telefon,sehir:sehir,ilce:ilce,aciklama:aciklama,ilan_basligi:ilan_basligi});
        this.setIlanModalVisible(!this.state.modal_ilanlar_Visible);
        this.setIlanSettingsModalVisible(true);
    }
    
    //İlan düzenlemede açılan edit sayfası için text ve placeholder fonksiyonu
    EditFunction=(gelen)=>{
        if(gelen=="telefon")
        {
            this.setState({text:"Telefon No:"})
            this.setState({textPlaceHolder:"telefon no gir..."})
        }
        if(gelen == "sehir")
        {
            this.setState({text:"Şehir: "})
            this.setState({textPlaceHolder:"şehir seç..."})
        }
        if(gelen=="ilce")
        {
            this.setState({text:"İlçe: "})
            this.setState({textPlaceHolder:"ilce seç..."})
        }
        if(gelen == "aciklama")
        {
            this.setState({text:"Açıklama: "})
            this.setState({textPlaceHolder:"açıklama gir..."})
        }
        if(gelen == "ilan_basligi")
        {
            this.setState({text:"İlan Başlığı: "})
            this.setState({textPlaceHolder:"ilan başlığı gir..."})
        }

        

    }
    //ILANLARIM MODALI
    IlanlarimListModal(){
        return(
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modal_ilanlar_Visible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{marginTop:height*0.1,width:width*0.95,justifyContent:'center',alignItems:'center',backgroundColor:'#B2022F',opacity:1,marginBottom:height*0.1,borderRadius:15,marginLeft:10}}>
                            <View>
                            <View style={{flex:1,marginBottom:20}}>
                                <Text style={{color:'snow',fontSize:16,fontFamily:'Sansation-Light',textAlign:'center',marginBottom:5,marginTop:5,textDecorationLine:'underline'}}>Yayında Olan Ilanlarım</Text>
                            </View>
                            <FlatList
                                style={{width:width*0.89,marginTop:15}}
                                data={this.state.ilanlarim}
                                
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{flex:1,backgroundColor:'#17223b',borderRadius:10,margin:10}}>                             
                                        <View style={{flex:1,flexDirection:'row'}}>
                                            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={{backgroundColor:'#ca3e47' ,width:50,height:50}}>IMAGE</Text> 
                                            </View>
                                            <View style={{flex:3,flexDirection:'column'}}>
                                                <View style={{backgroundColor:'white',marginBottom:8,flex:0.5}}></View>
                                                <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}> {item.ilan_baslik}</Text></Text>
                                                    <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Mesleği:{item.meslek_ismi}</Text></Text>
                                                    <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Telefon:{item.telefon}</Text></Text>
                                                    <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Sehir:{item.sehir_ismi}</Text></Text>
                                                    <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Ilce:{item.ilce_ismi}</Text></Text>
                                                    <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Hakkında:{item.aciklama}</Text></Text>
                                                <View style={{flex:1,flexDirection:'row'}}>
                                                    <View style={{flex:6,flexDirection:'row'}}>
                                                        <Text style={styles.MeslekIsmiTextStyle}>Puan:</Text>
                                                        <Tooltip popover={<Text style={{color:'yellow'}}>Üyenin Derecesi:3</Text>}>
                                                            <Star score={3} style={starStyle} />
                                                        </Tooltip>
                                                    </View>
                                                    <View style={{flex:1}}>
                                                        <TouchableOpacity onPress={()=>this.SettingsControl(item.telefon,item.sehir_ismi,item.ilce_ismi,item.aciklama,item.ilan_baslik)}>
                                                        <Icon1 name="setting" size={25} color="white"/>
                                                        </TouchableOpacity> 
                                                    </View>                                           
                                                </View>                          
                                            </View>
                                        </View>
                                </View>                                         
                                    )
                            }} />
                            <TouchableHighlight
                                onPress={() => {
                                this.setIlanModalVisible(!this.state.modal_ilanlar_Visible);
                                }} style={{justifyContent:'center',alignItems:'center',height:height*0.09,backgroundColor:'#585858',borderRadius:11,marginBottom:height*0.04}}>
                                <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>Geri</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
        )
    }
    //ILANLARIM SETTİNGS MODALI
    IlanlarimChangeSettings=()=>
    {
        return(
            <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modal_ilanlarim_Settings_Visible}
                        
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        
                            <View style={{marginTop:height*0.1,width:width*0.95,justifyContent:'center',alignItems:'center',backgroundColor:'#B2022F',opacity:1,marginBottom:height*0.1,borderRadius:15,marginLeft:10}}>
                                <View>
                                    <View style={{flex:1,marginBottom:20}}>
                                        <Text style={{color:'snow',fontSize:16,fontFamily:'Sansation-Light',textAlign:'center',marginBottom:5,marginTop:5,textDecorationLine:'underline'}}>İlanı Düzenle</Text>
                                    </View>
                                    <View style={{flex:6,marginTop:15,flexDirection:'row'}}>
                                        <View style={{flex:2,flexDirection:'column'}}>
                                            
                                            <Text style={txtStyle}>Telefon:</Text>
                                            <Text style={txtStyle}>Şehir:</Text>
                                            <Text style={txtStyle}>İlçe:</Text>
                                            <Text style={txtStyle}>Açıklama:</Text>
                                            <Text style={txtStyle}>İlan Başlığı:</Text>
                                        </View>

                                        <View style={{flex:5,flexDirection:'column'}}>
                                            
                                            <Text style={inputStyle}>{this.state.telefon}</Text>
                                            <Text style={inputStyle}>{this.state.sehir}</Text>
                                            <Text style={inputStyle}>{this.state.ilce}</Text>
                                            <Text style={inputStyle}>{this.state.aciklama}</Text>
                                            <Text style={inputStyle}>{this.state.ilan_basligi}</Text>
                                        </View>

                                        <View style={{flex:1.1,flexDirection:'column',alignItems:'center'}}>
                                            <TouchableOpacity style={{backgroundColor:'orange'}} onPress={()=>{
                                                this.EditFunction("telefon")
                                                this.setEditModalVisible(true)
                                            }}>
                                                <Icon1 name="setting" size={20} color="white" style={{margin:7}}/>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{backgroundColor:'orange'}} onPress={()=>{
                                                this.EditFunction("sehir")
                                                this.setEditModalVisible(true)}}>
                                                <Icon1 name="setting" size={20} color="white" style={{margin:7}}/>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{backgroundColor:'orange'}} onPress={()=>{
                                                this.EditFunction("ilce")
                                                this.setEditModalVisible(true)}}>
                                                <Icon1 name="setting" size={20} color="white" style={{margin:7}}/>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{backgroundColor:'orange'}} onPress={()=>{
                                                this.EditFunction("aciklama")
                                                this.setEditModalVisible(true)}}>
                                                <Icon1 name="setting" size={20} color="white" style={{margin:7}}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{backgroundColor:'orange'}} onPress={()=>{
                                                this.EditFunction("ilan_basligi")
                                                this.setEditModalVisible(true)}}>
                                                <Icon1 name="setting" size={20} color="white" style={{margin:7}}/>
                                            </TouchableOpacity>
                                          
                                        </View>
                                    </View>
                                    <TouchableHighlight
                                        onPress={() => {
                                        
                                        }} style={{justifyContent:'center',alignItems:'center',height:height*0.09,backgroundColor:'#585858',borderRadius:11,width:width*0.8,marginTop:200}}>
                                        <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>Tümünü Kaydet</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        onPress={() => {
                                        this.setIlanSettingsModalVisible(!this.state.modal_ilanlarim_Settings_Visible);
                                        this.setIlanModalVisible(true);
                                        }} style={{justifyContent:'center',alignItems:'center',height:height*0.09,backgroundColor:'#585858',borderRadius:11,marginBottom:height*0.04,width:width*0.8,marginTop:20}}>
                                        <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>Geri</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                       
                    </Modal>
        )

    }
    //ILANLARIM EDİT MODALI
    EditModal=(gelen,gelen2)=>{
        return(
            <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.edit_modal_visible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        
                        <View style={{marginTop:height*0.4,width:width*0.95,justifyContent:'center',alignItems:'center',backgroundColor:'#17223b',opacity:1,marginBottom:height*0.4,borderRadius:15,marginLeft:10}}>
                        <View>
                            <View style={{flex:1}}>
                                <Text style={{color:'snow',fontSize:13,fontFamily:'Sansation-Light',textAlign:'center',marginBottom:5,marginTop:5,textDecorationLine:'underline'}}>{gelen} Güncelle</Text>
                            </View>
                            <View style={{flex:6,marginTop:15,flexDirection:'row'}}>
                                
                                    
                                    <Text style={txtStyle}>{gelen}</Text>
                                    <TextInput
                                        placeholder={gelen2}
                                        multiline={true}
                                        placeholderTextColor="snow"
                                        style={{marginBottom:49,fontSize:12,fontFamily:'Rajdhani-Regular',color:'white',marginLeft:5,borderBottomWidth:1,borderBottomColor:'yellow',width:width*0.6}}
                                    />
                          
                            </View>
                            
                            <View style={{flexDirection:'row',flex:1}}>
                            <TouchableHighlight
                            onPress={() => {
                            
                            }} style={{justifyContent:'center',alignItems:'center',height:height*0.04,backgroundColor:'#585858',borderRadius:11,width:width*0.4,top:-25}}>
                            <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>Kaydet</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => {
                                this.setEditModalVisible(!this.state.edit_modal_visible);
                                
                            }} style={{justifyContent:'center',alignItems:'center',height:height*0.04,backgroundColor:'#585858',borderRadius:11,marginBottom:height*0.04,width:width*0.4,top:-25}}>
                            <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>Geri</Text>
                        </TouchableHighlight>
                            </View>
                           
                        </View>
                    </View>
                       
                    </Modal>
        )


    }

    FavorilerimListModal(){
        return(
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.favoriler_modal_visible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{marginTop:height*0.1,width:width*0.95,justifyContent:'center',alignItems:'center',backgroundColor:'#1E90FF',opacity:1,marginBottom:height*0.1,borderRadius:15,marginLeft:10}}>
                            <View>
                            <View style={{flex:1,marginBottom:20}}>
                                <Text style={{color:'snow',fontSize:16,fontFamily:'Sansation-Light',textAlign:'center',marginBottom:5,marginTop:5,textDecorationLine:'underline'}}>Favori İlanlarım</Text>
                            </View>
                            <FlatList
                                style={{width:width*0.89,marginTop:15}}
                                data={favoriler}
                                
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{flex:1,backgroundColor:'#17223b',borderRadius:10,margin:10}}>                             
                                        <View style={{flex:1,flexDirection:'row'}}>
                                            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={{backgroundColor:'#ca3e47' ,width:50,height:50}}>IMAGE</Text> 
                                            </View>
                                            <View style={{flex:3,flexDirection:'column'}}>
                                                <View style={{backgroundColor:'white',marginBottom:8,flex:0.5}}></View>
                                                    <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Mesleği:{item.meslek_ismi}</Text></Text>
                                                    <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Telefon:{item.telefon}</Text></Text>
                                                    <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Sehir:{item.sehir}</Text></Text>
                                                    <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Ilce:{item.ilce}</Text></Text>
                                                    <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Hakkında:{item.aciklama}</Text></Text>
                                                <View style={{flex:1,flexDirection:'row'}}>
                                                    <View style={{flex:6,flexDirection:'row'}}>
                                                        <Text style={styles.MeslekIsmiTextStyle}>Puan:</Text>
                                                        <Tooltip popover={<Text style={{color:'yellow'}}>Üyenin Derecesi: {item.derece.toString()}</Text>}>
                                                            <Star score={item.derece} style={starStyle} />
                                                        </Tooltip>
                                                    </View>
                                                    <View style={{flex:1,marginRight:25,top:-45}}>
                                                        <TouchableOpacity onPress={()=>Alert.alert('Favori Ayarları',item.meslek_ismi+' Meslek isimli, '+item.telefon+' numarasına sahip favori ilanını kaldırmak üzeresin!')}>
                                                            <Icon1 name="heart" size={25} color="#ff008a"/>
                                                        </TouchableOpacity>
                                                        
                                                    </View>                                           
                                                </View>                          
                                            </View>
                                        </View>
                                </View>                                         
                                    )
                            }} />
                            <TouchableHighlight
                                onPress={() => {
                                this.setFavorilerModalVisible(!this.state.favoriler_modal_visible);
                                }} style={{justifyContent:'center',alignItems:'center',height:height*0.09,backgroundColor:'#585858',borderRadius:11,marginBottom:height*0.04}}>
                                <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow'}}>Geri</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
        )
    }
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:1}}>
                    <View style={{flex:1,justifyContent:'space-around',alignItems:'center',flexDirection:'row',backgroundColor:'#003366',height:height*0.1}}>
                        <TouchableHighlight style={{justifyContent:'center',alignItems:'center',width:width*0.5}} onPress={()=>this.MenuButtonPressEvent("ilanlarım")} underlayColor='yellow'>
                        <View style={{flex:1,backgroundColor:this.state.ilanlarColor,justifyContent:'center',alignItems:'center',width:width*0.5}}>            
                            <Text style={{textDecorationLine:this.state.ilanlarDecoration}}>İlanlarım</Text>                          
                        </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={{justifyContent:'center',alignItems:'center',width:width*0.5}} onPress={()=>this.MenuButtonPressEvent("favoriler")} underlayColor='yellow'>
                        <View style={{flex:1,backgroundColor:this.state.favorilerColor,justifyContent:'center',alignItems:'center',width:width*0.5}}>
                            <Text style={{textDecorationLine:this.state.favorilerDecoration}}>Favoriler</Text>
                        </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{flex:12,backgroundColor:'#003366',justifyContent:'center',alignItems:'center'}}>

                    <View>
                        <Adver_MainBackground/>
                    </View>
                    <View>
                        
                        {this.IlanlarimChangeSettings()}    
                        {this.IlanlarimListModal()}
                        {this.EditModal(this.state.text,this.state.textPlaceHolder)}
                        {this.FavorilerimListModal()}
                    </View>
                
                    
                </View>
            </SafeAreaView>
            
        )
    }
}


const styles= StyleSheet.create({
   
    MeslekIsmiTextStyle:{
        color:'red',
        fontSize:12,
        fontFamily:'CIRCLEN',
        fontWeight:'bold'
    },
   
    MeslekAyrintilariStyle:{
        color:'#e8e8e8',
        fontSize:11,

    }
})
   