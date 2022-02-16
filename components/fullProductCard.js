import React, { useState } from 'react'
import { 
    Text, 
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions, 
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'
import {Picker} from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';

const fullProductCard = (props) => {
    //props.fullProductCardInfo
    const [addToCardItem, setAddToCardItem] = useState({
        productId:props.fullProductCardInfo.productId,
        productName: props.fullProductCardInfo.productName,
        gender: props.fullProductCardInfo.gender,
        timestamp: {seconds: Math.floor(Date.now() / 1000)}, 
        img: props.fullProductCardInfo.img,
        information: props.fullProductCardInfo.information, 
        category: props.fullProductCardInfo.category,
        status: props.fullProductCardInfo.status, 
        price: props.fullProductCardInfo.price, 
        color: props.fullProductCardInfo.colors[0], 
        itemSize: props.fullProductCardInfo.sizes[0], 
        quantity: 1
        })

    const addToCard = () => {
      //ADD to card GLOBAL STATE and show in cart
      storeCartData(addToCardItem)
      console.log(addToCardItem)
      Alert.alert('המוצר נוסף לעגלת הקניות בהצלחה')
      props.toggleOverlay()
    }

    //store cart items 
    const storeCartData = async (data) => {
      try {
              const value = await AsyncStorage.getItem('cartItems')
              if(value === null){
                  let newCartState= [data]
                   AsyncStorage.setItem('cartItems', JSON.stringify(newCartState))
              }else{
                  let newCartState= [...JSON.parse(value), data]
                  console.log(newCartState)
                  AsyncStorage.setItem('cartItems', JSON.stringify(newCartState))
              }
      } catch(e) {
          // error reading value
          Alert.alert(e)
      }
    }

    const [imgIndex, setImageIndex] = useState(0)
    return (
    <ScrollView style={[styles.block]}>
        <TouchableOpacity onPress={props.toggleOverlay}>
                <Text style={{
                    color:'#34262f',
                    fontSize:30,
                    textAlign:'center'
                }}> 
                ⓧ
                </Text>
         </TouchableOpacity>
         <Image style={styles.imgLarge} source={{uri: props.fullProductCardInfo.img[imgIndex]}} /> 
          <View style={styles.imgBlock}>
            {
                props.fullProductCardInfo.img.map( (item, index) => (
                    <TouchableOpacity 
                        key={item}
                        onPress={() => setImageIndex(index)} 
                        style={{margin:0}}>
                            <Image style={[styles.imgSmall,{borderColor: imgIndex===index ? '#fac300' : 'black' }]} source={{uri: item}} />  
                    </TouchableOpacity>
                ))
            }
          </View>
            <View style={styles.cardBlock}>
                <Text style={styles.title}>₪{props.fullProductCardInfo.price}</Text>
                <Text style={styles.title}>{props.fullProductCardInfo.productName}</Text> 
                {props.fullProductCardInfo.status === 'מוצר חדש' ?
                    <Icon 
                        iconName='new' 
                        size={35}
                    /> : null }
                {props.fullProductCardInfo.status === 'מוצר להיט' ?
                    <Icon 
                        iconName='fire' 
                        size={35}
                    /> : null }
                {props.fullProductCardInfo.status === 'מוצר במבצע' ?
                    <Icon 
                        iconName='discount' 
                        size={35}
                    /> : null }
            </View> 

            <View style={styles.dateBlock}>
              <Picker
                  selectedValue={addToCardItem.color}
                  style={styles.postInputDate}
                  onValueChange={(itemValue, itemIndex) => setAddToCardItem({...addToCardItem, color:itemValue})}>
                    {
                      props.fullProductCardInfo.colors.map((record, item)=>
                        <Picker.Item label={record  === '' ? 'כמו בתמונה' : record}  value={record} key={item} />
                      )
                    }
              </Picker>
              <Text style={styles.title}>צבע</Text>
            </View>

          <View style={styles.dateBlock}>
            <Picker
                selectedValue={addToCardItem.itemSize}
                style={styles.postInputDate}
                onValueChange={(itemValue, itemIndex) => setAddToCardItem({...addToCardItem, itemSize:itemValue})}>
                 {
                    props.fullProductCardInfo.sizes.map((record, item)=>
                      <Picker.Item label={record === 'אחת' || record  === '' ? 'אחידה' : record} value={record} key={item} />
                    )
                  }
            </Picker>
            <Text style={styles.title}>מידה</Text>
          </View>

          <View style={styles.dateBlock}>
            <View style={{flexDirection:'row', justifyContent:'space-around' , alignItems:'center' , width:'50%'}}>
              <TouchableOpacity style={{backgroundColor:'#fac300', padding:3, marginTop:10, marginBottom:10, borderRadius: 5}} 
                                onPress={()=>{
                                  if(addToCardItem.quantity>1)
                                          setAddToCardItem({...addToCardItem, quantity: addToCardItem.quantity-1})}}>
                  <Text style={{color:'red'}}>➖</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{addToCardItem.quantity}</Text>
              <TouchableOpacity style={{backgroundColor:'#fac300', padding:3, marginTop:10, marginBottom:10, borderRadius: 5}}
                                onPress={()=>setAddToCardItem({...addToCardItem, quantity: addToCardItem.quantity+1})}>
                  <Text style={{color:'green'}}>➕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>כמות</Text>
          </View>

            <View style={styles.infoBox}>
                <Text style={styles.body}>{props.fullProductCardInfo.status}</Text>
                <Text style={styles.body}>ל{props.fullProductCardInfo.gender}</Text>
                <Text style={styles.body}>{props.fullProductCardInfo.information}</Text>
            </View>  
            {props.fullProductCardInfo.quantity === 'זמין' || props.fullProductCardInfo.quantity === ''? 
                  <TouchableOpacity style={styles.addTocartBox} onPress={addToCard}>
                      <Icon 
                          iconName='cart' 
                          size={50}
                          style={styles.cartIcon}
                          />
                        <Text style={{fontSize:18, color:'#fac300', fontFamily:'ganclm_bold-webfont'}}> הוסף לעגלה </Text>
                  </TouchableOpacity>    
                  :
                  <Text style={{
                                fontSize:25, 
                                color:'red', 
                                fontFamily:'ganclm_bold-webfont',
                                alignSelf:'center',
                                marginTop:20,
                                marginBottom:20
                                }}>
                      {props.fullProductCardInfo.quantity}
                  </Text>
              }
    </ScrollView>
)
}

const styles = StyleSheet.create({
    block:{
      width:'100%',
      //backgroundColor:'rgba(0,0,0,0.3)'
    },
    cardBlock: {
      backgroundColor:'rgba(0,0,0,0.2)',
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      alignSelf:'center',
      padding:5
    },
    imgBlock:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:'#323232',
      overflow:'hidden'
    },
    title: {
      fontFamily:'Abraham-Regular',
      fontSize: 20,
      textAlign: 'center',
      color:'#34262f',
    },
    body: {
      fontFamily:'Abraham-Regular',
      fontSize: 17,
      textAlign: 'right',
      color: '#34262f',
      marginRight:10
    },
    imgLarge: {
      height:350,
      width:'100%',
      resizeMode:'cover',
    },
    imgSmall: {
      height:120,
      width:Dimensions.get('window').width/3 - 10,
      resizeMode:'cover',
      borderWidth:2,
    },
    infoBox:{
      width:'97%',
      padding: 9,
      alignSelf:'center',
      borderRadius:10,
      overflow:'scroll',
      marginTop:10,
      marginRight:10,
      borderBottomWidth:1,
    },
    addTocartBox: {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      width:'80%',
      marginTop: 20,
      marginBottom: 20,
      backgroundColor:'#34262f',
      borderRadius:10,
      padding:5
    },
    postInputDate: {
      width:'55%',
      fontSize: 15,
      fontFamily: "Cairo-Regular",
      textAlign:'right',
      backgroundColor:'rgba(255,255,255,0.5)',
      color: 'black',
    },
    dateBlock: {
      width:'94%',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      marginRight:10,
      marginLeft:10,
      borderBottomWidth:1,
    },
    cartIcon:{
      marginRight:10, 
      backgroundColor:'rgba(999,999,999,0.3)',
      borderRadius:100,
    }
    });

export default fullProductCard;