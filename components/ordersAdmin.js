import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    StyleSheet, 
    FlatList
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'
import firestore from '@react-native-firebase/firestore';
import OrderCardAdmin from './orderCardAdmin'

const ordersAdmin = (props) => {
    useEffect( () => {
            fillOrdersState()
    },[])

    //State for items in the shopping cart
    const [userOrders, setUserOrders] = useState([])

    const fillOrdersState = () => {
        const subscriber = firestore()
            .collection('orders')
            .orderBy('date', 'asc')
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
                <Text style={CSS.emptyCard}>ORDERS</Text>
            </View>
            :
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={userOrders}
                style={{width:'100%'}}
                keyExtractor={item => item.orderId}
                renderItem={ ({item}) => (
                  <OrderCardAdmin orderInfo={item}/>
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
export default ordersAdmin;