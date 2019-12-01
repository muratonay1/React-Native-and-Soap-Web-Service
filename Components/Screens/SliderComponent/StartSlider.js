import React,{Component} from 'react';
import {View,Text,Image,TouchableOpacity,ScrollView,Dimensions,AppRegistry,Animated,StyleSheet} from 'react-native';
import{Actions} from 'react-native-router-flux';
import Moment from './moment';
const Images=[
    {image: require('../../Picture/start1.png'), title:"Hoşgeldiniz", 
    content:"Sekmeyi Geçmek için Ekranı Kaydırın"},

    {image: require('../../Picture/start2.png'), title:"Hızlı ve Güvenilir",
    content:"Sekmeyi Geçmek için Ekranı Kaydırın"},

    {image: require('../../Picture/start3.png'), title:"Kolay ve Kullanışlı",
    content:"Sekmeyi Geçmek için Ekranı Kaydırın"},

    {image: require('../../Picture/start4.png'), title:"Kullanmaya Başlayın",
    content:"Sekmeyi Geçmek için Ekranı Kaydırın"}
];
const {width,height} = Dimensions.get("window");
const getInterpolate = (animatedScroll,i,imageLength) => {
    const inputRange=[
        (i-1)*width,
        i*width,
        (i+1)*width
    ]
    const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150];
    return animatedScroll.interpolate({
        inputRange,
        outputRange,
        extrapolate:"clamp"
    })
}
const getSeperator = (i) => {
    return <View 
        key={i}
        style={[styles.seperate,{left:(i-1)*width-2.5}]}
    />
}
export default class StartSlider extends Component{
    constructor(props){
        super(props);
        this.state={
            animatedScroll: new Animated.Value(0)
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                <ScrollView
                    pagingEnabled
                    horizontal
                    scrollEventThrottle={16}
                    onScroll={
                        Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset:{
                                        x:this.state.animatedScroll
                                    }
                                }
                            }
                        ])
                    }
                >
                    {Images.map((image, i) => {
                        return(
                            <Moment
                                key={i}
                                {...image}
                                translateX={getInterpolate(this.state.animatedScroll,i,Images.length)}
                            />
                        )
                    })}
                    {Array.apply( null, { length: Images.length + 1 }).map((_,i)=> getSeperator(i))}
                </ScrollView>

            </View>
        )
    }
}

const styles=StyleSheet.create({
    seperate:{
        backgroundColor:"#000",
        position:"absolute",
        top:0,
        bottom:0,
        width:5
    }
})