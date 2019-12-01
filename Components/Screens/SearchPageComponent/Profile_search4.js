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
    TextInput
} from 'react-native';
import {Avatar,Tooltip,Button,Input,Tile,PricingCard} from 'react-native-elements';
import Star from 'react-native-star-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import call from 'react-native-phone-call';
import img from '../../Picture/ProfileBanner.png'

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
const yorumlar=[
    {'yorumu_yapan':'Mehmet Doruk','yorum_tarihi':'03-06-2019','yorum':'Kesinlikle tavsiye ediyorum. Çok güvenilir bir firmadır gönül rahatlığıyla arayabilirsiniz.'},
    {'yorumu_yapan':'Fatih Öksüz','yorum_tarihi':'13-09-2020','yorum':'Hizmet olarak çok memnun kaldık. Ben ve ailem artık arabalarımızı buradan kiralayacağız'},
    {'yorumu_yapan':'Şenol Onay','yorum_tarihi':'23-06-2019','yorum':'Verdikleri sözleri tutuyorlar. Müşteri hassasiyetleri en üst seviyede Tebrik ederim.'},
    {'yorumu_yapan':'Murat Onay','yorum_tarihi':'30-02-2018','yorum':'Hizmet olarak pek memnun kaldım diyemeyeceğim. 2 yıl garanti veriyoruz dediler 3. ayda arıza yaptı fakat garanti kapsamı dışında dediler'},
    {'yorumu_yapan':'Elif Atmaca','yorum_tarihi':'16-08-2019','yorum':'LifeAssistan ailesine ve bizlere sundukları bu güzel hizmete binayen çok teşekkür ediyorum. Başarılarınızın devamını diliyorum.'},
    {'yorumu_yapan':'Hatice Onay','yorum_tarihi':'11-08-2019','yorum':'Temiz ve düzenli çalıştılar. Normalde her tadilattan sonra evi temizlemek zorunda kalırdım fakat bu sefer çok temiz çalışıldı.'}
];
const starStyle2 = {
    width: 100,
    height: 20,
  };
export default class Profile_search4 extends Component{
    renderItem(obj){
        var imgURL;
        if (obj.fileURL)
            imgURL = {uri: obj.fileURL};
        else
            imgURL = img;
    }
    constructor(props)
    {
        super(props)
    }
    call=()=>{
        const args={
            number:this.props.telefon.toString(),
            prompt:false,
        };
        call(args).catch(console.error);
    }
    
    customListView(rowdata){
        return (
            <TouchableHighlight style={styles.listContainer}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Icon name="comments" size={35} color="#25D366"/>
                <Text style={styles.listTxtHeader}>{rowdata.item.yorumu_yapan}</Text>
                <Star score={4.4} style={starStyle2} />
                <Text style={styles.listTxtDate}>{rowdata.item.yorum_tarihi}</Text>
                <Text style={styles.listTxt}>{rowdata.item.yorum}</Text>
            </View>
            </TouchableHighlight>
        )
    }
    listDivider(){
        return (
            <View style={styles.dividerContainer}></View>
        )
    }
    
