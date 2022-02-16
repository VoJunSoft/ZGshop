import React, { useState } from 'react'
import { 
    Text, 
    View,
    StyleSheet 
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'

const boxSizes = (props) => {

return (
        <View style={{
            height: props.size,
            width: props.size,
            borderColor: "#fac300",
            borderWidth: props.borderWidth,
            justifyContent:'center',
            borderRadius:50
        }}>    
      
            <View style={{
            height: props.size - 8,
            width: props.size - 8,
            backgroundColor: props.color,
            alignSelf:'center',
            justifyContent:'center',
            borderRadius:30,
            }}>
                <Text style={[CSS.body,{fontSize: 12}]}>{props.caption}</Text>
            </View>       
        </View>
    )
}

const CSS =StyleSheet.create({
    body: {
        
        color: 'black',
        textAlign:'center',
        fontWeight:'bold'
    },
})
export default boxSizes;