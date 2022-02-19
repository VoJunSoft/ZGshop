import React, { Component } from 'react'
import { 
    Text, 
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions 
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'
import DropShadow from "react-native-drop-shadow";

const discountProductsItemBeta = (props) => {

const getRandomImage = () => {
    const randomImage = Math.floor(Math.random() * props.productInfo.img.length)
    return props.productInfo.img[randomImage]
}

return (
    <SafeAreaView style={[styles.block]}>
        <DropShadow style={{
                        shadowColor: 'rgba(0,0,0,0.3)',
                        shadowOffset: {width: -3, height: 5},
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                         }}>
        
        <View style={[styles.cardBlock,{backgroundColor: '#34262f'}]}>
            <Text style={styles.title}>{props.productInfo.productName}</Text> 
            <View style={{
                        width:'70%',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                <Text style={[styles.body]}>₪{props.productInfo.price}</Text>
                <Text style={[styles.body, {textDecorationLine:'line-through', opacity: 0.5}]}>{Math.round(props.productInfo.price*1.2)}</Text> 
                <Icon 
                    iconName='discount20'
                    size={30}
                />  
            </View>
            <Image style={styles.img} source={{uri: props.productInfo.img[0]}} />
        </View> 
        </DropShadow>   
    </SafeAreaView>
)
}

const styles = StyleSheet.create({

    block:{
      width:Dimensions.get('window').width/2.5,
      marginLeft: 3,
      marginTop:2,
      marginBottom:12,
    },
    cardBlock: {
      width:'100%',
      flexDirection:'column',
      alignItems:'center',
      alignSelf:'center',
      marginTop:4,
      borderBottomRightRadius:90,
      borderBottomLeftRadius: 90,
      borderTopRightRadius:4,
      borderTopLeftRadius: 4,
      paddingBottom:10,
      paddingTop:30,
      borderWidth:1,
      borderColor:'rgba(0,0,0,0)',
      //borderTopColor:'#fac300'
    },
    title: {
      fontFamily:'GLA',
      fontSize: 17,
      color:'white',
    },
    body: {
        fontFamily:'GLA',
        fontSize: 15,
        color:'white',
        marginTop:2
    },
    imgBlock: {
        width:'100%',
        alignItems:'center',
        alignSelf:'center',
        marginTop:5,
        padding:0,
        borderRadius: 200,
        borderWidth: 5
      },
    img: {
      height:140,
      width:'90%',
      resizeMode:'cover',
      alignItems:'center',
      alignSelf:'center',
      borderRadius:200,
      marginTop:15
    }
    });

export default discountProductsItemBeta;