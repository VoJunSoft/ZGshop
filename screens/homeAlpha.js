
import React, { useState, useEffect } from 'react'
import { Text, 
         View, 
         ImageBackground,
         StyleSheet,
         Image, 
         ScrollView,
         Dimensions,
         TextInput,
         KeyboardAvoidingView
        } from 'react-native'
import Profile from '../components/profile'
import Cart from '../components/cart'
import Entry from '../components/entry'
import Settings from '../components/settings'
import ContactUs from '../components/contact'
import Orders from '../components/orders'
import NavigationHeader from '../components/navigationHeader'
import AllProductsList from '../components/allProductsList'
import filter from 'lodash.filter'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const homeAlpha = ({navigation}) => {

    //tabs navigation values
    const [screenName, setScreenName] = useState('entry')
    //search query value
    const [searchQuery, setSearchQuery] = useState('')
    //set the titles of screens in arabic
    const [screenTitle, setScreenTitle] = useState({
        productsLists:'מוצרים',
        profile:'פרטי משתמש',
        cart:'סל קניות',
        history:'קניות שלי',
        settings:'הגדרות',  
        contact:'צור קשר' 
    })

   //get products from database
   const [productsList, setProductsList] = useState([])
   const [userInfo, setUserInfo] = useState()

   useEffect( () => {
         const unsubscribe = navigation.addListener('focus', () => {
            //AsyncStorage.removeItem('cartItems')
            //AsyncStorage.removeItem('userInfo')
            //AsyncStorage.removeItem('adminKey')
            getUserData()
            fillProductsState()
        })
         return () => unsubscribe()
    },[])

    //userInfo State
    const getUserData = async () => {
        try {
               const value = await AsyncStorage.getItem('userInfo')
               if(value !== null){
                    setUserInfo(JSON.parse(value))
                }else{
                    setUserInfo({
                        userId: await auth().signInAnonymously().then((cred) => cred.user.uid),
                        name:'',
                        phone:'',
                        email:'',
                        address:'',
                        img:'https://firebasestorage.googleapis.com/v0/b/zgshop-ed60d.appspot.com/o/users%2F1642413422434.png?alt=media&token=426121ce-4a92-4c2d-a3fb-5ad9201c164e'
                    })
                 storeUserData(useInfo)
                 console.log(userInfo)
                }
        } catch(e) {
          // error reading value
        }
    }

    //store user data
    const storeUserData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('userInfo', jsonValue)
        } catch (e) {
          //err storing data
        }
    }

    const fillProductsState = () => {
    const subscriber = firestore()
        .collection('products')
        .orderBy('timestamp', 'asc')
        .onSnapshot(querySnapshot => {
        console.log('Total records: ', querySnapshot.size)
        setProductsList([]);
        querySnapshot.forEach(documentSnapshot => {
            setProductsList((prevState) => {
            return [
                {
                productId: documentSnapshot.id, 
                productName: documentSnapshot.data().productName,
                gender: documentSnapshot.data().gender,
                timestamp: documentSnapshot.data().timestamp, 
                img: documentSnapshot.data().img,
                information: documentSnapshot.data().information, 
                category: documentSnapshot.data().category,
                status: documentSnapshot.data().status, 
                price: documentSnapshot.data().price,
                colors:documentSnapshot.data().colors,
                sizes:documentSnapshot.data().sizes,
                quantity:documentSnapshot.data().quantity
                },  ...prevState
            ]})
        })
        })
        return () => subscriber();
  }

    const [resultsFound, setResultsFound] = useState(true)
    const [productsListCopy, setProductsListCopy] = useState([])
    const handleSearch = (query) => {
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(productsList, user => {
          return contains(user, formattedQuery);
        })
        //show "no results found" when search is empty
        if(filteredData.length === 0)
          setResultsFound(false)
        else
          setResultsFound(true)
    
        setProductsListCopy(filteredData);
        setSearchQuery(query)
    }

    const contains = ({ productName, gender, category, information, status }, query) => {
        if (productName.includes(query) || gender.includes(query) || category.includes(query) || information.includes(query) || status.includes(query)) {
          return true;
        }
        return false;
    }

    //filter newproducts from allproducts based on new
    const filterNewProducts = () => {
        return productsList.filter(record => record.status === 'מוצר להיט')
    }
    //filter newproducts from allproducts based on new
    const filterDiscountProducts = () => {
        return productsList.filter(record => record.status === 'מוצר במבצע')
    }

    //TODO limit map function in case productList is large
    const getRandomImage = () => {
        let randomImages = productsList.map(record => record.img[Math.floor(Math.random() * record.img.length)])
        return randomImages[Math.floor(Math.random() * randomImages.length)]
    }

    const renderScreenComponents = (screenName) => {
        switch(screenName){
            case 'entry':
                return <Entry setScreenName={setScreenName}/>
            case 'productsList':
                return <AllProductsList 
                        allProducts={searchQuery === '' ? productsList : productsListCopy}
                        searchQuery={searchQuery}
                        handleSearch={handleSearch}
                        newProducts={filterNewProducts()}
                        discountProducts={filterDiscountProducts()} />
            case 'profile':
                return <Profile 
                        userInfo={userInfo} 
                        getUserData={getUserData} 
                        storeUserData={storeUserData}/>
            case 'cart':
                return <Cart />
            case 'settings':
                return <Settings />
            case 'history':
                return <Orders userId={userInfo.userId}/>
            case 'contact':
                return <ContactUs />
          }
    }
    return (
        <ImageBackground style={CSS.BG} source={require('../assets/BGs/bg2.png')}>
            {screenName !== 'entry' ?
            <NavigationHeader 
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                setScreenName={setScreenName}
                screenNameHebrew={screenTitle[screenName]}
                screenName={screenName}
                /> : null }
            {
                renderScreenComponents(screenName)
            }
        </ImageBackground>
    )
}
const CSS = StyleSheet.create({
    BG:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
    }
})

export default homeAlpha;