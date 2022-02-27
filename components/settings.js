import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Share from "react-native-share";
import  auth  from '@react-native-firebase/auth';
//import firestore from '@react-native-firebase/firestore';
import Icon from '../elements/IconPurple/iconPurple';

const settings = (props) => {
  //tap 5 times to show login button
  const [devConsoleCount, setCount] = useState (0)
  //reporter authentication state
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
           const value = await AsyncStorage.getItem('AdminKey')
           if(value !== null){
                setIsOwner(true)
            }else{
                setIsOwner(false)
            }
    } catch(e) {
      // error reading value
    }
  }

  const confirmSignOut = () =>
    Alert.alert(
      "ZGshop",
      "אתה בטוח שאתה רוצה לצאת",
      [
        {
          text: "לא"
        },
        { 
          text: "כן", 
          onPress: () => handleSignOut() 
        }
      ]
  )

  const handleSignOut = () => {
    AsyncStorage.removeItem('AdminKey')
    setCount(0)
    setIsOwner(false)
    //return() => auth().signOut()
  }

  const navigation = useNavigation();
  const jumpTo = () =>{
    navigation.navigate("AdminArea")
    //set home component to productsList
    //props.setScreenName('productsList')
  }

  const share = async (customOptions) => {
    try {
      await Share.open(customOptions)
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <ScrollView>
        <Image style={styles.logo} source={require('../assets/gallary/zgshop.png')} />
     
        <Text style={styles.titleSub}>מודעות</Text>
        <View style={styles.block}>
            <Text style={styles.body}>מוצר להיט</Text>
            <Icon
                iconName='fire'
                size={40}
            />
        </View>
        <View style={styles.block}>
            <Text style={styles.body}>מוצר חדש</Text>
            <Icon
                iconName='new'
                size={40}
            />
        </View>
        <View style={styles.block}>
            <Text style={styles.body}>מוצר במבצע</Text>
            <Icon
                iconName='discount'
                size={40}
            />
        </View>
         
      <Text style={styles.titleSub}>לוח הגדרות</Text>
        <View style={styles.block}>
          <Text style={styles.body}>התראות</Text>
          <Icon
            iconName='bell'
            size={50}
            />
        </View>

        <TouchableOpacity style={styles.block} onPress={async () => {
                  await share({
                    title: "ZGshop",
                    message: "Luxury Brands",
                    url: 'https://play.google.com/store/apps/details?id=com.junglesoft.zgshop'
                  })
          }}>
            <Text style={styles.body}>שתף</Text>
            <Icon
                iconName='share'
                size={50}/>
        </TouchableOpacity>

        {isOwner ?
          <TouchableOpacity style={styles.block} onPress={()=>confirmSignOut()} >
            <Text style={styles.body}>יציאה</Text>
            <Icon
                  iconName='exit'
                  size={50}/>
          </TouchableOpacity>
          :
          null
        }

      <TouchableWithoutFeedback onPress={()=>setCount(devConsoleCount+1)}>
        <Text style={styles.titleSub}>מדיה חברתית</Text>
      </TouchableWithoutFeedback>
        <TouchableOpacity style={[styles.block,{marginBottom:5}]} onPress={()=>Linking.openURL('https://www.instagram.com/zg.shop1/')}>
            <Text style={styles.body}>zg.shop1</Text>
            <Icon
                iconName='insta'
                size={50}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.block} onPress={()=>Linking.openURL('https://m.facebook.com/Zg-shop-100712465441577/')}>
            <Text style={styles.body}>Zg shop</Text>
            <Icon
                iconName='face'
                size={50}
            />
        </TouchableOpacity>
        {devConsoleCount >= 5 || isOwner ?
            <TouchableOpacity style={[styles.block, {marginTop:10}]} onPress={()=>jumpTo()}>
                <Text style={styles.body}>Admin.Space</Text>
                <Icon
                    iconName='listdark'
                    size={50}
                />
            </TouchableOpacity>
          :
          null
        } 
     </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 5
  },
  logo: {
    resizeMode:"contain",
    width: '100%',
    height: 170,
  },
  title: {
    fontFamily:'OzradCLM-Bold',
    fontSize: 25,
    marginRight: 5,
    color:'#E39B02',
  },
  block: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    alignSelf:'flex-end',
    marginRight:30,
    width:'50%',
  },
  titleSub: {
    alignSelf:'flex-end',
    width:'70%',
    fontFamily:'OzradCLM-Bold',
    fontSize: 17,
    marginTop: 7,
    textAlign: 'center',
    color:'white',
    backgroundColor:'#34262f',
    padding: 6,
    paddingRight: 20,
    marginBottom:10,
    borderBottomWidth:3,
    borderBottomColor:'#fac300',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5
  },
  body:{
    fontFamily:'OzradCLM-Bold',
    fontSize:15,
    textAlign: 'right',
    color:'black',
    paddingRight:10,
    paddingLeft: 20,
    padding:7
  },
  });

export default settings;