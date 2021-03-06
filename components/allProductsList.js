import React, { useState } from 'react'
import { 
    Text, 
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet 
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

    const [resultsFound, setResultsFound] = useState()
    const [allProductsCopy, setAllProductsCopy] = useState([])
    //in headerList instead of passing props.handlesearch we can pass handlesearch in order 
    const handleSearch = (query) => {
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(allProducts, user => {
          return contains(user, formattedQuery);
        })
        //show "no results found" when search is empty
        if(filteredData.length === 0)
          setResultsFound(false)
        else
          setResultsFound(true)
    
        setAllProductsCopy(filteredData);
    }

    const contains = ({ gender, status}, query) => {
        //TODO add category.includes
        if (gender.includes(query) || status.includes(query)) {
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
                <Text style={[CSS.header,{marginRight:2}]}>???????????? ????????????</Text>
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
                <Picker.Item style={{fontSize:15}} label="?????? - ??????" value="" />
                <Picker.Item label="???????????? ??????????" value="???????? ??????" />
                <Picker.Item label="???????????? ??????????" value="???????? ??????????" />
                <Picker.Item label="???????????? ????????????" value="???????? ????????" />
                <Picker.Item label="????????" value="????????" />
                <Picker.Item label="??????????" value="??????????" />
                <Picker.Item label="??????????????" value="??????????????" />
                </Picker>
                <Text style={CSS.header}>?????????? ????????????</Text>
                {/* <Icon 
                    iconName="listdark"
                    size={55}
                    style={{marginRight: 5}}
                /> */}
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

    return (
        <>
        <FlatList 
            ListHeaderComponent={ListHeader}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            // search based on category
            data={subCategory === '' || props.searchQuery !=='' ? props.allProducts : allProductsCopy}
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
                    margin:30, 
                    marginTop:90, 
                    marginBottom:90, 
                    borderRadius:15,
                    backgroundColor:'rgba(255,255,255,0.95)',
                }}
            >
            <FullProductCard fullProductCardInfo={fullProductCardInfo} toggleOverlay={toggleOverlay}/>
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
        color:'#34262f',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        borderBottomWidth:2,
        borderBottomColor:'#FAC300'
    },
    dropShadow:{
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    dropdown: {
        backgroundColor:'rgba(255,255,255,0.5)',
        width:'50%',
    }
})
export default allProductsList;