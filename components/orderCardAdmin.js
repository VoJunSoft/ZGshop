import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    StyleSheet, 
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'
import {Picker} from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore'

const orderCardAdmin = (props) => {
    //props.orderInfo
    const [orderInfo, setOrderInfo] = useState(props.orderInfo)

    //Date format
    const handleDate = (dataD) => {
        let data= new Date(dataD*1000)
        let month = data.getMonth() + 1
        let day = data.getDate()
        let year = data.getFullYear()
        if(day<=9)
            day = '0' + day
        if(month<10)
            month = '0' + month
        const postDate = year + '-' + month + '-' + day
        return postDate
    }
    //Time format
    const handleTime = (dataD) => {
        let data= new Date(dataD*1000)
        let hrs = data.getHours()
        let mins = data.getMinutes()
        if(hrs<=9)
            hrs = '0' + hrs
        if(mins<10)
        mins = '0' + mins
        const postTime= hrs + ':' + mins
        return postTime
    }

    const updateOrderInfo = () => {
        const sub = firestore()
                    .collection('orders')
                    .doc(props.orderInfo.orderId)
                    //this replaces the entire record
                    .set(orderInfo)
                    .then(() => {
                        //show add success msg to reporter
                        Alert.alert('ההזמנה עודכנה')
                    });
        return () => sub();
    }

    const [visibility, setVisibility] = useState(false)
    return (
        <View style={CSS.cardHeader}>
            
            <View style={CSS.cardHeaderRow}>
                <Text style={CSS.bodyText}>{props.orderInfo.orderId}</Text>
                <Text style={CSS.bodyText}>מס הזמנה : </Text>
            </View>
            <View style={CSS.cardHeaderRow}>
                <Text style={CSS.bodyText}>₪{props.orderInfo.price}</Text>
                <Text style={CSS.bodyText}>סך הכל :</Text>
            </View>
            <View style={CSS.cardHeaderRow}>
                    <Picker
                        selectedValue={orderInfo.progress === '' ? 'התקבלה' : orderInfo.progress}
                        style={CSS.postInputDate}
                        onValueChange={(itemValue, itemIndex) => setOrderInfo({...orderInfo, progress: itemValue})}>
                        <Picker.Item label="התקבלה" value="התקבלה" />
                        <Picker.Item label="בטיפול" value="בטיפול" />
                        <Picker.Item label="נשלחה" value="נשלחה" />
                        <Picker.Item label="נמסרה" value="נמסרה" />
                        <Picker.Item label="בוטלה" value="בוטלה" />
                    </Picker>
                <Text style={CSS.bodyText}>ההזמנה :</Text>
            </View>
            <View style={CSS.cardHeaderRow}>
            <TouchableOpacity onPress={()=>setVisibility(!visibility)} style={{backgroundColor:'#fac300', padding:3, borderRadius:50}}>
                <Text style={[CSS.bodyText, {padding:3, borderRadius:50}]}>{visibility ? '⬇️' : '⬅️'}</Text>
            </TouchableOpacity>
                <Text style={CSS.bodyText}>{handleTime(props.orderInfo.date.seconds)}</Text>
                <Text style={CSS.bodyText}>{handleDate(props.orderInfo.date.seconds)}</Text>
            </View>
            {visibility ? 
                <>
                    {props.orderInfo.productsInfo.map((item, index)=>(
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

                    <View style={{  borderWidth: 1, 
                                    borderColor:'white', 
                                    flexDirection:'column', 
                                    width:'98%', 
                                    paddingRight:5, 
                                    borderRadius: 5,
                                    alignContent:'center',
                                    marginTop:5}}>
                        <Text style={{color:'white', textAlign:'right'}}>{props.orderInfo.user.name}</Text>
                        <Text style={{color:'white', textAlign:'right'}}>{props.orderInfo.user.phone}</Text>
                        <Text style={{color:'white', textAlign:'right'}}>{props.orderInfo.user.email}</Text>
                        <Text style={{color:'white', textAlign:'right'}}>{props.orderInfo.user.address}</Text>
                    </View>
                    <View style={CSS.msg}>
                        <TouchableOpacity style={{backgroundColor:'rgba(255,255,255,0.5)', borderRadius:50}} onPress={()=> updateOrderInfo()}>
                            <Icon 
                                iconName='envelope'
                                size={50}
                            />
                        </TouchableOpacity>
                        <TextInput
                            value={orderInfo.msg}
                            style={CSS.postInput}
                            onChangeText={text=> setOrderInfo({...orderInfo, msg: text})}
                            maxLength={125}
                            selectionColor="orange"
                            placeholderTextColor="white"
                            placeholder="להשאיר ללקוח הודעה"
                            underlineColorAndroid='transparent'
                            numberOfLines={2}
                            multiline
                        />
                    </View>
                </> 
                : 
                null 
            }
              
        </View>
    )
}

const CSS =StyleSheet.create({
    cardHeader: {
        width:'98%',
        flexDirection:'column',
        backgroundColor:'#34262f',
        alignSelf:'center',
        marginTop:15,
        padding:5,
        borderRadius:5
    },
    msg:{
        width:'98%',
        flexDirection:'row',
        borderWidth:1,
        borderColor:'white',
        alignSelf:'center',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginTop:10,
        borderRadius:5,
        padding:5
    },
    cardHeaderRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:3
    },    
    cart:{
        width:'98%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        margin: 3,
        paddingTop:5,
        padding:3,
        backgroundColor:'rgba(255,255,255,0.95)',
        borderRadius:5,
    },
    img:{
        height:55,
        width:55,
        borderRadius:5
    },
    headerText:{
        fontFamily:'OzradCLM-Bold',
        fontSize:15,
    },
    bodyText:{
        fontFamily:'OzradCLM-Bold',
        fontSize:16,
        color:'white',
    },
    postInputDate: {
        width:'48%',
        textAlign:'center',
        backgroundColor:'rgba(255,255,255,0.2)',
        color: '#fac300',
    },
    postInput: {
        width:'85%',
        fontSize: 15,
        borderBottomColor:'#E39B02',
        borderBottomWidth:3,
        textAlign:'right',
        color: 'white',
        borderRadius:0,
        paddingRight:10,
        backgroundColor:'rgba(255,255,255,0.2)',
        textAlignVertical:'top'
    }
})
export default orderCardAdmin;