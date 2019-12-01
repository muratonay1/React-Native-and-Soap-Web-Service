import React,{Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,FlatList,Dimensions} from 'react-native';
import Star from 'react-native-star-view';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import {Tooltip} from 'react-native-elements';
import IpChange from '../IpChange';

var ServiceJsonObject;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

function Get_ilanAyrinti() 
{
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp+"MeslekIlanlari",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meslek_id:gelen_meslek,
        
        })
    })
    .then(res=>res.json())
    .then((result)=> {
        ServiceJsonObject = JSON.parse(result.d) //   tanımladığımız ServiceJsonObject mize  dönen json stringi atıyoruz.
    },
    (error)=>{
      this.setState({  
        isLoaded:true,
        error
      });
    })
}
var gelen_ulke;
var gelen_meslek;
export default class Ilanlar_search2 extends Component{
    

    constructor(props){
        super(props)
        this.meslek_dizi=[];
        this.state=
        {
            meslek_dizi:[],
            meslekler:[],
            text:''
        }
    }
    componentWillMount()
    {
        this.fonk()
    }
    fonk=()=>
    {
       gelen_meslek=this.props.meslek_id
         Get_ilanAyrinti();
         this.fonk2();
    }
    fonk2=async()=>
    {
        if(ServiceJsonObject==null || ServiceJsonObject.length<=0)
        { 
                Alert.alert('LIFE ASISTANT','Hiçbir ilan bulunamadı.')
        }
        if(ServiceJsonObject!=null || !ServiceJsonObject.length<=0)
        {
            for(let i=0 ; i < ServiceJsonObject.length ; i++)
            {
                await this.meslek_dizi.push(
                    {
                        ilan_baslik:[ServiceJsonObject[i].Ilan_Baslik],
                        meslek_ismi:[ServiceJsonObject[i].Meslek_Ismi],
                        
                        aciklama:[ServiceJsonObject[i].Aciklama],
                        
                        sehir:[ServiceJsonObject[i].Name],
                        ilce:[ServiceJsonObject[i].isim],
                        telefon:[ServiceJsonObject[i].Telefon]
                    }
                )
            }
            this.setState({meslekler:[...this.meslek_dizi]})
        }
    } 
    
    GoProfilePage=(meslek_ismi,telefon,sehir,ilce,aciklama,derece)=>{
        Actions.Profile_search4({meslek_ismi:meslek_ismi,telefon:telefon,sehir:sehir,ilce:ilce,aciklama:aciklama,derece:derece});
    }
    render(){                   /**COMPONENT RENDER METHOD */
        const starStyle = {
            width: 100,
            height: 20,
            marginBottom: 20,
          };
        return(         
            <View style={{flex:1,backgroundColor:'#263859'}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>                   
                    <Icon name="filter-list" size={25} color="snow"/>
                </View>

                <View style={{flex:12}}>
                    <FlatList
                    style={{height:height*0.9}}
                    data={this.state.meslekler}
                    renderItem={({ item }) => {
                        return (
                            <View style={{flex:1,backgroundColor:'#17223b'}}>                             
                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{backgroundColor:'#ca3e47' ,width:50,height:50}}>IMAGE</Text> 
                                        </View>
                                        <View style={{flex:3,flexDirection:'column'}}>
                                            <View style={{backgroundColor:'white',marginBottom:8,flex:0.5}}></View>
                                            <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Mesleği:{item.ilan_baslik}</Text></Text>
                                                <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Mesleği:{item.meslek_ismi}</Text></Text>
                                                <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Telefon:{item.telefon}</Text></Text>
                                                <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Sehir:{item.sehir}</Text></Text>
                                                <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Ilce:{item.ilce}</Text></Text>
                                                <Text style={{fontFamily:'CIRCLEN',fontWeight:'bold',fontSize:12}}><Text style={styles.MeslekAyrintilariStyle}>Hakkında:{item.aciklama}</Text></Text>
                                            <View style={{flex:1,flexDirection:'row'}}>
                                                <Text style={styles.MeslekIsmiTextStyle}>Puan:</Text>
                                                <Tooltip popover={<Text style={{color:'yellow'}}>Üyenin Derecesi: 3</Text>}>
                                                    <Star score={3} style={starStyle} />
                                                </Tooltip>                                               
                                            </View>                                           
                                        </View>
                                        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                            <TouchableOpacity style={styles.FlatlistButtonStyle} onPress={
                                                ()=>this.GoProfilePage(
                                                    item.meslek_ismi,
                                                    item.telefon,
                                                    item.sehir,
                                                    item.ilce,
                                                    item.aciklama,
                                                    item.derece
                                                )
                                            }>
                                            <Text style={{fontFamily:'Sansation-Regular',color:'#4eee94',fontSize:10}}>Profil</Text>
                                                <Icon1 name="log-out" size={25} color="gray"/>
                                            </TouchableOpacity>     
                                        </View>
                                    </View>
                            </View>                       
                        )}} />
                </View> 
            </View>
        )
    } 
}
const styles= StyleSheet.create({
    MeslekleriGosterButton:{
        borderRadius:15,
        width:width*0.4,
        height:height*0.06,
        backgroundColor:'#17223b',
        justifyContent:'center',
        alignItems:'center',
        top:-5
    },
    MeslekGosterTextStyle:{
        textAlign:'center',
        color:'white',
        fontFamily:'Sansation_Bold'
    },
    MeslekSearchTextBox:{
        width:width,
        height:height*0.06,
        backgroundColor:'#0d3f67',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        marginBottom:-15,
        color:'white'
    },
    FlatlistButtonStyle:{
        backgroundColor:'#17223b',
        height:height*0.05,
        justifyContent:'center',
        marginLeft:10
    },
    MeslekIsmiTextStyle:{
        color:'red',
        fontSize:12,
        fontFamily:'CIRCLEN',
        fontWeight:'bold'
    },
    IlanSayisiTextStyle:{
        color:'#8bc24c',
        fontSize:10,
        fontFamily:'CIRCLEN',
        backgroundColor:'#313131',
        width:50,
        height:20
    },
    MeslekAyrintilariStyle:{
        color:'#e8e8e8',
        fontSize:11,

    }
})
   
 