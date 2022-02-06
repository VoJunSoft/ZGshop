import React, { useState } from 'react'
import { 
    Text, 
    View,
    StyleSheet 
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'

const history = (props) => {

//State for items in the shopping cart
const [historyPurchases, setHistoryPurchases] = useState([])
return (
    historyPurchases.length === 0 ?
        <View style={CSS.cartBox}>
            <Icon 
                iconName="emptylist"
                size={150}/>
            <Text style={CSS.emptyCard}>לא נמצא קניות</Text>
        </View>
        :
        //display items for checkout 
        null
    
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
export default history;