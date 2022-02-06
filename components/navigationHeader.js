import React, { useState } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import Button from '../elements/button'
import DropShadow from "react-native-drop-shadow";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import Icon from '../elements/IconPurple/iconPurple';
import { Overlay } from 'react-native-elements';

const navigationHeader = (props) => {
    const [subMenu, setSubMenu] = useState(false)
    return (
        <SafeAreaView>
        <DropShadow style={CSS.container}>
            <Button 
                iconName='profile'
                iconSize={50}
                containerStyle={{
                    backgroundColor:'rgba(255,255,255,0.8)',
                    width:'20%',
                    borderRadius:0
                }}
                textStyle={{
                    color:'#34262f',
                    fontSize:10
                }}
                onPress={() => props.setScreenName('profile')}
            />
            { props.screenName === 'productsList' ?
            <View style={CSS.searchBox}>
                {props.searchQuery !== '' ?
                    <TouchableOpacity onPress={() => props.handleSearch('')}>
                        <Text style={{
                            fontFamily:'Cairo-Bold',
                            color:'#FAC300',
                            fontSize:23,
                        }}> 
                        ⓧ
                        </Text>
                    </TouchableOpacity>
                    : 
                    null 
                }
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    value={props.searchQuery}
                    onChangeText={queryText => props.handleSearch(queryText)}
                    placeholder="חיפוש"
                    style={{width:'60%', color:'#34262f',marginLeft:5,marginRight:5}}
                    textAlign="right"
                    textAlignVertical="bottom"
                    underlineColorAndroid='#34262f'
                    selectionColor='#FAC300'
                    placeholderTextColor='#34262f'
                />
                 <Icon 
                    iconName='search' 
                    size={35}
                />
            </View>
            :
            <View style={CSS.searchBox}>
                <Text style={CSS.title}> {props.screenNameHebrew} </Text>
            </View>
            }
            <Button 
                iconName='menu'
                iconSize={50}
                containerStyle={{
                    backgroundColor:'rgba(255,255,255,0.8)',
                    width:'23%',
                    borderRadius:0
                }}
                textStyle={{
                    color:'#FAC300',
                    fontSize:10
                }}
                onPress={() => setSubMenu(!subMenu)}
            />
            </DropShadow>

            {/* {subMenu ? */}
            <Overlay isVisible={subMenu} 
                    onBackdropPress={()=>setSubMenu(!subMenu)}
                    overlayStyle={CSS.overlay}>
            <DropShadow style={CSS.subContainer}>
                <Animatable.View
                easing='ease-out-back'
                animation="slideInRight"
                iterationCount={1}
                duration={1000}
                direction="normal">
                    <Button 
                        title='מוצרים'
                        iconName='home2'
                        iconSize={45}
                        containerStyle={CSS.subContainerItems}
                        textStyle={{
                            color:'#34262f',
                            fontSize:11
                        }}
                        onPress={()=>props.setScreenName('productsList')}
                    />
                    <Button 
                        title= 'סל קניות'
                        iconName='cart'
                        iconSize={45}
                        containerStyle={CSS.subContainerItems}
                        textStyle={{
                            color:'#34262f',
                            fontSize:11
                        }}
                        onPress={()=>props.setScreenName('cart')}
                    />
                    <Button 
                        title='קניות שלי'
                        iconName='contacts'
                        iconSize={45}
                        containerStyle={CSS.subContainerItems}
                        textStyle={{
                            color:'#34262f',
                            fontSize:11
                        }}
                       onPress={()=>props.setScreenName('history')}
                    />
                    <Button 
                        title='הגדרות'
                        iconName='settings'
                        iconSize={45}
                        containerStyle={CSS.subContainerItems}
                        textStyle={{
                            color:'#34262f',
                            fontSize:11
                        }}
                        onPress={()=>props.setScreenName('settings')}
                    />
                    {/* <Button 
                        title='צור קשר'
                        iconName='typing'
                        iconSize={50}
                        containerStyle={{  
                            backgroundColor:'rgba(255,255,255,0.4)',
                            width:'100%',
                            borderRadius:90,
                            marginTop: 10,
                            alignSelf:'flex-end',
                        }}
                        textStyle={{
                            marginTop:-7,
                            color:'#34262f',
                            fontSize:10
                        }}
                        onPress={()=>props.setScreenName('contact')}
                    /> */}
                </Animatable.View>
                </DropShadow>
                </Overlay>
            {/* :
                null
            } */}
        </SafeAreaView>
    )
    }
const CSS = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:2,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: -5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    subContainer:{
        flexDirection: 'column',
        justifyContent:'center',
        width:'100%',
        padding:3,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: -7, height: 7},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    subContainerItems:{
        backgroundColor:'rgba(255,255,255,0.8)',
        width:'100%',
        borderRadius:10,
        marginTop: 5,
        marginBottom:5,
        alignSelf:'flex-end',
    },
    button: {
        fontFamily:'Cairo-Regular',
        textAlign:'center',
    },
    searchBox: {
        flex:1, 
        flexDirection:'row',
        justifyContent:'center', 
        alignItems:'center',
        height:'100%',
        margin:3,
        borderRadius:0,
        backgroundColor:'rgba(255,255,255,0.8)',
        padding:3
      },
      title: {
        //fontFamily:'ganclm_bold-webfont',
        fontFamily:'drugulinclm-bold-webfont',
        fontSize:30, 
        color:'#34262f',
        padding:5,
      },
      overlay:{
        width:'25%',
        padding: 5,
        backgroundColor:'rgba(255,255,255,0.5)',
        alignSelf:'flex-end',
      }
})

export default navigationHeader;