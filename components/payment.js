import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    TouchableOpacity, 
    ScrollView,
    StyleSheet,
    Image,
} from 'react-native'
import Button from '../elements/button'

const payment = (props) => {
    return (
        <View style={{flex:1, flexDirection:'column', justifyContent:'space-around'}}>
            <Text style={[CSS.text,{marginTop:20, fontWeight:'bold', color:'black', alignSelf:'center', backgroundColor:'#fac300', width:200, marginBottom:20}]}>ההזמנה שלך</Text>
                
            <ScrollView>  
                {props.cartItems.map((item, index)=>(
                    <View style={CSS.cart} key={index}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={[CSS.text, {borderBottomWidth: 1, margin: 2}]}>₪{item.price} x {item.quantity}</Text>
                            <Text style={[CSS.text, {textAlign:'left', margin:2, marginTop:5}]}>₪{item.price * item.quantity}</Text>
                        </View>
                        <View style={[CSS.imgBox,{width:'40%'}]}>
                            <Text style={CSS.title}>מידה :{item.itemSize === 'אחת' || item.itemSize  === '' ? 'אחידה' : item.itemSize}</Text> 
                            <Text style={CSS.title}>צבע :{item.color  === '' ? 'כמו בתמונה' : item.color} </Text>
                        </View>
                        <View style={[CSS.imgBox,{width:'35%'}]}>
                            <Image style={CSS.img} source={{uri: item.img[0]}} />
                            <Text style={[CSS.title]}>{item.productName}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>  

            <View style={CSS.calculations}>
                <View style={CSS.row}>
                    <Text style={CSS.body}>₪{props.totalPrice}</Text>
                    <Text style={CSS.body}>סכום</Text>
                </View>
                <View style={CSS.row}>
                    <Text style={CSS.body}>₪50</Text>
                    <Text style={CSS.body}>משלוח</Text>
                </View>
                <View style={CSS.row}>
                    <Text style={[CSS.title, {backgroundColor:'#fac300', borderRadius:50, padding:5}]}>₪ {props.totalPrice + 50}</Text>
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
        backgroundColor:'rgba(0,0,0,0.4)',
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
        height:90,
        width:90,
        borderRadius:5
    },
    text:{
        fontFamily:'Abraham-Regular',
        fontSize:15,
        color:'black',
        textAlign:'center'
    },
    title:{
        fontFamily:'Abraham-Regular',
        fontSize:16,
        color:'black',
        textAlign:'center',
        marginTop:2
    },
    calculations:{
        width:'95%',
        borderTopWidth:1,
        borderTopColor:'black',
        borderBottomColor:'black',
        borderBottomWidth:1,
        alignSelf:'center'
    },
    imgBox:{
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0)',
        margin:2,
        borderRadius:10,
    },
})
export default payment
