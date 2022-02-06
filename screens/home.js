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
import Settings from '../components/settings'
import ContactUs from '../components/contact'
import Orders from '../components/orders'
import Button from '../elements/button'
import DropShadow from "react-native-drop-shadow";
import NavigationHeader from '../components/navigationHeader'
import AllProductsList from '../components/allProductsList'
import filter from 'lodash.filter'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const home = ({navigation}) => {
    //verify user logged in
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)
    //phone sign up confirmation
    const [isConfirmed, setIsConfirmed] = useState(false)
    //splash component
    const [entryScreen, setEntryScreen] = useState(true)
    //phone number registration
    const [phoneNumber, setPhoneNumber] = useState('')
    const [confirmationRecord, setConfirmationRecord] = useState(null)
    const [confirmationInput, setConfirmationInput] = useState('')
    const [errMsg, setErrMsg] = useState('')

    //tabs navigation values
    const [screenName, setScreenName] = useState('productsList')
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
   const [userInfo, setUserInfo] = useState({})

   useEffect( () => {
    // const unsubscribe = navigation.addListener('focus', () => {
        //AsyncStorage.removeItem('cartItems')
        //AsyncStorage.removeItem('userInfo')
        getUserData()
        fillProductsState()
    // })
    // return () => unsubscribe()

    },[])

    const signIn = () => {
        auth().signInWithPhoneNumber('+972' + phoneNumber)
        .then(confirmResult => {
            console.log(confirmResult)
            setConfirmationRecord(confirmResult)
            //show confirmation view
            setIsConfirmed(true)
            })
        .catch(error => {
            setErrMsg(error.message)
            console.log(error)
        }); 
    }

    const confirmation = () => {
        confirmationRecord.confirm(confirmationInput)
        .then((user) => {
             //show entry button
            setIsUserLoggedIn(true)
            //or go directly to products setEntryScreen(true)
          console.log('user --->', user)
        })
        .catch(error => setErrMsg(error.message));
    }

    const signInAnonymously =  async () => {
        let userCredential
        const sub = await auth().onAuthStateChanged( (user) => {
                if(!user)
                    setUserInfo({...userInfo, userId:  auth().signInAnonymously().uid})
                else
                    setUserInfo({...userInfo, userId:  user.uid})  
        })
        console.log(userCredential)
        //render productsList component
        setEntryScreen(false)
        return() => sub()
    }

    //userInfo State
    const getUserData = async () => {
        try {
               const value = await AsyncStorage.getItem('userInfo')
               if(value !== null){
                    setUserInfo(JSON.parse(value))
                }else{
                    setUserInfo({
                        userId: auth().signInAnonymously().uid,
                        name:'',
                        phone:'',
                        email:'',
                        address:'',
                        img:'https://firebasestorage.googleapis.com/v0/b/zgshop-ed60d.appspot.com/o/users%2F1642413422434.png?alt=media&token=426121ce-4a92-4c2d-a3fb-5ad9201c164e'
                    })
                 storeUserData(userInfo)
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
                sizes:documentSnapshot.data().sizes
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
            case 'productsList':
              return <AllProductsList 
                    allProducts={searchQuery === '' ? productsList : productsListCopy}
                    searchQuery={searchQuery}
                    handleSearch={handleSearch}
                    newProducts={filterNewProducts()}
                    discountProducts={filterDiscountProducts()}
                    />
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
        <ImageBackground style={CSS.BG} source={require('../assets/BGs/bg7.png')}>
            
        {entryScreen ? 
        <KeyboardAvoidingView behavior='position'>
        <View style={CSS.presentation}>
            <View style={CSS.header}>
                <Image style={CSS.headerImg} source={require('../assets/gallary/zgshop.png')} />
            </View>
            <DropShadow style={CSS.block1}>
                <Image style={CSS.topLeftImg} source={require('../assets/gallary/item11.jpg')} />
                <Image style={CSS.topRightImg} source={require('../assets/gallary/item22.jpg')} />
            </DropShadow>
            <DropShadow style={CSS.block2}>
                <Image style={CSS.bottomLeftImg} source={require('../assets/gallary/item3.jpg')} />
                <Image style={CSS.bottomRightImg} source={require('../assets/gallary/item4.jpg')} />
            </DropShadow>

            <DropShadow style={CSS.dropshadow}>
                {!isUserLoggedIn ?
                    <View style={[CSS.login]}>
                        {!isConfirmed ?
                            <>
                            <TextInput
                                style={{
                                    width:'70%',
                                    fontFamily:'ganclm_bold-webfont',
                                    backgroundColor:'rgba(255,255,255,0)',
                                    marginTop:10,
                                    color:'#FAC300'
                                }}
                                onChangeText={text=> setPhoneNumber(text)}
                                maxLength={10}
                                selectionColor="orange"
                                placeholderTextColor="black"
                                placeholder="מס טלפון"
                                keyboardType='numeric'
                                underlineColorAndroid='black'
                            />
                            <Text style={{color:'red', width:'100%'}}>{errMsg}</Text>
                            <Button 
                                title='הרשמה'
                                containerStyle={{
                                    backgroundColor:'#34262f',
                                    borderBottomWidth:2,
                                    borderColor:'#FAC300',
                                    width:'50%',
                                    alignSelf:'center',
                                    marginTop:15,
                                }}
                                textStyle={{
                                    fontFamily:'ganclm_bold-webfont',
                                    color:'#FAC300',
                                    fontSize:20,
                                    padding:2,
                                    paddingRight:10,
                                    paddingLeft:10
                                }}
                                onPress={() => signIn()}
                            />
                            </>
                        : 
                            <>
                            <TextInput
                                style={{
                                    width:'70%',
                                    fontFamily:'ganclm_bold-webfont',
                                    backgroundColor:'rgba(255,255,255,0)',
                                    marginTop:10,
                                    color:'#FAC300'
                                }}
                                onChangeText={text=> setConfirmationInput(text)}
                                maxLength={10}
                                selectionColor="orange"
                                placeholderTextColor="black"
                                placeholder="מס אישור"
                                keyboardType='numeric'
                                underlineColorAndroid='black'
                            />
                            <Text style={{color:'red', width:'100%'}}>{errMsg.substring(0,20)}</Text>
                            <Button 
                                title='אישור'
                                containerStyle={{
                                    backgroundColor:'#34262f',
                                    borderBottomWidth:2,
                                    borderColor:'#FAC300',
                                    width:'50%',
                                    alignSelf:'center',
                                    marginTop:15,
                                }}
                                textStyle={{
                                    fontFamily:'ganclm_bold-webfont',
                                    color:'#FAC300',
                                    fontSize:20,
                                    padding:2,
                                    paddingRight:10,
                                    paddingLeft:10
                                }}
                                onPress={() => confirmation()}
                            />
                            </>
                    }
                    </View>
                    :
                    <View style={CSS.login}>
                        <Text style={CSS.loginTxt}>החנות הדיגיטלית הכי מדהים</Text>
                            <Button 
                                title='כניסה'
                                containerStyle={{
                                    backgroundColor:'#34262f',
                                    borderBottomWidth:2,
                                    borderColor:'#FAC300',
                                    width:'50%',
                                    alignSelf:'center',
                                    marginTop:15,
                                }}
                                textStyle={{
                                    fontFamily:'ganclm_bold-webfont',
                                    color:'#FAC300',
                                    fontSize:20,
                                    padding:2,
                                    paddingRight:10,
                                    paddingLeft:10
                                }}
                                onPress={() => setEntryScreen(false)}
                            />
                            {/* if user is signedUp dont show this 
                            <Button 
                                title='SignUp'
                                containerStyle={{
                                    backgroundColor:'#34262f',
                                    borderBottomWidth:2,
                                    borderColor:'#FAC300',
                                    width:'50%',
                                    alignSelf:'center',
                                    marginTop:15,
                                }}
                                textStyle={{
                                    fontFamily:'ganclm_bold-webfont',
                                    color:'#FAC300',
                                    fontSize:20,
                                    padding:2,
                                    paddingRight:10,
                                    paddingLeft:10
                                }}
                                onPress={() => setIsUserLoggedIn(false)}
                            /> */}
                    </View>
                    }
                </DropShadow>
            </View>
            </KeyboardAvoidingView>
        :
            <>
            <NavigationHeader 
                    searchQuery={searchQuery}
                    handleSearch={handleSearch}
                    setScreenName={setScreenName}
                    screenNameHebrew={screenTitle[screenName]}
                    screenName={screenName}
                    />
            {renderScreenComponents(screenName)}
            </>
        }
        </ImageBackground>
    )
}
const CSS = StyleSheet.create({
    BG:{
        flex:1,
        flexDirection:'column',
        justifyContent:"space-evenly"
    },
    presentation:{
        alignItems:'center'
    },
    header:{

    },
    headerImg:{
        width:Dimensions.get('window').width/2,
        height:190,
        resizeMode:'contain',
    },
    block1:{
        flexDirection:'row',
        alignItems:'baseline',
        marginBottom:5,
        shadowColor: '#171717',
        shadowOffset: {width: -6, height: 6},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    block2:{
        flexDirection:'row',
        alignItems:'stretch',
        shadowColor: '#171717',
        shadowOffset: {width: -6, height: 6},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    topLeftImg:{
        width:160,
        height:160,
        resizeMode:'cover',
        marginRight:5,
        borderTopLeftRadius:10,
        borderWidth:0,
        borderColor:'#542652'
    }, 
    topRightImg:{
        width:160,
        height:180,
        resizeMode:'cover',
        borderTopRightRadius:20,
        borderWidth:0,
        borderColor:'#FAC300'
    }, 
    bottomLeftImg:{
        width:160,
        height:180,
        resizeMode:'cover',
        marginRight:5,
        borderBottomLeftRadius:20,
        borderWidth:0,
        borderColor:'#FAC300'
    }, 
    bottomRightImg:{
        width:160,
        height:160,
        resizeMode:'cover',
        borderBottomRightRadius:10,
        borderWidth:0,
        borderColor:'#542652'
    },
    login:{
        justifyContent:'center',
        alignItems:'center',
        width:'95%',
        backgroundColor:'rgba(255,255,255,0.4)',
        marginTop:25,
        borderRadius:20,
        borderBottomWidth:2,
        borderColor:'#FAC300',
        padding:3,
        paddingTop:15,
        paddingBottom:15
    },
    loginTxt: {
        fontFamily:'ganclm_bold-webfont',
        fontSize:20, 
        color:'#202028',
        textAlign:'center'
    },
    dropshadow:{
        width:'95%',
        alignItems:'center',
        margin:2,
        padding:2,
        shadowColor: '#171717',
        shadowOffset: {width: -9, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 2,
    }
})

export default home;
