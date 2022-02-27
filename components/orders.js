import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    StyleSheet, 
    FlatList,
    Alert
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'
import firestore from '@react-native-firebase/firestore';
import OrderCard from './orderCard'

const orders = (props) => {
    useEffect( () => {
            fillOrdersState()
    },[])

    //State for items in the shopping cart
    const [userOrders, setUserOrders] = useState([])

    const fillOrdersState = () => {
        const subscriber = firestore()
            .collection('orders')
            //.orderBy('date', 'asc')
            .where('user.userId', "==", props.userId)
            .onSnapshot(querySnapshot => {
                console.log('Total records: ', querySnapshot.size)
                setUserOrders([]);
                querySnapshot.forEach(documentSnapshot => {
                    setUserOrders((prevState) => {
                    return [{...documentSnapshot.data(), orderId: documentSnapshot.id},  ...prevState]})
                })
            })

            return () => subscriber();
    }

    return (
        userOrders.length === 0 ?
            <View style={CSS.cartBox}>
                <Icon 
                    iconName="emptylist"
                    size={150}/>
                <Text style={CSS.emptyCard}>הזמנות</Text>
            </View>
            :
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={userOrders}
                keyExtractor={item => item.orderId}
                renderItem={ ({item}) => (
                  <OrderCard orderInfo={item}/>
                )}
            />
          
    )
}

const CSS =StyleSheet.create({
    cartBox: {
        flex:1,
        opacity:0.3,
        justifyContent:'center',
        alignItems:'center'
    },
    emptyCard:{
        fontFamily:'Cairo-Bold',
        fontSize:20,
    }
})
export default orders;