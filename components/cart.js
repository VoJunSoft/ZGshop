import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Image,
    TouchableOpacity, 
    ScrollView,
    Alert
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Overlay } from 'react-native-elements' 
import CheckOut from './checkOut'
import Button from '../elements/button'
import DropShadow from 'react-native-drop-shadow';

const cart = (props) => {
    //State for items in the shopping cart
    const [cartItems, setCartItems] = useState([])

    useEffect( ()=>{
        getCartData()
    },[])

    //get cart items 
    const getCartData = async () => {
    try {
           const value = await AsyncStorage.getItem('cartItems')
           if(value !== null)
                setCartItems(JSON.parse(value))
    } catch(e) {
      // error reading value
    }
    }

    //store new cart items after delete
    const storeCardData =  async (data) => {
    try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(data))
        getCartData()
    } catch(e) {
        // error reading value
    }
    }

    //delete item from basket
    const deleteItemFromCard = (id) => {
        Alert.alert(
            "ZGshop",
            "האם אתה רוצה למחוק את המוצר הזה",
            [
              {
                text: "לא",
              },
              { 
                text: "כן", 
                onPress: () => {
                            storeCardData(cartItems.filter(record => record.productId !== id))
                        }
              }
            ]
        )
    }
    

    //toggle visibility for full article
    const [visible, setVisible] = useState(false)
    const toggleOverlay = () => {
        setVisible(!visible)
    }

    const renderItems = () => {
    //TODO replace View.card with touchableopacity to open full card
    return(
        cartItems.map((item, index)=>(
            <DropShadow  style={{
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowOffset: {width: -5, height: 5},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                }} 
                key={index}>
                <View style={CSS.cart}>
                    <Button 
                        iconName="delete"
                        iconSize={30}
                        containerStyle={{
                            backgroundColor:'#FAC300',
                            borderRadius:15
                        }}
                        onPress={() => deleteItemFromCard(item.productId)}
                    />
                    <Text style={[CSS.title,{width:'20%'}]}>₪{item.price}</Text>
                    <Text style={[CSS.title,{width:'10%'}]}>{item.quantity}</Text>
                    <View style={[CSS.imgBox,{width:'30%'}]}>
                        <Text style={[CSS.title]}>מידה :{item.itemSize}</Text> 
                        <Text style={[CSS.title]}>צבע :{item.color}</Text>
                    </View>
                    <View style={[CSS.imgBox,{width:'30%'}]}>
                        <Image style={CSS.img} source={{uri: item.img[0]}} />
                        <Text style={[CSS.title]}>{item.productName}</Text>
                    </View>
                    
                </View>
            </DropShadow>
    )))
    }

    return (
    <ScrollView style={{}}>
        {cartItems.length === 0 ?
            <View style={CSS.emptyCardBox}>
                <Icon 
                    iconName="cart"
                    size={150}/>
                <Text style={CSS.emptyCard}> סל ריק </Text>
            </View>
            :
            <>
             <DropShadow  style={{
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowOffset: {width: -5, height: 5},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                }} >
                    <View style={[CSS.header]}>
                        <Text style={[CSS.title, {color:'#fac300'}]}>מחק</Text>
                        <Text style={[CSS.title, {color:'#fac300',width:'25%', borderLeftWidth:0, borderLeftColor:'#fac300'}]}>מחיר יח׳</Text>
                        <Text style={[CSS.title, {color:'#fac300',width:'10%', borderLeftWidth:0, borderLeftColor:'#fac300'}]}>כמ</Text>
                        <Text style={[CSS.title, {color:'#fac300',width:'25%', borderLeftWidth:0, borderLeftColor:'#fac300'}]}>פרטים</Text>
                        <Text style={[CSS.title,{color:'#fac300',width:'30%', borderLeftWidth:0, borderLeftColor:'#fac300'}]}>שם מוצר</Text>
                    </View>
            </DropShadow>
            {renderItems()}
            <TouchableOpacity style={CSS.addTocartBox} onPress={toggleOverlay}>
                <Text style={{fontSize:18, color:'#fac300', fontFamily:'ganclm_bold-webfont'}}>לתשלום</Text> 
                <Icon 
                    iconName='card' 
                    size={50}
                    style={CSS.cartIcon}
                    />
            </TouchableOpacity> 
                <Overlay isVisible={visible} 
                        onBackdropPress={toggleOverlay} 
                        fullScreen={true}
                        overlayStyle={{
                            width:'96%',
                            height:'96%',
                            overflow:'scroll',
                            padding:0,
                            borderRadius:15,
                            backgroundColor:'rgba(255,255,255,1)',
                        }}>
                        <CheckOut cartItems={cartItems} toggleOverlay={toggleOverlay} setCartItems={setCartItems}/>
             </Overlay>
            </>
        }
    </ScrollView>
)
}

const CSS =StyleSheet.create({
    emptyCardBox: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:'50%',
        opacity:0.7
    },
    emptyCard:{
        marginTop:-30,
        fontFamily:'Cairo-Bold',
        fontSize:20,
        marginLeft:-30,
    },
    header: {
        width:'99%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        marginTop:25,
        marginBottom:7,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:5,
        backgroundColor:'#34262f',
        borderRadius:3,
    },
    cart:{
        width:'97%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        margin: 4,
        paddingTop:10,
        padding:3,
        borderWidth:0,
        backgroundColor:'rgba(255,255,255,0.8)',
        borderRadius:5,
    },
    imgBox:{
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0)',
        margin:2,
        borderRadius:10,
    },
    infoBox:{
        width:'98%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'rgba(255,255,255,0.7)',
        padding: 3,
    },
    img:{
        height:80,
        width:80,
        borderRadius:5
    },
    text:{
        //fontFamily:'Abraham-Regular',
        fontSize:14,
        color:'black',
    },
    title:{
        fontFamily:'Abraham-Regular',
        fontSize:15,
        color:'black',
        textAlign:'center'
    },
    cartIcon:{
      marginRight:10, 
      backgroundColor:'rgba(999,999,999,0.3)',
      borderRadius:100,
    },
    addTocartBox: {
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center',
      alignSelf:'center',
      width:'70%',
      marginTop:20,
      marginBottom: 20,
      backgroundColor:'#34262f',
      borderRadius:10,
      padding:5
    },
})
export default cart;