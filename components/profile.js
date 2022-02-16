import React, { useState, useEffect } from 'react'
import { 
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    Alert,
    ScrollView
} from 'react-native'
import Button from '../elements/button'
import DropShadow from "react-native-drop-shadow";
import ProfileHeader from './profileHeader'

const profile = (props) => {
    const [userInfo, setUserInfo] = useState(props.userInfo)
    useEffect( () => {
        //guaranty user have his userInfo key stored even before storing or changing his data in order to keey the same UID
        props.storeUserData(props.userInfo)
        console.log(props.userInfo)
    },[])
    
    const [isEditable, setIsEditable] = useState(()=>   userInfo.name === '' || 
                                                        userInfo.phone === '' || 
                                                        userInfo.email === '' || 
                                                        userInfo.address === '' ? true : false)
    const saveUserInfo = () => {
        //TODO phone number and email verifications
        if(userInfo.name.length >= 5 && userInfo.phone.length >= 10 && userInfo.email.length >= 10 && userInfo.address.length >= 12){
            props.storeUserData(userInfo)
            props.getUserData()
            setIsEditable(false)
        }  
        else{
            Alert.alert('הכנס את כל הנתונים בבקשה')
        }     
    }

    const confirmUserInfo = () => {
        //TODO phone number and email verifications
        if(userInfo.name.length >= 5 && userInfo.phone.length >= 10 && userInfo.email.length >= 10 && userInfo.address.length >= 12){
            props.storeUserData(userInfo)
            props.getUserData()
            
            props.setOrder({...props.order, user: userInfo}),
            props.setScreenName('confirmation')
        }  
        else{
            Alert.alert('הכנס את כל הנתונים בבקשה')
        }     
    }

    return (
        <View style={{flex:1, flexDirection:'column', justifyContent:'space-around'}}>
            {props.isCheckOut ? 
                <Text style={[CSS.body,{fontWeight:'bold', color:'black', alignSelf:'center', backgroundColor:'#fac300'}]}>אמת את המידע שלך בבקשה</Text>
                :
                <ProfileHeader />
            }

            { isEditable || props.isCheckOut ?
            <DropShadow style={CSS.dropShadow}>
            <View style={CSS.containerEdit}>
                <View style={CSS.blockEdit}>
                    <TextInput
                    value={userInfo.name}
                    style={[CSS.postInput]}
                    onChangeText={text=> setUserInfo({...userInfo, name: text})}
                    maxLength={25}
                    selectionColor="orange"
                    placeholderTextColor="white"
                    placeholder="שם מלאה"
                    underlineColorAndroid='transparent'
                    //autoFocus
                    />
                    <Text style={CSS.body}>שם מלאה</Text>
                </View>
                <View style={CSS.blockEdit}>
                    <TextInput
                    value={userInfo.phone}
                    style={[CSS.postInput]}
                    onChangeText={text=> setUserInfo({...userInfo, phone: text})}
                    maxLength={12}
                    selectionColor="orange"
                    placeholderTextColor="white"
                    placeholder="מס טלפון"
                    underlineColorAndroid='transparent'
                    keyboardType='numeric'
                    />
                    <Text style={CSS.body}>מס טלפון</Text>
                </View>
                <View style={CSS.blockEdit}>
                    <TextInput
                    value={userInfo.email}
                    style={[CSS.postInput]}
                    onChangeText={text=> setUserInfo({...userInfo, email: text})}
                    maxLength={30}
                    selectionColor="orange"
                    placeholderTextColor="white"
                    placeholder="אימייל"
                    underlineColorAndroid='transparent'
                    />
                    <Text style={CSS.body}>אימייל</Text>
                </View>
                <View style={CSS.blockEdit}>
                    <TextInput
                    value={userInfo.address}
                    style={[CSS.postInput, {textAlignVertical:'top'}]}
                    onChangeText={text=> setUserInfo({...userInfo, address: text})}
                    maxLength={70}
                    selectionColor="orange"
                    placeholderTextColor="white"
                    placeholder="כתובת"
                    underlineColorAndroid='transparent'
                    numberOfLines={4}
                    multiline
                    />
                    <Text style={CSS.body}>כתובת</Text>
                </View>
            </View>
            </DropShadow>
           :
           <DropShadow style={CSS.dropShadow}>
            <View style={CSS.container}>
                <View style={CSS.block}>
                        <Text style={[CSS.body,{width:"60%", textAlign:'center'}]}>{userInfo.name}</Text>
                        <Text style={CSS.body}>⬅</Text>
                        <Text style={[CSS.body,{width:"30%"}]}>שם משתמש</Text>
                </View>
                <View style={CSS.block}>
                        <Text style={[CSS.body,{width:"60%", textAlign:'center'}]}>{userInfo.phone}</Text>
                        <Text style={CSS.body}>⬅</Text>
                        <Text style={[CSS.body,{width:"30%"}]}>מס טלפון</Text>
                </View>
                <View style={CSS.block}>
                        <Text style={[CSS.body,{width:"60%", textAlign:'center'}]}>{userInfo.email}</Text>
                        <Text style={CSS.body}>⬅</Text>
                        <Text style={[CSS.body,{width:"30%"}]}>אימייל</Text>
                </View>
                <View style={CSS.block}>
                    <Text style={[CSS.body,{width:"60%", textAlign:'center'}]}>{userInfo.address}</Text>
                    <Text style={CSS.body}>⬅</Text>
                    <Text style={[CSS.body,{width:"30%"}]}>כתובת</Text>     
                </View>
            </View>
            </DropShadow>
            }
            <View style={{
                        flex:props.isCheckOut ? -1 : 1,
                        justifyContent:'flex-end',
                        alignItems:'flex-end',
                        margin:10
                        }}>
            <DropShadow style={CSS.dropShadow}>
            { !props.isCheckOut ?
                (!isEditable ?
                    <Button
                        iconName="edit"
                        iconSize={60}
                        containerStyle={{
                            backgroundColor:'#34262f',
                            borderRadius: 100,
                            width:'25%',
                            borderWidth:2,
                            borderColor: '#fac300',
                            marginTop:10
                        }}
                        textStyle={{ 
                            fontSize: 15, 
                            color:'#E39B02',
                        }}
                        onPress={()=>setIsEditable(true)}
                    /> 
                    :
                    <Button
                        iconName="upload"
                        iconSize={60}
                        containerStyle={{
                            backgroundColor:'#34262f',
                            borderRadius: 50,
                            width:'25%',
                            borderWidth:2,
                            borderColor: '#fac300',
                            marginTop:10
                        }}
                        textStyle={{ 
                            fontSize: 15, 
                            color:'#E39B02',
                        }}
                        onPress={()=>saveUserInfo()}
                    /> 
                ):( 
                   null
                )}
            </DropShadow>
            </View>
            {props.isCheckOut ?
                <View style={{
                            alignSelf:'center',
                        }}>
                    <Button
                        title='הבא'
                        iconSize={60}
                        containerStyle={{
                            backgroundColor:'#34262f',
                            borderRadius: 5,
                            borderBottomWidth:3,
                            borderColor: '#fac300',
                            width:200,
                            marginTop:10
                        }}
                        textStyle={{ 
                            fontFamily:'Abraham-Regular',
                            fontSize: 30, 
                            color:'#fac300',
                        }}
                        onPress={()=> confirmUserInfo() }
                    /> 
                </View> : null }
        </View>
    )
    }

const CSS = StyleSheet.create({
    container:{
        flex:-1,
        width:'100%',
        marginTop:15,
    },
    containerEdit: {
        alignSelf:'center',
        width:'95%',
        backgroundColor:'rgba(255,255,255,0.8)',
        marginTop:20,
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth:5,
        borderColor:'#34262f',
        borderRadius:5
    },
    block: {
        width:'96%',
        backgroundColor:'rgba(255,255,255,0.8)',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        marginTop:15,
        padding:15,
        borderBottomWidth:5,
        borderColor:'#34262f'
    },
    blockEdit: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:5,
        paddingRight:5,

    },
    postInput: {
        width:'70%',
        fontSize: 15,
        borderBottomColor:'#fac300',
        borderBottomWidth:4,
        fontFamily: "Cairo-Regular",
        textAlign:'right',
        color: 'white',
        backgroundColor:'#34262f',
    }, 
    body:{
        fontSize: 20,
        textAlign: 'right',
        fontFamily:'drugulinclm-bold-webfont',
      },
    dropShadow:{
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        },
    })

export default profile;