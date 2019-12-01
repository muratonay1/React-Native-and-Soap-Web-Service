import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import {Actions, Router} from 'react-native-router-flux';
export default class deneme1 extends Component{
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#3f3f3f',justifyContent:'center'}}>
                <Text style={{fontSize:25,color:'white'}}> Burası SAYFA2</Text>
                <TouchableOpacity style={styles.button} onPress={()=>Actions.deneme()}>
                    <Text style={{color:'white',fontSize:15}}>1.Sayfaya Geç</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    button:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#17223b',
        marginTop:15,
        marginLeft:5,
        marginRight:5,
        borderRadius:15,
        
    }
})


   