import React, {useEffect, useState} from 'react'
import { 
    Text, 
    View, 
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Icon from './IconPurple/iconPurple'
import {Badge} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const button = (props) => {
    useEffect( ()=>{
        getCartData()
    }, [badges])

    //get cart items 
    const [badges, setBadges] = useState(0)
    const getCartData = async () => {
    try {
           const value = await AsyncStorage.getItem('cartItems')
           if(value !== null)
                setBadges(JSON.parse(value).length)
    } catch(e) {
      // error reading value
    }
    
    }
    return (
        <TouchableOpacity style={[props.containerStyle, CSS.container]} onPress={props.onPress}>
            {props.iconName ?
                <Icon 
                    iconName={props.iconName} 
                    size={props.iconSize}/>
            :
                null
            }
                {props.title ?
                    <Text style={[props.textStyle, CSS.button]}>{props.title}</Text>
                    :
                    null
            }
            {props.iconName === 'cart' ?
                <>
                {badges > 0 ?
                    <Badge
                    status="error"
                    value={badges}
                    containerStyle={{ position: 'absolute', top: 3, left: 2}}
                    textStyle={{fontSize:11}}
                    /> : null }
                </>
            : 
                null 
            }
             {props.iconName === 'menu' ?
                <>
                {badges > 0 ?
                    <Badge
                    status="error"
                    value={'⭐'}
                    containerStyle={{ position: 'absolute', top: 3, left: 2}}
                    textStyle={{fontSize:10}}
                    /> : null }
                </>
            : 
                null 
            }
        </TouchableOpacity>
    )
}
const CSS = StyleSheet.create({
    container:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        padding:5,
    },
    button: {
        textAlign:'center',
    }
})
export default button;