import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    StyleSheet, 
    FlatList,
    TouchableOpacity
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'
import firestore from '@react-native-firebase/firestore';
import OrderCardAdmin from './orderCardAdmin'
import { SafeAreaView } from 'react-native-safe-area-context';

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

    const [tabView, setTabView] = useState('התקבלה')
    //filter orders from based on record.progress data
    const filterOrders = (progressData) => {
        return userOrders.filter(record => record.progress === progressData)
    }

    const $renderOrdersBottomTab = () => {
        return(
            <SafeAreaView style={CSS.footer}>
                <TouchableOpacity onPress={()=> setTabView('התקבלה')}>
                    <Text style={[CSS.bodyText, {color: tabView === 'התקבלה' ? '#fac300' : 'white' }]}>התקבלו</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setTabView('בטיפול')}>
                    <Text style={[CSS.bodyText, {color: tabView === 'בטיפול' ? '#fac300' : 'white' }]}>בטיפול</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setTabView('נשלחה')}>
                    <Text style={[CSS.bodyText, {color: tabView === 'נשלחה' ? '#fac300' : 'white' }]}>נשלחו</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setTabView('נמסרה')}>
                    <Text style={[CSS.bodyText, {color: tabView === 'נמסרה' ? '#fac300' : 'white' }]}>נמסרו</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setTabView('בוטלה')}>
                    <Text style={[CSS.bodyText, {color: tabView === 'בוטלה' ? '#fac300' : 'white' }]}>בוטלו</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    const $renderEmptyOrdersState = () => {
        return( 
            <Text style={{
                fontFamily:'GLA', 
                fontSize:25, 
                alignSelf:'center', 
                color:'#fac300',
                marginTop:'30%'
            }}>
                אין נתונים זמינים
            </Text>
        )
    }

    const $emptyOrdersList = () => {
        return(
            <View style={CSS.cartBox}>
                <Icon 
                    iconName="emptylist"
                    size={150}/>
                <Text style={CSS.emptyCard}>הזמנות</Text>
            </View>
        )
    }

    return (
            <>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={filterOrders(tabView)}
                style={{width:'100%'}}
                keyExtractor={item => item.orderId}
                ListFooterComponent={filterOrders(tabView).length === 0 ? $renderEmptyOrdersState : null}
                renderItem={ ({item}) => (
                  <OrderCardAdmin orderInfo={item}/>
                )}
            />
            {$renderOrdersBottomTab()}
            </>
          
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
    },
    footer:{
        height:'5%',
        width:'100%',
        backgroundColor:'#34262f',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    bodyText:
    {
        fontFamily:'YAF',
        fontSize:18,
        padding: 10,
        letterSpacing:1
    }
})
export default ordersAdmin;