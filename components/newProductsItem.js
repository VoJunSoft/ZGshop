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

const newProductsItem = (props) => {

// if item's gender is male then change background color
const colorIdentifier = () => {
  if(props.productInfo.gender === 'גברים')
    return 'rgba(173,216,230,0.4)'
  else if (props.productInfo.gender === 'נשים')
    return 'rgba(255,105,180,0.3)'
  else
    return 'rgba(255,255,255,0.8)'
}

return (
    <SafeAreaView style={[styles.block, {backgroundColor: 'rgba(255,255,255,0.8)'}]}>
        <Image style={styles.img} source={{uri: props.productInfo.img[0]}} />
        <View style={styles.cardBlock}>
            <Text style={styles.title}>₪{props.productInfo.price}</Text>
            <Text style={styles.title}>{props.productInfo.productName}</Text> 
            {/* <Icon 
                iconName='cart' 
                size={40}
            /> */}
        </View>    
    </SafeAreaView>
)
}

const styles = StyleSheet.create({

    block:{
      width:Dimensions.get('window').width/1.7,
      borderRadius: 5,
      margin: 10,
      marginTop:15,
      marginBottom:20,
      borderRadius:5,
    },
    cardBlock: {
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      alignSelf:'center',
      marginTop:5,
      borderBottomRightRadius:5,
      borderBottomLeftRadius: 5,
      flexWrap:'wrap',
      padding:5,
    },
    title: {
      fontFamily:'Abraham-Regular',
      fontSize: 20,
      color:'#34262f',
      marginTop:5
    },
    img: {
      height:300,
      width:'100%',
      resizeMode:'cover',
      alignSelf:"center",
      overflow:'hidden',
      borderTopRightRadius:5,
      borderTopLeftRadius: 5,
    }
    });

export default newProductsItem;