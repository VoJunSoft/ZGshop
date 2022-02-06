import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    TouchableOpacity, 
    ScrollView,
    StyleSheet,
    Image,
} from 'react-native'
import ProfileHeader from './profileHeader'
import Button from '../elements/button'
import { SafeAreaView } from 'react-native-safe-area-context';

const payment = (props) => {
    return (
        <View style={{flex:1, flexDirection:'column', justifyContent:'space-around'}}>
            <Text style={[CSS.text,{marginTop:20, fontWeight:'bold', color:'black', alignSelf:'center', backgroundColor:'#fac300', width:200, marginBottom:20}]}>ההזמנה שלך</Text>
                
            <ScrollView>  
                {props.cartItems.map((item, index)=>(
                    <View style={CSS.cart} key={index}>
                        <Text style={CSS.text}>₪{item.price}</Text>
                        <Text style={CSS.text}>1</Text>
                        <View style={{flexDirection:'column',justifyContent:'flex-end', alignItems:'center', width:'50%'}}>
                                <Text style={[CSS.text]}>{item.productName}</Text>
                                <Text style={[CSS.text]}>{item.itemSize} , {item.color}</Text>
                        </View>
                        <Image style={CSS.img} source={{uri: item.img[0]}} />
                    </View>
                ))}
            </ScrollView>  

            <View style={[CSS.calculations]}>
                <View style={CSS.row}>
                    <Text style={CSS.body}>₪{props.totalPrice}</Text>
                    <Text style={CSS.body}>סכום</Text>
                </View>
                <View style={CSS.row}>
                    <Text style={CSS.body}>₪50</Text>
                    <Text style={CSS.body}>משלוח</Text>
                </View>
                <View style={CSS.row}>
                    <Text style={CSS.title}>₪{props.totalPrice + 50}</Text>
                    <Text style={CSS.title}>סכ הכל</Text>
                </View>
            </View>
            <View style={{
                            alignSelf:'center',
                        }}>
                    <Button
                        title='הבא'
                        iconSize={60}
                        containerStyle={{
                            backgroundColor:'#34262f',
                            borderRadius: 5,
                            borderBottomWidth:3,
                            borderColor: '#fac300',
                            width:200,
                            marginTop:20,
                            marginBottom:20
                        }}
                        textStyle={{ 
                            fontFamily:'Abraham-Regular',
                            fontSize: 30, 
                            color:'#fac300',
                        }}
                        onPress={()=>[props.setOrder({...props.order, price: props.totalPrice + 50}),
                                     props.setScreenName('userInfo')]}
                    /> 
                </View>
        </View>
    )
}
const CSS =StyleSheet.create({
    cart:{
        width:'98%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        paddingTop:5,
        paddingBottom:5,
        padding:3,
        borderWidth:0,
        backgroundColor:'rgba(0,0,0,0.2)',
        borderRadius:5,
        marginBottom: 10
    },
    row:{
        width:'95%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        paddingTop:5,
        padding:3,
    },
    img:{
        height:60,
        width:60,
        borderRadius:5
    },
    text:{
        fontFamily:'Abraham-Regular',
        fontSize:17,
        color:'black',
        textAlign:'center'
    },
    title:{
        fontFamily:'Abraham-Regular',
        fontSize:18,
        color:'black',
        textAlign:'center'
    },
    calculations:{
        width:'95%',
        borderTopWidth:1,
        borderTopColor:'black',
        borderBottomColor:'black',
        borderBottomWidth:1
    }
})
export default payment
