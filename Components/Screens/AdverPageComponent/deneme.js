import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,FlatList,Dimensions,Alert} from 'react-native';
var ServiceJsonObject;
function Get_ilan() {
    fetch("http://192.168.1.4:51533/MuratWebService.asmx/ReturnPeople",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },})
    .then(res=>res.json())
    .then((result)=> {
        ServiceJsonObject = JSON.parse(result.d)
    },
    (error)=>{
      this.setState({  
        isLoaded:true,
        error
      });})
}
export default class deneme extends Component{
    constructor(props)
    {
        super(props)
        this.isim_dizi=[];
        this.state={
            
            isimler:[]
        }
    }
   componentDidMount(){
       Get_ilan();
   }
   fonksiyon=()=>{
       
    for(let i=0 ; i < ServiceJsonObject.length ; i++)
    {
        this.isim_dizi.push({name:[ServiceJsonObject[i].name],surname:[ServiceJsonObject[i].surname]})
    }
    this.setState({isimler:[...this.isim_dizi]})
    Alert.alert(this.state.isimler[0])
    let i =0;
   }
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.fonksiyon()}>
                <Text>İsmi getir</Text>
              </TouchableOpacity>
            </View>
        )
    }
    
}

   