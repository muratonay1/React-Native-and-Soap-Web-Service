import React,{Component} from 'react';
import {View,Permission,Text,TouchableOpacity,Picker,Modal,Dimensions,StyleSheet,TouchableHighlight,FlatList,TextInput,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome5'


let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class UlkeSec_search1 extends Component{
    
    constructor(props)
    {
        super(props)
        this.ulke_dizi=[];
        this.state={
            pickerVeri:'Default',
            pickerDisplayed:false,
            ulkeler:[],
            ulk:'',
            value:'',
            single_ulke:''
        }
    }
    
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#e42c64',justifyContent:'center',alignItems:'center'}}>
                
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'snow',fontFamily:'netron',fontSize:33}}>LIFE ASSISTANT</Text>
                    </View>

                    <View style={{flex:2,justifyContent:'center',alignItems:'center',backgroundColor:'#e42c64',width:'60%'}}>
                        <Text style={{color:'snow',fontFamily:'Rajdhani-Regular',textAlign:'center',fontWeight:'bold'}}>
                        İhtiyacınız olan sektörlere{"\n"} ulaşmak için çabalamanıza{"\n"} gerek yok Artık herşey{"\n"} LifeAssistant ile elinizin altında.
                        </Text>
                        <TouchableOpacity style={{backgroundColor:'#41b6e6',width:150,height:150,justifyContent:'center',borderRadius:300,marginTop:20}} onPress={()=>Actions.Ilanlar_search2()}>   
                            <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'white'}}>
                                Haydi Aramaya Başla
                            </Text>
                            
                        </TouchableOpacity>
                        
                    </View>
            
                

                <View style={{flex:1,backgroundColor:'#e42c64'}}>
                
                        
                        
                  
                </View>
      
            </View>
        )
    }
}



