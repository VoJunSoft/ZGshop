import React, { useState } from 'react'
import { 
    Text, 
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions,
    Alert
} from 'react-native'
import Icon from '../elements/IconPurple/iconPurple'
import Button from '../elements/button'
import NewProductForm from './newProductForm'
import {Overlay} from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';

const allProductsItem = (props) => {

  const handleDelete = (id) => {
    //delete item based on productId 
    //TODO delete related images from firebase storage
    Alert.alert(
      "تحذير",
      "هل تريد حذف هذا المنشور",
      [
        {
          text: "كلا",
        },
        { 
          text: "نعم", 
          onPress: () => {
                      const sub = firestore()
                        .collection('products')
                        .doc(id)
                        .delete()
                      
                      return () => sub();
                      }
        }
      ]
    )
    
    }
      //toggle visibility for full article
      const [visible, setVisible] = useState(false)
      //full article detals
      const [productInfo, setProductInfo] = useState({})
      const toggleOverlay = (info) => {
        //pass toggleOverlay to fillArticle component
        setProductInfo(info)
  
        setVisible(!visible)
      }

  return (
    <SafeAreaView style={styles.block}>
         <Image style={styles.img} source={{uri: props.productInfo.img[0]}} />
            <View style={styles.titleBlock}>
                <Text style={styles.title}>{props.productInfo.productName}</Text> 
                {props.productInfo.status === 'מוצר חדש' ?
                    <Icon 
                        iconName='new' 
                        size={30}
                    /> : null }
                {props.productInfo.status === 'מוצר להיט' ?
                    <Icon 
                        iconName='fire' 
                        size={30}
                    /> : null }
                {props.productInfo.status === 'מוצר במבצע' ?
                    <Icon 
                        iconName='discount' 
                        size={30}
                    /> : null }
            </View>
            <View style={styles.cardBlock}>
              {props.isEditableArea ?
                <>
                  <Button 
                        iconName='delete' 
                        iconSize={35}
                        containerStyle={{
                          margin:3,
                          borderRadius:5,
                          backgroundColor:'rgba(0,0,0,.35)',
                        }}
                        onPress={() => handleDelete(props.productInfo.productId)}
                  />
                  <Button 
                        iconName='editBlack' 
                        iconSize={35}
                        containerStyle={{
                          margin:3,
                          borderRadius:5,
                          backgroundColor:'rgba(0,0,0,.35)'
                        }}
                        onPress={() => toggleOverlay((props.productInfo))}
                  />
                </>
                :
                <>
                  <Text style={styles.body}>₪{props.productInfo.price}</Text>
                  <Icon 
                      iconName='cart' 
                      size={45}
                  />
                </>
              }
            </View>

            <Overlay isVisible={visible} 
                    onBackdropPress={toggleOverlay} 
                    fullScreen={true}
                    overlayStyle={{flex:-1,justifyContent:'center', alignItems:'center'}}
                    >
              <NewProductForm productEntryInfo={productInfo} 
                              toggleOverlay={toggleOverlay} 
                              cancelButton={true}
                              />
            </Overlay>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    block:{
      flex:1,
      width:Dimensions.get('window').width/2 - 10,
      borderRadius: 5,
      margin: 5,
      backgroundColor:'rgba(255,255,255,0.5)',
    },
    cardBlock: {
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      borderBottomRightRadius:5,
      borderBottomLeftRadius: 5,
    },
    titleBlock: {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },
    title: {
      fontFamily:'Abraham-Regular',
      fontSize: 17,
      color:'#E39B02',
      marginRight:5,
    },
    body: {
      fontFamily:'Cairo-Bold',
      fontSize: 13,
      textAlign: 'right',
      marginTop:5,
      padding: 0,
      color: '#34262f'
    },
    img: {
      height:180,
      width:'100%',
      marginBottom: 5,
      resizeMode:'cover',
      borderTopRightRadius:5,
      borderTopLeftRadius: 5,
      alignSelf:"center"
    }
    });

export default allProductsItem;