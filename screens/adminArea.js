
import React, { useState, useEffect } from 'react'
import { Text, 
         View, 
         ImageBackground,
         StyleSheet,
         Image, 
         TextInput,
         Dimensions,
        ActivityIndicator
        } from 'react-native'
import OrdersAdmin from '../components/ordersAdmin'
import NewProductForm from '../components/newProductForm'
import Button from '../elements/button'
//import DropShadow from "react-native-drop-shadow";
import NavigationHeaderAdminArea from '../components/navigationHeaderAdminArea'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import filter from 'lodash.filter'
import AllProductsList from '../components/allProductsList';

const adminArea = ({navigation}) => {
    const [screenTitle, setScreenTitle] = useState({
        newProduct:'הוספת מוצר',
        editProduct:'עתכון',
        orders:'הזמנות',
    })

    //log in fields data
    const [login, setLogin] = useState({
        email:'',
        password:''
    })

    //product empty state
    const [productEmptyState, setPrroducmptyState] = useState({
        productName: '',
        gender: '',
        timestamp: {seconds: Math.floor(Date.now() / 1000)}, 
        img: '',
        information: '', 
        category: '',
        status: '', 
        price: '',
        colors:'',
        sizes:'',
        quantity:''
    })

    // set an error message in case login failed 
    const [errMsg, setErrMsg] = useState('')
    const [isLoading, setIsloading] = useState(false)
    //tabs navigation values
    const [screenName, setScreenName] = useState('newProduct')
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    //search query value
    const [searchQuery, setSearchQuery] = useState('')
    const [productsList, setProductsList] = useState([])
    const [productsListCopy, setProductsListCopy] = useState([])
    const [resultsFound, setResultsFound] = useState(true)

    useEffect( () => { 
        const unsubscribe = navigation.addListener('focus', () => {
              auth().onAuthStateChanged((user) => {
                if(user){
                  fillProductsState()
                  getData()
                  //setIsUserLoggedIn(true) instead of getData()    
                  //setAdminEmail(user.email)
                }else{
                    setIsUserLoggedIn(false)
                }
              })
        })
        return () => unsubscribe()
      },[navigation])
    
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

      const getData = async () => {
        try {
               const value = await AsyncStorage.getItem('AdminKey')
               if(value !== null){
                    setIsUserLoggedIn(true)
                }else{
                    setIsUserLoggedIn(false)
                }
        } catch(e) {
          // error reading value
        }
      }
    
      const storeData = async (userid) => {
        try {
          await AsyncStorage.setItem('AdminKey', userid)
        } catch (e) {
          //err storing data
        }
      }

    const handleSubmit = () => {
        if(login.email==='' || login.password==='')
           return setErrMsg('احدى المعلومات غير صحيحه')
        //if information is correct setIsReporter to true and save user to asyncStorage
        setIsloading(true)
        const unsub=  auth()
            .signInWithEmailAndPassword(login.email, login.password)
            .then((userCreditentials) => {
                //User account signed in
                //get uid and pass it to store data
                const user = userCreditentials.user
                //get authenticated user email
                //setAdminEmail(user.email)

                //async storage for offline loggin
                storeData(user.uid) 
                //display tabs
                setIsUserLoggedIn(true) 
            })
            .catch(error => {
              setIsloading(false)
              setErrMsg('احدى المعلومات غير صحيحه')
          })
            setIsloading(false)
            return () => unsub
      }
    
    const renderScreenComponents = (screenName) => {
        switch(screenName){
            case 'newProduct':
              return <NewProductForm productEntryInfo={productEmptyState} />
            case 'editProduct':
                return <AllProductsList 
                        allProducts={searchQuery === '' ? productsList : productsListCopy}
                        searchQuery={searchQuery}
                        isEditableArea={true}
                        disabled/>
            case 'orders':
                return <OrdersAdmin />
          }
    }

    //TODO
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

    return (
        //if user is logged in the go to landing screen otherwise stay on log-in screen
        <ImageBackground style={CSS.BG} source={require('../assets/BGs/bg2.png')}>
        {!isUserLoggedIn ? 
            <View style={CSS.loginBlock}>
                <TextInput
                    style={CSS.postInput}
                    onChangeText={text=> setLogin({...login,email: text})}
                    selectionColor="orange"
                    placeholderTextColor="white"
                    placeholder="שם משתמש"
                    underlineColorAndroid='transparent'
                    autoFocus= {true}
                    keyboardType="email-address"
                />
                <TextInput
                    style={CSS.postInput}
                    onChangeText={text=> setLogin({...login,password: text})}
                    selectionColor="orange"
                    placeholderTextColor="white"
                    placeholder="סיסמה"
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}
                />
                <Text style={{color:'red'}}>{errMsg}</Text>
                <Button
                    title="כניסה"
                    iconName='settings'
                    containerStyle={{
                        borderWidth: 0,
                        borderColor: 'transparent',
                        borderRadius: 5,
                        backgroundColor: '#34262f',
                        width:'60%',
                        marginBottom:25,
                    }}
                    textStyle={{
                        width: '80%',
                        marginHorizontal: 0,
                        marginVertical: 10,
                        color:'#fac300',
                        fontSize:19
                    }}
                    onPress={() => handleSubmit()}
                />
                { isLoading ? 
                    <ActivityIndicator color='#fac300' size={50}/>
                    :
                    null
                }
            </View>
        :
            <>
            <NavigationHeaderAdminArea 
                    searchQuery={searchQuery}
                    handleSearch={handleSearch}
                    setScreenName={setScreenName}
                    screenNameHebrew={screenTitle[screenName]}
                    screenName={screenName}
                    />
            {
                renderScreenComponents(screenName)
            }
            </>
        }
        </ImageBackground>
    )
}
const CSS = StyleSheet.create({
    BG:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        width:'100%',
    },
    loginBlock:{
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
        backgroundColor:'rgba(255,255,255,0.9)',
        borderRadius:5,
        padding:10
    },
    loginTxt: {
        fontFamily:'Cairo-Regular',
        fontSize:20, 
        color:'#202028',
        padding:5,
        marginBottom:10
    },
    dropshadow:{
        shadowColor: '#171717',
        shadowOffset: {width: -9, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    postInput: {
        textAlignVertical:'top',
        fontSize: 20,
        borderColor:'#de533c',
        borderBottomWidth:2,
        borderRadius:0,
        marginTop:25,
        fontFamily: "Cairo-Regular",
        textAlign:'right',
        backgroundColor:'rgba(0,0,0,0.5)',
        color: 'white',
        width:'80%'
    }
})

export default adminArea;