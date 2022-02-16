import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View,
    StyleSheet, 
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'

const orderCard = (props) => {
    //props.orderInfo
    useEffect( () => {
            
    },[])

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
    const [visibility, setVisibility] = useState(true)
    return (
        <View style={CSS.cardHeader}>
            <TouchableOpacity onPress={()=>setVisibility(!visibility)}>
            <View style={CSS.cardHeaderRow}>
                <Text style={CSS.bodyText}>{props.orderInfo.orderId}</Text>
                <Text style={CSS.bodyText}>מס הזמנה : </Text>
            </View>
            <View style={CSS.cardHeaderRow}>
                <Text style={CSS.bodyText}>₪{props.orderInfo.price}</Text>
                <Text style={CSS.bodyText}>סך הכל :</Text>
            </View>
            <View style={CSS.cardHeaderRow}>
                <Text style={[CSS.headerText, {color:'#fac300'}]}>
                    {props.orderInfo.progress === '' ? 'התקבלה' : props.orderInfo.progress}
                </Text>
                <Text style={CSS.bodyText}>ההזמנה :</Text>
            </View>
            <View style={CSS.cardHeaderRow}>
                <Text style={{fontSize:20}}>{visibility ? '⬇️' : '⬅️'}</Text>
                <Text style={CSS.bodyText}>{handleTime(props.orderInfo.date.seconds)}</Text>
                <Text style={CSS.bodyText}>{handleDate(props.orderInfo.date.seconds)}</Text>
            </View>
            </TouchableOpacity>
            {visibility ? 
                <>
                    {props.orderInfo.productsInfo.map((item, index)=>(
                            <View style={CSS.cart} key={index}>
                                <Text style={CSS.text}>₪{item.price} x {item.quantity ? item.quantity : '1'}</Text>
                                <View style={{flexDirection:'column',justifyContent:'flex-end', alignItems:'center', width:'50%'}}>
                                    <Text style={[CSS.text]}>{item.productName}</Text>
                                    <Text style={[CSS.text]}>{item.itemSize} , {item.color}</Text>
                                </View>
                                <Image style={CSS.img} source={{uri: item.img[0]}} />
                            </View>
                    ))}
                    <View style={CSS.msg}>
                        <Text style={{color:'#fac300', width:'80%'}}>{props.orderInfo.msg === undefined ? 'תודה שקנית מאיתנו' : props.orderInfo.msg}</Text>
                        <View style={{backgroundColor:'rgba(255,255,255,0.5)', borderRadius:50}}>
                            <Icon 
                                iconName='typing'
                                size={50}
                            />
                        </View>
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
        flex:1,
        flexDirection:'column',
        backgroundColor:'#34262f',
        //backgroundColor:'rgba(0,0,0,0.5)',
        alignSelf:'center',
        marginTop:15,
        padding:5,
        borderRadius:5,
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
        borderRadius:5
    },
    cardHeaderRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:3
    },    
    cart:{
        width:'99%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        margin: 3,
        paddingTop:5,
        padding:3,
        borderWidth:0,
        backgroundColor:'rgba(255,255,255,1)',
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
    }
})
export default orderCard;
