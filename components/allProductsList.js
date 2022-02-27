import React, { useState } from 'react'
import { 
    Text, 
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal 
} from 'react-native'
import AllProductsItem from './allProductsItem'
import DropShadow from "react-native-drop-shadow";
import {Picker} from '@react-native-picker/picker'
import NewProductsList from './newProductsList';
import DiscountProductsList from './discountProductsList';
import FullProductCard from './fullProductCard'
import Icon from '../elements/IconPurple/iconPurple'
import filter from 'lodash.filter'
import { Overlay } from 'react-native-elements' 

const allProductsList = (props) => {
    const [allProducts, setAllProducts] = useState(props.allProducts)

    const [allProductsCopy, setAllProductsCopy] = useState([])
    //in headerList instead of passing props.handlesearch we can pass handlesearch in order 
    const handleSearch = (query) => {
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(allProducts, user => {
          return contains(user, formattedQuery);
        })
    
        setAllProductsCopy(filteredData);
    }

    const contains = ({ gender, status, category}, query) => {
        //TODO add category.includes
        if (gender.includes(query) || status.includes(query) || category.includes(query)) {
          return true;
        }
        return false;
    }

    const [subCategory, setSubCategory] = useState('')
    const ListHeader = () => {
    // handle search for different categories
    return(
        (props.searchQuery === '' && !props.isEditableArea) ?
            <>
            <DiscountProductsList discountProducts={props.discountProducts} />
            <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center', marginRight:2, height:40, marginTop:10}}>
                <Text style={[CSS.header,{marginRight:2}]}>מוצרים להיטים</Text>
                <Icon 
                    iconName="fire"
                    size={45}
                />
            </View>
            <NewProductsList newProducts={props.newProducts}/>
            <View style={CSS.box}>
                <Picker
                selectedValue={subCategory}
                style={CSS.dropdown}
                onValueChange={(itemValue, itemIndex) => {setSubCategory(itemValue), handleSearch(itemValue)}}>
                <Picker.Item label="הצג - הכל" value="" />
                <Picker.Item label="מוצרים חדשים" value="מוצר חדש" />
                <Picker.Item label="מוצרים במבצע" value="מוצר במבצע" />
                <Picker.Item label="מוצרים להיטים" value="מוצר להיט" />
                <Picker.Item label="ילדים" value="ילדים" />
                <Picker.Item label="נשים" value="נשים" />
                <Picker.Item label="גברים" value="גברים" />
                <Picker.Item label="יוניסקס" value="יוניסקס" />
                <Picker.Item label="נעליים" value="נעליים" />
                <Picker.Item label="בגדים" value="בגדים" />
                <Picker.Item label="שעונים" value="שעונים" />
                <Picker.Item label="אביזרים" value="אביזרים" />
                <Picker.Item label="מכשירים" value="מכשירים" />
                <Picker.Item label="תכשיטים" value="תכשיטים" />
                </Picker>
                <Text style={CSS.header}>רשימת מוצרים</Text>
            </View>
            </>
        :
            null
    )
    }
    //toggle visibility for full article
    const [visible, setVisible] = useState(false)
    //full article details
    const [fullProductCardInfo, setFullProductCardInfo] = useState({})
    const toggleOverlay = (info) => {
        setFullProductCardInfo(info)
        setVisible(!visible)
    }

    const $renderEmptyProductsState = () => {
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

    return (
        <>
        <FlatList 
            ListHeaderComponent={ListHeader}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            // search based on category
            data={subCategory === '' || props.searchQuery !=='' ? props.allProducts : allProductsCopy}
            ListFooterComponent={allProductsCopy.length === 0 && props.searchQuery !== '' ? $renderEmptyProductsState : null}
            keyExtractor={item => item.productId}
            renderItem={ ({item}) => (
                <DropShadow style={CSS.dropShadow}>
                <TouchableOpacity onPress={()=>toggleOverlay(item)}  {...props}>
                    <AllProductsItem productInfo={item} isEditableArea={props.isEditableArea}/>
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
                    borderRadius:15,
                    backgroundColor:'rgba(255,255,255,0.95)',
                }}
            >
            <FullProductCard fullProductCardInfo={fullProductCardInfo} toggleOverlay={toggleOverlay} />
        </Overlay>
        </>
)
}
const CSS = StyleSheet.create({
    box:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop: 20,
        marginRight:10,
        margin:5
    },
    header:{
        color:'#34262f',
        fontSize:18,
        fontFamily:'ganclm_bold-webfont',
        marginRight:0,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        borderBottomWidth:2,
        borderBottomColor:'#34262f'
    },
    modalHeader:{
        color:'#34262f',
        fontSize:20,
        fontFamily:'ganclm_bold-webfont',
        textAlign:'center'
    },
    dropShadow:{
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: -1, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    dropdown: {
        backgroundColor:'rgba(255,255,255,0.5)',
        width:'50%',
    },
    addedToCardMsg:{
      width:300,
      height:270,
      backgroundColor:'white',
      alignSelf:'center', 
      justifyContent:'space-evenly',
      alignItems:'center',
      borderRadius:10,
      borderWidth:3,
      borderColor:'#34262f'
    },
    close: {
        backgroundColor:'#34262f',
        color:'white',
        fontSize:20,
        textAlign:'center',
        width:200,
        borderRadius:5,
        padding:10
    }
})
export default allProductsList;