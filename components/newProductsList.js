import React, { useState } from 'react'
import { 
    Text, 
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet 
} from 'react-native'
import NewProductsItem from './newProductsItem'
import DropShadow from "react-native-drop-shadow";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Overlay } from 'react-native-elements' 
import FullProductCard from './fullProductCard'

const newProductsList = (props) => {

    const ListHeader = () => {
        return(
            <SafeAreaView>
                <View style={{marginBottom:1}}>
                    <Text>New</Text>
                </View>
            </SafeAreaView>
        )
    }   
    //toggle visibility for full article
    const [visible, setVisible] = useState(false)
    //full article details
    const [fullProductCardInfo, setFullProductCardInfo] = useState({})
    const toggleOverlay = (article) => {
        //pass toggleOverlay to fillArticle component
        setFullProductCardInfo(article)

        setVisible(!visible)
    }

    return (
        <>
        <FlatList 
            //ListHeaderComponent={ListHeader}
            horizontal={true}
            data={props.newProducts}
            style={{borderBottomWidth:1, borderColor:'rgba(0,0,0,0.1)'}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.productId}
            renderItem={ ({item}) => (
                <DropShadow style={CSS.dropShadow}>
                <TouchableOpacity onPress={()=>toggleOverlay(item)}>
                    <NewProductsItem productInfo={item} />
                </TouchableOpacity>
                </DropShadow>
            )}
        />
        <Overlay isVisible={visible} 
                onBackdropPress={toggleOverlay} 
                fullScreen={true}
                overlayStyle={{
                    padding:0, 
                    width:'94%',
                    height:'95%', 
                    margin:30, 
                    marginTop:90, 
                    marginBottom:90, 
                    borderRadius:15,
                    //backgroundColor:'rgba(255,255,255,0.9)',
                }}
                >
            <FullProductCard fullProductCardInfo={fullProductCardInfo} toggleOverlay={toggleOverlay}/>
        </Overlay>
        </>
    )
}
const CSS = StyleSheet.create({
    header:{
        color:'#34262f',
        fontSize:18,
        fontFamily:'NotoKufiArabic-Regular',
        marginRight:10
    },
    dropShadow:{
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    }
})
export default newProductsList;