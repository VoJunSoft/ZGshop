import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import DropShadow from "react-native-drop-shadow";

const profileHeader = () => {
        return (
            <View style={{
                    backgroundColor:'rgba(255,255,255,0.6)',
                    height:'30%',
                    borderRadius:10,
                    borderBottomLeftRadius:200,
                    borderBottomRightRadius:200,
                    margin:2
                    }}>
                <DropShadow style={CSS.dropShadow}>
                    <View style={{
                                backgroundColor:'#34262f',
                                height:'65%',
                                borderBottomLeftRadius:70,
                                borderBottomRightRadius:70,
                                }}>

                    </View>
                </DropShadow>

                <Image style={{
                            backgroundColor:'rgba(255,255,255,1)',
                            height:'80%',
                            width:'50%',
                            borderRadius:100,
                            alignSelf:'center',
                            marginTop:'-33%',
                            borderWidth:3,
                            borderColor:'#fac300',
                            resizeMode:'cover',
                            }}
                            source={require('../assets/gallary/logo.png')}>

                </Image>
        </View>
    )
}
const CSS = StyleSheet.create({
    dropShadow:{
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        },
    })
export default profileHeader
