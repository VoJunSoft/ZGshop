import React, { Component } from 'react'
import { 
    Text, 
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions,
    ImageBackground 
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'
import DropShadow from "react-native-drop-shadow";

const newProductsItem = (props) => {
// if item's gender is male then change background color
const colorIdentifier = () => {
  if(props.productInfo.gender === 'גברים')
    return 'rgba(173,216,230,0.5)'
  else if (props.productInfo.gender === 'נשים')
    return 'rgba(255,105,180,0.3)'
  else
    return '#fac300'
}

return (
        <ImageBackground style={styles.container} source={{uri: props.productInfo.img[Math.floor(Math.random() * props.productInfo.img.length)]}}>
        <DropShadow style={styles.dropShadow}>
          <View style={styles.infoBlock}>
              <Text style={styles.title}>₪{props.productInfo.price}</Text>
              <Text style={styles.title}>{props.productInfo.productName}</Text> 
          </View> 
        </DropShadow>
        </ImageBackground>   
)
}

const styles = StyleSheet.create({

    container:{
      width:Dimensions.get('window').width/1.7,
      height:300,
      borderRadius:10,
      margin: 10,
      marginLeft:5,
      marginTop:15,
      marginBottom:20,
      flexDirection:'column',
      justifyContent:'flex-end',
      resizeMode:'cover',
      overflow:'hidden'
    },
    infoBlock: {
      width:'100%',
      height:70,
      backgroundColor: '#34262f',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      alignSelf:'center',
      borderBottomRightRadius:5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius:80,
      borderTopLeftRadius: 0,
      padding:5,
    },
    title: {
      fontFamily:'GLA',
      fontSize: 18,
      color:'white',
    },
    dropShadow:{
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {width: 2, height: -2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
  }
    });

export default newProductsItem;