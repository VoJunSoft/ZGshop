import React, { useState } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import Button from '../elements/button'
import Icon from '../elements/IconPurple/iconPurple';
import DropShadow from "react-native-drop-shadow";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { Overlay } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const navigationHeaderAdminArea = (props) => {
    const [subMenu, setSubMenu] = useState(false)
    const navigation = useNavigation();
    const jumpTo = () =>{
      navigation.navigate("HomeAlpha")
    }
    return (
        <SafeAreaView>
        <DropShadow style={CSS.container}>
            <Button 
                iconName='back'
                iconSize={50}
                containerStyle={{
                    backgroundColor:'rgba(0,0,0,0.3)',
                    width:'15%',
                    borderRadius:10
                }}
                textStyle={{
                    color:'#FAC300',
                    fontSize:10
                }}
                onPress={jumpTo}
            />
            { props.screenName === 'editProduct' ?
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
                    style={{width:'60%', color:'#FAC300',marginLeft:5,marginRight:5}}
                    textAlign="right"
                    textAlignVertical="bottom"
                    underlineColorAndroid='#FAC300'
                    selectionColor='#FAC300'
                    placeholderTextColor='#FAC300'
                />
                 <Icon 
                    iconName='search' 
                    size={35}
                />
            </View>
            :
            <View style={CSS.searchBox}>
                <Text style={CSS.title}> {props.screenNameHebrew }</Text>
            </View>
            }
            <Button 
                iconName='menu'
                iconSize={50}
                containerStyle={{
                    backgroundColor:'rgba(0,0,0,0.3)',
                    width:'23%',
                    borderRadius:10
                }}
                textStyle={{
                    color:'#FAC300',
                    fontSize:10
                }}
                onPress={() => setSubMenu(!subMenu)}
            />
            </DropShadow>

            <Overlay isVisible={subMenu} 
                    onBackdropPress={()=>setSubMenu(!subMenu)}
                    //onPress={()=>setSubMenu(!subMenu)}
                    overlayStyle={CSS.overlay}>
            <DropShadow style={CSS.subContainer}>
                <Animatable.View
                easing='ease-out-back'
                animation="slideInRight"
                iterationCount={1}
                duration={1000}
                direction="normal">
                    <Button 
                        title='הוספת מוצר'
                        iconName='add'
                        iconSize={50}
                        containerStyle={CSS.subContainerItems}
                        textStyle={{
                            color:'#FAC300',
                            fontSize:10
                        }}
                        onPress={()=>props.setScreenName('newProduct')}
                    />
                    <Button 
                        title= 'עריכת מוצר'
                        iconName='edit'
                        iconSize={50}
                        containerStyle={CSS.subContainerItems}
                        textStyle={{
                            color:'#FAC300',
                            fontSize:10
                        }}
                        onPress={()=>props.setScreenName('editProduct')}
                    />
                    <Button 
                        title='הזמנות'
                        iconName='bell'
                        iconSize={50}
                        containerStyle={CSS.subContainerItems}
                        textStyle={{
                            color:'#FAC300',
                            fontSize:10
                        }}
                       onPress={()=>props.setScreenName('orders')}
                    />
                </Animatable.View>
                </DropShadow>
                </Overlay>
        </SafeAreaView>
    )
    }
const CSS = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:1,
        margin:3,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: -5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        width:'99%'
    },
    subContainer:{
        //flexDirection: 'column',
        width:'100%',
        padding:3,
        marginRight:0,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: -7, height: 7},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    subContainerItems:{
        backgroundColor:'rgba(0,0,0,0.4)',
        width:'100%',
        borderRadius:10,
        marginTop: 7,
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
        height:'95%',
        margin:3,
        borderRadius:10,
        backgroundColor:'rgba(0,0,0,0.3)',
        padding:3
      },
      title: {
        fontFamily:'drugulinclm-bold-webfont',
        fontSize:30, 
        color:'#FAC300',
        padding:5,
      },
      overlay:{
        width:'25%',
        padding: 3,
        backgroundColor:'rgba(255,255,255,0.5)',
        alignSelf:'flex-end',
        top: -150,
      }
})

export default navigationHeaderAdminArea;