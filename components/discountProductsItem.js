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

const discountProductsItem = (props) => {

return (
    <SafeAreaView style={[styles.block]}>
        <DropShadow style={{
                        shadowColor: 'black',
                        shadowOffset: {width: -3, height: 5},
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                         }}>
        {/* <View style={[styles.imgBlock, {borderColor: colorIdentifier()}]}> */}
            <Image style={styles.img} source={{uri: props.productInfo.img[0]}} />
        {/* </View> */}
        </DropShadow>
        <View style={styles.cardBlock}>
            <Text style={styles.title}>{props.productInfo.productName}</Text> 
            <View style={{
                        width:'65%',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                <Text style={[styles.body, {fontWeight:'bold'}]}>₪{props.productInfo.price}</Text>
                <Text style={[styles.body, {textDecorationLine:'line-through', opacity: 0.5}]}>{Math.round(props.productInfo.price*1.2)}</Text> 
                <Icon 
                    iconName='discount'
                    size={25}
                />  
            </View>
        </View>    
    </SafeAreaView>
)
}

const styles = StyleSheet.create({

    block:{
      width:Dimensions.get('window').width/2.5,
      borderRadius: 5,
      margin: 5,
      marginTop:20,
      marginBottom:12,
    },
    cardBlock: {
      width:'100%',
      flexDirection:'column',
      alignItems:'center',
      alignSelf:'center',
      marginTop:5,
      borderBottomRightRadius:5,
      borderBottomLeftRadius: 5
    },
    title: {
      fontFamily:'YiddishkeitAlefAlefAlef-Bold',
      fontSize: 18,
      color:'#34262f',
      marginTop:2,
    },
    body: {
        fontFamily:'Cairo-Bold',
        fontSize: 14,
        color:'#34262f',
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
    }
    });

export default discountProductsItem;