import React, { useState } from 'react'
import { 
    Text, 
    View,
    StyleSheet 
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'

const box = (props) => {

return (
        <View style={{
            height: props.size,
            width: props.size,
            borderColor: props.color,
            borderWidth: props.borderWidth,
            justifyContent:'center',
            borderRadius:5
        }}>    
        { props.color === null ?
            <Icon 
                iconName='photo'
                size={props.size-5}
            />
        :
            <View style={{
            height: props.size - 7,
            width: props.size - 7,
            backgroundColor: props.color,
            alignSelf:'center',
            borderRadius:5
            }}>

            </View>
        }        
        </View>
    )
}

const CSS =StyleSheet.create({
    Box: {
    },
})
export default box;