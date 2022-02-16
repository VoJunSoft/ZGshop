import React, { useState, useEffect } from 'react'
import { Text, 
         View,
         StyleSheet,
         Image, 
         Dimensions,
         TouchableOpacity,
        } from 'react-native'
import Button from '../elements/button'
import DropShadow from "react-native-drop-shadow";
import Icon from '../elements/IconPurple/iconPurple';
import Circle from '../elements/boxSizes'

const entry = (props) => {

return (
    <View style={CSS.presentation}>
        
            <DropShadow style={[CSS.dropshadow, {width:'100%', justifyContent:'center', marginBottom:20}]}>
                <View style={[CSS.cardBlock,{backgroundColor: '#34262f', borderBottomLeftRadius:90}]}>
                    <Image style={{height:140, width:'70%'}} source={require('../assets/gallary/header.png')} />
                    <Image style={{height:80, width:'25%'}} source={require('../assets/gallary/deco.png')} />
                </View>
            </DropShadow>  
        
            <DropShadow style={CSS.block1}>
                <Image style={CSS.topLeftImg} source={require('../assets/gallary/item11.jpg')} />
                <Image style={CSS.topRightImg} source={require('../assets/gallary/item22.jpg')} />
            </DropShadow>
            <DropShadow style={CSS.block2}>
                <Image style={CSS.bottomLeftImg} source={require('../assets/gallary/item3.jpg')} />
                <Image style={CSS.bottomRightImg} source={require('../assets/gallary/item4.jpg')} />
            </DropShadow>

            <DropShadow style={[CSS.dropshadow, {width:'90%'}]}>
            <TouchableOpacity onPress={() => props.setScreenName('productsList')}>
                <View style={[CSS.cardBlock,{backgroundColor: '#34262f', borderTopLeftRadius:90, borderBottomLeftRadius:90}]}>
                    {/* <Circle size={50} color='#fac300' /> */}
                    <Text style={CSS.loginTxt}>כניסה לחנות</Text>  
                    <Circle size={60} color='#fac300' borderWidth={1}/>
                    {/* <Image style={CSS.img} source={require('../assets/gallary/logo.png')} /> */}
                </View> 
            </TouchableOpacity>
            </DropShadow>   
    </View>
)}

const CSS = StyleSheet.create({
    presentation:{
        justifyContent:'center',
        alignItems:'center'
    },
    headerImg:{
        width:Dimensions.get('window').width/1.8,
        height:190,
        resizeMode:'contain',
    },
    headerImg2:{
        width:Dimensions.get('window').width/2.5,
        height:99,
        resizeMode:'contain',
        borderRadius:300,
    },
    block1:{
        flexDirection:'row',
        alignItems:'baseline',
        marginBottom:5,
        shadowColor: '#171717',
        shadowOffset: {width: -6, height: 6},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    block2:{
        flexDirection:'row',
        alignItems:'stretch',
        shadowColor: '#171717',
        shadowOffset: {width: -6, height: 6},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    topLeftImg:{
        width:160,
        height:160,
        resizeMode:'cover',
        marginRight:5,
        borderTopLeftRadius:10,
        borderWidth:0,
        borderColor:'#542652'
    }, 
    topRightImg:{
        width:160,
        height:180,
        resizeMode:'cover',
        borderTopRightRadius:20,
        borderWidth:0,
        borderColor:'#FAC300'
    }, 
    bottomLeftImg:{
        width:160,
        height:180,
        resizeMode:'cover',
        marginRight:5,
        borderBottomLeftRadius:20,
        borderWidth:0,
        borderColor:'#FAC300'
    }, 
    bottomRightImg:{
        width:160,
        height:160,
        resizeMode:'cover',
        borderBottomRightRadius:10,
        borderWidth:0,
        borderColor:'#542652'
    },
    login:{
        justifyContent:'center',
        alignItems:'center',
        width:'95%',
        backgroundColor:'rgba(255,255,255,0.4)',
        marginTop:25,
        borderRadius:20,
        borderBottomWidth:2,
        borderColor:'#FAC300',
        padding:3,
        paddingTop:15,
        paddingBottom:15
    },
    loginTxt: {
        fontFamily:'ganclm_bold-webfont',
        fontSize:22, 
        color:'#FAC300',
        width:'60%'
    },
    dropshadow:{
        shadowColor: '#171717',
        shadowOffset: {width: -9, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    cardBlock: {
        width:'92%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        marginTop:20,
        borderBottomRightRadius:90,
        borderTopRightRadius:90,
        padding: 5
    },
    img: {
        height:100,
        width:100,
        resizeMode:'contain',
        borderRadius:200,
      }
})

export default entry;
