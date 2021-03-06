import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Profile from '../components/profile'
import Payment from '../components/payment'
import Confirmation from '../components/confirmation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../elements/button'
import Icon from '../elements/IconPurple/iconPurple'

const checkOut  = (props) => {
    //props.cartItems; array of objects; each object contains: productName, productId, gender, timestamp, img[], information, category, status, 
    // price, colors[], sizes[]
    //userInfo; object that contains; userId, name, email, address, phone
    const [totalPrice, setTotalPrice] = useState(0)
    const [userInfo, setUserInfo] = useState({})
   
    useEffect(  () => {
            getTotalPrice()
            getUserData()
        },[])

    //order state for database submission
    const [order, setOrder] = useState({
        user: userInfo,
        productsInfo: props.cartItems,
        price: totalPrice,
        date: {seconds: Math.floor(Date.now() / 1000)},
        progress:'התקבלה',
        msg:'תודה שקנית מאיתנו'
    })

    const getTotalPrice = () => {
            let num=0 
            props.cartItems.map(item => num += parseInt(item.price))
            setTotalPrice(num)
    }

    const getUserData = async () => {
        try {
               const value = await AsyncStorage.getItem('userInfo')
               if(value !== null)
                    setUserInfo(JSON.parse(value))
                 //storeUserData(userInfo)
                
        } catch(e) {
          // error reading value
        }
    }

    //store user data
    const storeUserData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('userInfo', jsonValue)
        } catch (e) {
          //err storing data
        }
    }
    //tabs navigation values
    const [screenName, setScreenName] = useState('payment')
    const [paymentConfirmed, setPaymenConfirmed] = useState(false)

    const renderCheckOutStages = (screenName) => {
        switch(screenName){
            case 'payment':
                return <Payment setScreenName={setScreenName} 
                                cartItems={props.cartItems} 
                                totalPrice={totalPrice}
                                setOrder={setOrder}
                                order={order}/>
            case 'userInfo':
                return <Profile userInfo={userInfo} 
                                getUserData={getUserData} 
                                storeUserData={storeUserData} 
                                isCheckOut={true} 
                                setScreenName={setScreenName}
                                setOrder={setOrder}
                                order={order}/>
            case 'confirmation':
                return <Confirmation 
                                setScreenName={setScreenName} 
                                setPaymentConfirmed={setPaymenConfirmed}
                                order={order}
                                setTotalPrice={setTotalPrice}/>
            }
    }
    return (  
        <>
        <View style={CSS.progressHeader}>
            <View style={CSS.progressBar}>
                    <Button
                        title='פרטי תשלום'
                        iconName={screenName === 'confirmation' ? "goldStar" : 'whiteStar'}
                        iconSize={40}
                        textStyle={{ 
                            fontFamily:'Abraham-Regular',
                            fontSize: 12, 
                            color: screenName === 'confirmation' ? '#fac300' : 'white',
                        }} /> 
                     <Button
                        title='המידע שלך'
                        iconName={screenName === 'userInfo' || screenName === 'confirmation' ? "goldStar" : 'whiteStar'}
                        iconSize={35}
                        textStyle={{ 
                            fontFamily:'Abraham-Regular',
                            fontSize: 12, 
                            color: screenName === 'userInfo' || screenName === 'confirmation' ? '#fac300' : 'white',
                        }}
                        onPress={() => {screenName === 'confirmation' ? setScreenName('userInfo') : null}} /> 
                     <Button
                        title='פרטי הזמנה'
                        iconName={'goldStar'}
                        iconSize={30}
                        textStyle={{ 
                            fontFamily:'Abraham-Regular',
                            fontSize: 12, 
                            color:'#fac300',
                        }}
                        onPress={() => {screenName === 'userInfo' || screenName === 'confirmation' ? setScreenName('payment') : null}} /> 

            </View>
            {/* <View style={CSS.close}>
                <TouchableOpacity onPress={() => [props.toggleOverlay(), setScreenName('payment')]}>
                        <Text style={{
                            color:'#fac300',
                            fontSize:30,
                            textAlign:'center',
                        }}> 
                        ⓧ
                        </Text>
                </TouchableOpacity>
            </View> */}
        </View>

        {renderCheckOutStages(screenName)}
        
        {screenName === 'confirmation' && paymentConfirmed?
            <View style={{
                alignSelf:'center',
                alignItems:'center',
                marginTop:'15%'
             }}>
                <Text style={[CSS.title, {fontSize:90}]}> ✓ </Text>
                <Text style={CSS.title}>ההזמנה התקבלה בהצלחה</Text>
                <Button
                title='סגור'
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
                    fontSize: 30, 
                    color:'#fac300',
                }}
                onPress={() => [props.toggleOverlay, props.setCartItems([]) ]} /> 
            </View>
    : null
    }        
    </>       
    )
}

const CSS =StyleSheet.create({
    title:{
        fontFamily:'Abraham-Regular',
        fontSize:30,
        color:'green',
        textAlign:'center',
    },
    progressHeader:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#34262f',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding:10
    },
    progressBar:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        width:'100%',
    },
    close:{
        width:'20%',
    }
})

export default checkOut
