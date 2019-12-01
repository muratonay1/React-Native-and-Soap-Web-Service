import React, { Component } from 'react';
import { View, Text ,Animated,Dimensions,TouchableWithoutFeedback,StyleSheet} from 'react-native';
const {width,height} = Dimensions.get("window");
/*fotograf animasyon gecisi icin olusturulan animated sayfası*/
export default class Moment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const animatedStyle={
        transform:[
            {translateX:this.props.translateX}
        ]
    }
    return (
      <View style={styles.container}>
        <Animated.Image
            source={this.props.image}
            style={[styles.image, animatedStyle]}
            resizeMode="cover"
            //blurRadius={0.8} //Fotoğrafa blur vermek için kullanılır 0.(1,2,3,4) diye gider.
        />
        <View style={[StyleSheet.absoluteFill, styles.center]}>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.titleContent}>{this.props.content}</Text>
            </View>
        </View>
      </View>
    );
  }
}


const styles=StyleSheet.create({
    container:{
        width,
        height,
        overflow:"hidden"
    },
    image:{
        flex:1,
        width:null,
        height:null
    },
    center:{
        justifyContent:'center'
    },
    textWrap:{
        backgroundColor: "rgba(0,0,0,.5)",
        paddingVertical:10
    },
    title:{
        backgroundColor:"transparent",
        fontSize:30,
        color:"#FFF",
        textAlign:"center"
    },
    titleContent:{
        backgroundColor:"transparent",
        fontSize:10,
        color:"#90ee90",
        textAlign:"center"
    }
})