import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    TouchableOpacity, 
    ScrollView,
    StyleSheet,
    Image
} from 'react-native'
import Button from '../elements/button'
import Icon from '../elements/IconPurple/iconPurple'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Circle from '../elements/boxSizes'


const confirmation = (props) => {
const [isTransactionEnded, setIsTransactionEnded] = useState(false)
    const confirmPayment = () => {
        //TODO make payment GPay

        //submit order
        handlePyament()
        

        //TODO verify setCartItems([])
        //props.setCartItems([])
        console.log(props.order)
    }

    const handlePyament = () =>{
        const subscriber = firestore()
        .collection('orders')
        .add(props.order)
        .then(() => {
            //clear async storage cartItems
            AsyncStorage.removeItem('cartItems')

            //remove payment confirmation button and payment component after confirming transaction
            setIsTransactionEnded(true)

            //show success or error msg on checkout.js with close button
            props.setPaymentConfirmed(true)

            //setCartItems to [] from checkOut.js on closing checkout overlay
        })
        .catch((e)=>{
            //show success msg on checkout.js with close button
            props.setPaymentConfirmed(false)
        })
        return () => subscriber();
    }

    const [isGooglePay, setIsGooglePay] = useState(false)
    return (
        !isTransactionEnded ?
                 <View style={{
                                flex:1,
                                alignSelf:'center',
                                alignItems:'center',
                                flexDirection:'column', 
                                justifyContent:'center',
                                marginTop:-30}}>
                    <Text style={[CSS.title, {marginBottom:10}]}>אמצעי תשלום על סך ₪{props.totalPrice}</Text>
                    <TouchableOpacity style={[CSS.paymentBox, {borderColor: !isGooglePay ? '#fac300' : 'white'}]} onPress={()=>setIsGooglePay(false)}>
                        <Image style={CSS.img} source={require('../assets/gallary/delivery.png')} />
                        <Text style={CSS.title}>לשלם לשליח</Text>
                    </TouchableOpacity>
                    <Button
                        title='אשר תשלום'
                        iconSize={60}
                        containerStyle={{
                            backgroundColor:'#34262f',
                            borderRadius: 5,
                            borderBottomWidth:3,
                            borderColor: '#fac300',
                            width:200,
                            marginTop:20
                        }}
                        textStyle={{ 
                            fontFamily:'Abraham-Regular',
                            fontSize: 25, 
                            color:'#fac300',
                        }}
                        onPress={confirmPayment}
                    /> 
                    <Text style={CSS.title}>- או -</Text>
                    <TouchableOpacity style={CSS.addTocartBox}>
                        <Icon 
                            iconName='gpay' 
                            size={35}
                            style={{
                                marginRight:10,
                            }}
                            />
                        <Text style={{fontSize:20, color:'white', fontWeight:'bold', width:'30%'}}>Pay</Text> 
                    </TouchableOpacity> 
                </View>
                :
                null
    )
}
const CSS =StyleSheet.create({
    paymentBox:{
        alignItems:'center',
        margin: 4,
        borderWidth:3,
        backgroundColor:'rgba(0,0,0,0.3)',
        borderRadius:10,
        padding:5,
        marginTop:10
    },
    img:{
        height:120,
        width:200,
        borderRadius:5,
        resizeMode:'contain'
    },
    title:{
        fontFamily:'Abraham-Regular',
        fontSize:20,
        color:'black',
        textAlign:'center',
        marginTop:10
    },
    addTocartBox: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        width:'100%',
        marginTop:20,
        backgroundColor:'rgba(0,0,0,1)',
        padding:15,
        paddingRight:'15%',
        borderRadius:10
      },
})
export default confirmation