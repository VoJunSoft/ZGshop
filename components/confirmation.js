import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    TouchableOpacity, 
    ScrollView,
    StyleSheet
} from 'react-native'
import ProfileHeader from './profileHeader'
import Button from '../elements/button'
import Icon from '../elements/IconPurple/iconPurple'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const confirmation = (props) => {
const [isSuccess, setIsSuccess] = useState(false)
    const confirmPayment = () => {
        //TODO make payment

        //submit order
        handlePyament()

        //remove payment confirmation button
        setIsSuccess(true)

        //show success msg on checkout.js with close button
        props.setPaymentConfirmed(true)
        console.log(props.order)
    }

    const handlePyament = () =>{
        const subscriber = firestore()
        .collection('orders')
        .add(props.order)
        .then(() => {
            //clear async storage cartItems
            AsyncStorage.removeItem('cartItems')
            //setCartItems to [] from checkOut.js on closing checkout overlay
        })
        .catch((e)=>{
            
        })
        return () => subscriber();
    }
    return (
        <View style={{flex:1, flexDirection:'column', justifyContent:'space-around'}}>
            {/* <ProfileHeader /> */}
            {!isSuccess ?
                 <View style={{
                    alignSelf:'center',
                    alignItems:'center'
                }}>
                    <Text style={CSS.title}>אמצעי תשלום</Text>
                    <Icon 
                        iconName="card"
                        size={200}/>
                    <Button
                        title='אשר תשלום'
                        iconSize={60}
                        containerStyle={{
                            backgroundColor:'#34262f',
                            borderRadius: 5,
                            borderBottomWidth:3,
                            borderColor: '#fac300',
                            width:200,
                            marginTop:10
                        }}
                        textStyle={{ 
                            fontFamily:'Abraham-Regular',
                            fontSize: 25, 
                            color:'#fac300',
                        }}
                        onPress={confirmPayment}
                    /> 
                </View>
                :
                null
            }
        </View>
    )
}
const CSS =StyleSheet.create({
    cart:{
        width:'95%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        margin: 4,
        paddingTop:10,
        padding:5,
        borderWidth:0,
        backgroundColor:'rgba(255,255,255,0.7)',
        borderRadius:5,
    },
    img:{
        height:50,
        width:50,
        borderRadius:5
    },
    title:{
        fontFamily:'Abraham-Regular',
        fontSize:18,
        color:'black',
        textAlign:'center'
    }
})
export default confirmation