import React, { useState } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions
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
                iconName='home'
                iconSize={45}
                //title='מוצרים'
                containerStyle={{
                    //backgroundColor:'rgba(255,255,255,0.8)',
                    backgroundColor:'#34262f',
                    width:'20%',
                    borderRadius:5,
                }}
                textStyle={{
                    color:'#fac300',
                    fontSize:10
                }}
                onPress={()=>props.setScreenName('productsList')}/>
            { props.screenName === 'productsList' ?
            <View style={CSS.searchBox}>
                {props.searchQuery !== '' ?
                    <TouchableOpacity onPress={() => props.handleSearch('')}>
                        <Text style={{
                            fontFamily:'Cairo-Bold',
                            color:'#fac300',
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
                    style={{width:'65%', color:'white'}}
                    textAlign="right"
                    textAlignVertical="bottom"
                    underlineColorAndroid='white'
                    selectionColor='#FAC300'
                    placeholderTextColor='white'
                />
                 <Icon 
                    iconName='search' 
                    size={40}
                />
            </View>
            :
            <View style={CSS.searchBoxReplacement}>
                <Text style={CSS.title}> {props.screenNameHebrew} </Text>
            </View>
            }
            <Button 
                iconName='menu'
                iconSize={45}
                //title='תפריט'
                containerStyle={{
                    backgroundColor:'#34262f',
                    width:'23%',
                    borderRadius:5
                }}
                textStyle={{
                    color:'#fac300',
                    fontSize:10
                }}
                onPress={() => setSubMenu(!subMenu)}
            />
            </DropShadow>

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
                        title='פרופיל'
                        iconName='profile'
                        iconSize={50}
                        containerStyle={CSS.subContainerItems}
                        textStyle={{
                            color:'#34262f',
                            fontSize:11
                        }}
                        onPress={() => props.setScreenName('profile')}/>
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
                       onPress={()=>props.setScreenName('history')}/>
                    <Button 
                        title='הגדרות'
                        iconName='settings'
                        iconSize={45}
                        containerStyle={CSS.subContainerItems}
                        textStyle={{
                            color:'#34262f',
                            fontSize:11
                        }}
                        onPress={()=>props.setScreenName('settings')}/>
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
        </SafeAreaView>
    )
    }
const CSS = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width-4,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignSelf:'center',
        alignItems:'center',
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: -5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginTop:2,
        marginBottom:2
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
        marginLeft:2,
        marginRight:2,
        borderRadius:3,
        //backgroundColor:'rgba(255,255,255,0.8)',
        backgroundColor:'#34262f',
        height:'100%'
      },
      searchBoxReplacement: {
        flex:1, 
        flexDirection:'row',
        justifyContent:'center', 
        alignItems:'center',
        marginLeft:2,
        marginRight:2,
        borderRadius:3,
        backgroundColor:'#34262f',
        height:'100%'
      },
      title: {
        //fontFamily:'ganclm_bold-webfont',
        fontFamily:'drugulinclm-bold-webfont',
        fontSize:30, 
        color:'white',
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