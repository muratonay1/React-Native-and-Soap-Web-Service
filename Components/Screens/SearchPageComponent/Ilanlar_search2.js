import React,{Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,FlatList,Dimensions,ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Avatar,Tooltip,Button,Input,Tile,PricingCard} from 'react-native-elements';
import IpChange from '../IpChange';


var ServiceJsonObject;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

function Get_ilan() 
{
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp+"MeslekSayar",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      
    })
    .then(res=>res.json())
    .then((result)=> {
        ServiceJsonObject = JSON.parse(result.d)
        this.setState({isLoading:true})

        
    },
    (error)=>{
        console.log(error)
    })
}




export default class Ilanlar_search2 extends Component{

    constructor(props){
        super(props)
        this.meslek_dizi=[];
        this.state=
        {
            meslek_dizi:[],
            meslekler:[],
            text:'',
            isLoading:false
        }
    }
    componentWillMount()
    {
        
        Get_ilan();
        
        
        
    }
    componentDidMount(){
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
                this.meslek_dizi.push({meslek_ismi:[ServiceJsonObject[i].meslek_ismi],ilan_sayisi:[ServiceJsonObject[i].ilan_sayisi],meslek_id:[ServiceJsonObject[i].Meslek_Id]})
            }
            this.setState({meslekler:[...this.meslek_dizi]})
        }
    } 
    MeslekIcerikGoster=(mslk)=>{
        
        Actions.MeslekIcerik_search3({meslek_id:mslk})
    }
    
    render(){   
        const inputStyle={
            fontSize: 14,
            textAlign:'center',
            width:'80%',
            marginRight:20,
            color:'snow'
        };                /**COMPONENT RENDER METHOD */
       
        
            return(
           
                <View style={{flex:1,backgroundColor:'#263859'}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        
                            <Input
                                placeholder="Meslek ara"
                                
                                editable={true}
                                inputStyle={inputStyle}
                                leftIcon={{ type: 'materialicons', name: 'search' }}
                            />
                        
                    </View>
    
                    <View style={{flex:8,backgroundColor:'#17223b'}}>
                        <FlatList
                        style={{width:width*0.8,height:height*0.2,top:5}}
                        data={this.state.meslekler}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.FlatlistButtonStyle} onPress={()=>this.MeslekIcerikGoster(parseInt(item.meslek_id))}>
                                    <View style={{backgroundColor:'white',marginBottom:8,flex:0.04}}></View>
                                    <Text style={styles.MeslekIsmiTextStyle}>
                                        {item.meslek_ismi} <Text style={styles.IlanSayisiTextStyle}>{item.ilan_sayisi} Kayıt</Text>
                                    </Text>
                                </TouchableOpacity>     
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
        
        color:'white',
        borderRadius:15
    },
    FlatlistButtonStyle:{
        backgroundColor:'#17223b',
        height:height*0.09,
        justifyContent:'center',
        marginLeft:10
    },
    MeslekIsmiTextStyle:{
        color:'white',
        fontSize:12,
        fontFamily:'CIRCLEN'
    },
    IlanSayisiTextStyle:{
        color:'#8bc24c',
        fontSize:10,
        fontFamily:'CIRCLEN',
        backgroundColor:'#313131',
        width:50,
        height:20
    }
})
   
 