    render(){
        const buttonstyle={
            fontSize: 10,
        };
        const inputStyle={
            fontSize: 10,
            textAlign:'center',
            width:'80%',
            marginRight:20
        };
        const starStyle = {
            width: 145,
            height: 30,
            marginBottom: 20,
        };
        
        return(
            <ScrollView scrollEventThrottle={16}>
                <View style={{flex:1}}>
                    <View style={{flex:6,justifyContent:'space-around',alignItems:'center'}}>
                    <Button
                        style={buttonstyle}
                        icon={
                            <Icon1
                            name="star"
                            size={width*0.01}
                            color="orange"
                            />
                        }
                        iconRight
                        title="Favorilere Ekle"
                    />
                    <Text style={{color:'red'}}>Oylama Derecesi</Text>
                    <Tooltip popover={<Text style={{color:'yellow'}}>Değerlendirme:  {this.props.derece}</Text>}>
                        <Star score={this.props.derece} style={starStyle} />
                    </Tooltip>       
                    <Avatar
                    source={{
                    uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    }}
                    style={{width:width*0.4,height:height*0.25,top:-20}}
                    rounded
                    />
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
                                onPress={()=>Linking.openURL('http://api.whatsapp.com/send?phone=90' + this.props.telefon)}>
                                    <Icon name="whatsapp" size={25} color="#25D366"/>
                                    <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',fontSize:14}}>Mesaj Gönder</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>{this.call()}}>
                                    <Icon name="phone" size={25} color="#4285F4"/>
                                    <Text style={{textAlign:'center',fontSize:14,fontFamily:'Rajdhani-Regular'}}>Ara</Text>
                                </TouchableOpacity>
                            </View>
                        
                        </View>
                
                    </View>

                    <View style={{flex:4}}>
                        <Input
                            value={[this.props.meslek_ismi]+""}
                            editable={false}
                            inputStyle={inputStyle}
                            leftIcon={{ type: 'materialicons', name: 'business-center' }}
                        />
                        <Input
                            value={[this.props.telefon]+""}
                            editable={false}
                            inputStyle={inputStyle}
                            leftIcon={{ type: 'materialicons', name: 'call'}}
                            
                            
                        />
                        <Input
                            value={[this.props.sehir]+"/"+[this.props.ilce]}
                            editable={false}
                            inputStyle={inputStyle}
                            leftIcon={{ type: 'materialicons', name: 'call-split' }}
                            
                        />
                        <Input
                            value={[this.props.aciklama]+""}
                            editable={false}
                            inputStyle={inputStyle}
                            leftIcon={{ type: 'materialicons', name: 'info' }}
                            
                        />
                        <View style={{flex:1}}>
                            
                            
                            <PricingCard
                                title="1 Hafta Premium Üyelik"
                                price="₺50"
                                info={['1 Haftalık Paket','Paketler için Tıklayın','İlanlarınız listenin en yukarısında çıksın']}
                                button={{title:'HEMEN BAŞLA', icon:'flight-takeoff'}}
                            />
                            
                            
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10}}>
                            
                            <Text style={{textDecorationLine:'underline',fontFamily:'Rajdhani-Regular'}}>YORUMLAR</Text>
                            <View style={{flex:1,flexDirection:'row',backgroundColor:'#363636',marginTop:10}}>
                                {/**YORUMLAR BÖLÜMÜ FLATLİST OLACAK */}
                                
                                <FlatList horizontal
                                data={yorumlar}
                                    keyExtractor={(item,index)=> index.toString()}
                                    ItemSeparatorComponent={this.listDivider}
                                    renderItem={this.customListView.bind(this)}>
                                </FlatList>
                            </View>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:20}}>
                            <Text style={{textDecorationLine:'underline',fontFamily:'Rajdhani-Regular'}}>YORUM YAP</Text>
                            <View style={{flex:1,marginTop:20}}>
                                <TextInput
                                    multiline={true}
                                    placeholder="Yorum Yaz..."
                                    placeholderTextColor="gray"
                                    backgroundColor="snow"
                                    style={{textAlign:'center',fontSize:12,fontFamily:'Rajdhani-Regular'}}
                                    width={width*4/5}
                                    height={150}
                                />
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <TouchableOpacity style={{width:width*2/5,height:33,backgroundColor:'#414141',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}>
                                        <Icon name="send-o" size={15} color="#25D366"/>
                                        <Text style={{color:'white',marginLeft:5}}>Yorumu Gönder</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            

                        </View>
                        
                    </View>
                </View>
            </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    headerContainer:{
        height:40,
        backgroundColor:'gray',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    headerTxt:{
        fontSize:13,
        color:'white'
    },

    listContainer:{
         width:250,
        height:200,
        padding:10,
        justifyContent:'center',
         alignItems:'center',
         alignSelf:'center',
         backgroundColor:'#EAEAEA'
    },

    mainContainer:{
        flex:1,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        alignContent:'center',
    },

    dividerContainer:{
        width:1,
        height:1,
    },

    listTxt:{
        color:'#363636',
        fontSize:12,
        textAlign:'center',
        fontFamily:'Rajdhani-Regular'
    },
    listTxtHeader:{
        textAlign:'center',
        fontSize:15,
        fontFamily:'Rajdhani-Regular',
        color:'#808080',
        fontWeight:'bold',
        textDecorationLine:'underline',
        textAlign:'center'
    },
    listTxtDate:{
        fontSize:11,
        color:'#908f8f'
    }
})