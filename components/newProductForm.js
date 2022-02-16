import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { Overlay} from 'react-native-elements' 
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Icon from '../elements/IconPurple/iconPurple';
import Button from '../elements/button'
import {Picker} from '@react-native-picker/picker'
import Box from '../elements/box'
import BoxSizes from '../elements/boxSizes'

const newProductForm = (props) => {
  //props.productEntryInfo
  const [productInfo, setProductInfo] = useState(props.productEntryInfo)
  const SCREEN_HEIGHT = Dimensions.get('window').height
  const SCREEN_WIDTH = Dimensions.get('window').width
  //Date format
  const handleDate = (dataD) => {
    let data= new Date(dataD)
    let month = data.getMonth() + 1
    let day = data.getDate()
    let year = data.getFullYear()
    if(day<=9)
      day = '0' + day
    if(month<10)
      month = '0' + month
    const postDate = year + '-' + month + '-' + day
    return postDate
  }
  //Date format
  const handleTime = (dataD) => {
    let data= new Date(dataD)
    let hrs = data.getHours()
    let mins = data.getMinutes()
    if(hrs<=9)
        hrs = '0' + hrs
    if(mins<10)
      mins = '0' + mins
    const postTime= hrs + ':' + mins
    return postTime
  }

  useEffect(()=>{
    //if(props.cancelButton === true)
           // handleColorsUpload()
  },[])

  //Handle image upload: the path from phone to show the chosen picture on screen (before upload)
  const [image, setImage] = useState(props.cancelButton ? productInfo.img : [])
  const [transferred, setTransferred] = useState(0)
  const [loadingImg, setLoadingImg] = useState(false)
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: undefined,
      height: 350,
      cropping: true,
      //multiple: true
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      uploadImage(imageUri)
    })
    .catch((e) =>{
        //setImage([])
    })
  }

  //track the number of images downloaded for each product
  //limit the number to three
  const [numberOfImages, setNumberOfImages] = useState(props.cancelButton ? productInfo.img.length-1 : 0)
  const uploadImage =  async (img) => {
        setLoadingImg(true)
        const uploadUri = img;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        setTransferred(0);
        const storageRef = storage().ref(`products/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
        setTransferred(
            Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
        });

        try {
            await task;
            const url = await storageRef.getDownloadURL()
            setImage(image => [...image,url])
            setNumberOfImages(numberOfImages+1)
            setLoadingImg(false)
        } catch (e) {
            //return null
        }
  }

  const handleSubmit = () => {
    if(productInfo.productName.length >= 4){
      toggleOverlay()
      const subscriber = firestore()
          .collection('products')
          .add({...productInfo, img: image, colors: handleColorsInsertion(), sizes: handleSizesInsertion()})
          .then(() => {
              //reset form info
              setProductInfo({   
                productName: '',
                gender: '',
                timestamp: {seconds: Math.floor(Date.now() / 1000)}, 
                img: '',
                information: '', 
                category: '',
                status: '', 
                price: '',
                sizes:'',
                colors:'',
                quantity:'זמין'
                //timestamp:firestore.Timestamp.fromDate(new Date()),
                })
              setImage([])
              setNumberOfImages(0)
              setVisible(false)
              //show add success msg to reporter
              //Alert.alert('تم قبول المقال بنجاح')
          })
          .catch((e)=>{
              Alert.alert("שגיאה, אנא נסה מאוחר יותר או דווח על שגיאה")
          })
          return () => subscriber();
    }else{
        Alert.alert("הזן את כל הנתונים בבקשה")
    }
  }

  const handleEdit = () => {
      console.log(productInfo)
    if(productInfo.productName.length >= 4){
        toggleOverlay()
        const subscriber = firestore()
          .collection('products')
          .doc(productInfo.productId)
          .update({...productInfo, img: image, colors: handleColorsInsertion(), sizes: handleSizesInsertion()})
          .then(() => {
            setVisible(false)
            //show add success msg to reporter
            //Alert.alert('تم تعديل المقال بنجاح')
          })
          .catch((e)=>{
            Alert.alert("שגיאה, אנא נסה מאוחר יותר או דווח על שגיאה")
         })
        return () => subscriber();
    }else{
        Alert.alert("הזן את כל הנתונים בבקשה")
    }
  }

   //toggle visibility for full article
   const [visible, setVisible] = useState(false)
   const toggleOverlay = () => {
     setVisible(!visible)
   }
 
   //delte photo from image array
   const deletePhoto = (index) => {
       //TODO delete image from data
       setImage(image => (
            image.filter((value, i) => i !== index)
        ));
        setNumberOfImages(numberOfImages-1)
   }

   const [productColors, setProductColors] = useState([
    {id: 1, title: 'שחור', checked: false, color: 'black'}, 
    {id: 2, title: 'לבן', checked: false, color: 'white'},
    {id: 3, title: 'כסף', checked: false, color: 'silver'}, 
    {id: 4, title: 'זהב', checked: false, color: 'gold'}, 
    {id: 5, title: 'כמו בתמונה', checked: true, color: null},
    {id: 6, title: 'אדום', checked: false, color: 'darkred'}, 
    {id: 7, title: 'כחול', checked: false, color: 'navy'},
    {id: 8, title: 'ורוד', checked: false, color: 'pink'}, 
    {id: 9, title: 'חום', checked: false, color: 'brown'}, 
    {id: 10, title: 'אפור', checked: false, color: 'darkgray'}, 
  ]);


  //on edit call handleColorsUpload in order to highlight profuctInfo.colors with choosen colors
  const handleColorsUpload = () => {
    setProductColors( () => productInfo.colors.map((color) => {
                                productColors.map((record) =>
                                      record.title === color ? {...record, checked : true} : record
                                 )}
           
    ))
    console.log(productColors)
  }

  //on submit call handlecolors in order to fill profuctInfo.colors with an array of available colors
  const handleColorsInsertion = () => {
    let Selected = []
    productColors.map((record) => {
        if(record.checked === true)
            Selected.push(record.title)
    })
    return Selected
  }

  const toggleColors = (idx) => {
     setProductColors( () => productColors.map((record) => 
                        record.id === idx ? {...record, checked : !record.checked} : record
                    ))
    console.log( productColors)
  }

  const renderColors = (colors) => {
    return(
        colors.map((item, key) => 
        <TouchableOpacity style={{flexDirection:'column', margin: 5, alignItems:'center'}} 
                        key={key}
                        onPress={()=>toggleColors(item.id)}> 
            <Box size={50} color={item.color} borderWidth={item.checked ? 2 : 0}/>
            <Text style={{fontSize:10, color: item.checked ? item.color : 'white' }}>{item.title}</Text>
        </TouchableOpacity>
        ))
  }

  const [productSizes, setProductSizes] = useState([
    {id: 1, caption: 'S', checked: false}, 
    {id: 2, caption: 'M', checked: false},
    {id: 3, caption: 'L', checked: false}, 
    {id: 4, caption: 'XL', checked: false}, 
    {id: 5, caption: 'XXL', checked: false},
    {id: 6, caption: '3XL', checked: false}, 
    {id: 7, caption: '35', checked: false}, 
    {id: 8, caption: '36', checked: false},
    {id: 9, caption: '37', checked: false}, 
    {id: 10, caption: '38', checked: false}, 
    {id: 11, caption: '39', checked: false},
    {id: 12, caption: '40', checked: false},
    {id: 13, caption: '41', checked: false}, 
    {id: 14, caption: '42', checked: false}, 
    {id: 15, caption: '43', checked: false},
    {id: 16, caption: '44', checked: false},
    {id: 17, caption: '45', checked: false},
    {id: 18, caption: 'אחת', checked: true}
  ]);
  //on submit call handlecolors in order to fill profuctInfo.colors with an array of available colors
  const handleSizesInsertion = () => {
    let Selected = []
    productSizes.map((record) => {
        if(record.checked === true)
            Selected.push(record.caption)
    })
    return Selected
  }

  const toggleSizes = (idx) => {
    setProductSizes( () => productSizes.map((record) => 
                        record.id === idx ? {...record, checked : !record.checked} : record
                    ))
    console.log(productSizes)
  }

  const renderSizes = (sizes) => {
    return(
        sizes.map((item, key) => 
        <TouchableOpacity style={{flexDirection:'column', margin: 5, alignItems:'center'}} 
                        key={key}
                        onPress={()=>toggleSizes(item.id)}> 
            <BoxSizes size={45} caption={item.caption} color={'white'} borderWidth={item.checked ? 2 : 0}/>
        </TouchableOpacity>
        ))
  }
  return(
        <>
        { props.cancelButton ?
            <Text style={CSS.title}>עתכון מוצר</Text> : null
        }
        <ScrollView style={CSS.container} showsVerticalScrollIndicator={false}>
        <View style={CSS.dateBlock}>
            <TextInput
              value={props.cancelButton ? handleTime(productInfo.timestamp.seconds*1000) : handleTime(Date())}
              style={CSS.postInputDate}
              editable={false}
              selectionColor="orange"
              placeholderTextColor="white"
              underlineColorAndroid='transparent'
            />
            <TextInput
              value={props.cancelButton ? handleDate(productInfo.timestamp.seconds*1000) : handleDate(Date())}
              style={CSS.postInputDate}
              editable={false}
              selectionColor="orange"
              placeholderTextColor="white"
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={CSS.dateBlock}>
            <Picker
                selectedValue={productInfo.quantity}
                style={[CSS.postInput,{width: '39%'}]}
                onValueChange={(itemValue, itemIndex) => setProductInfo({...productInfo, quantity:itemValue})}>
                <Picker.Item label="זמין" value="זמין" />
                <Picker.Item label="אינו זמין" value="אינו זמין" />
                <Picker.Item label="מגיע בקרוב" value="מגיע בקרוב" />
            </Picker>
            <TextInput
                value={productInfo.productName}
                style={[CSS.postInput,{width: '60%'}]}
                onChangeText={text=> setProductInfo({...productInfo,productName: text})}
                maxLength={25}
                selectionColor="orange"
                placeholderTextColor="white"
                placeholder="שם מוצר"
                underlineColorAndroid='transparent'
              // autoFocus
            />
         </View>
         <Text style={{paddingLeft:'40%', color: productInfo.productName.length < 5  ? 'red': 'green'}}>{productInfo.productName.length}/25</Text>
         
         <View style={CSS.dateBlock}>
            <TextInput
                value={productInfo.price}
                style={CSS.postInputDate}
                onChangeText={text=> setProductInfo({...productInfo,price: text})}
                numberOfLines={1}
                maxLength={5}
                selectionColor="orange"
                placeholderTextColor="white"
                placeholder="מחיר"
                keyboardType='numeric'
                underlineColorAndroid='transparent'
            />
            <Picker
                selectedValue={productInfo.category}
                style={CSS.postInputDate}
                onValueChange={(itemValue, itemIndex) => setProductInfo({...productInfo, category:itemValue})}>
                <Picker.Item style={{fontSize:15}} label="קטגוריה" value="" />
                <Picker.Item label="בגדים" value="בגדים" />
                <Picker.Item label="נעליים" value="נעליים" />
                <Picker.Item label="ארנקים" value="ארנקים" />
                <Picker.Item label="שעונים" value="שעונים" />
                <Picker.Item label="אביזרים" value="אביזרים" />
                <Picker.Item label="מכשירים" value="מכשירים" />
                <Picker.Item label="תכשיטים" value="תכשיטים" />
            </Picker>
        </View>
        <Text style={{paddingLeft:7, color: productInfo.price.length < 1  ? 'red': 'green'}}>{productInfo.price.length}/5</Text>

        <Text style={[CSS.body,{marginTop:10,marginBottom:1}]}> צבעים </Text>
        <View style={CSS.checkBoxesBlock}>
        {
            //render box of colors
            renderColors(productColors)
        }
        </View>

       
        
        {productInfo.category === 'בגדים' || productInfo.category === 'נעליים' ? (
            <>
            <Text style={[CSS.body,{marginTop:10,marginBottom:1}]}> מידות </Text>
            <View style={CSS.checkBoxesBlock}>
               { renderSizes(productSizes) }
            </View>
            </>
        ):(
            null
        )}
        

        <View style={CSS.dateBlock}>
            <Picker
                selectedValue={productInfo.status}
                style={CSS.postInputDate}
                onValueChange={(itemValue, itemIndex) => setProductInfo({...productInfo, status:itemValue})}>
                <Picker.Item style={{fontSize:15, textDecorationLine:'underline'}} label="סטטוס" value="" />
                <Picker.Item label="מוצרים חדשים" value="מוצר חדש" />
                <Picker.Item label="מוצרים במבצע" value="מוצר במבצע" />
                <Picker.Item label="מוצרים להיטים" value="מוצר להיט" />
            </Picker>
            <Picker
                selectedValue={productInfo.gender}
                style={CSS.postInputDate}
                onValueChange={(itemValue, itemIndex) => setProductInfo({...productInfo, gender:itemValue})}>
                <Picker.Item style={{fontSize:15, textDecorationLine:'underline'}} label="מין" value="" />
                <Picker.Item label="נשים" value="נשים" />
                <Picker.Item label="גברים" value="גברים" />
                <Picker.Item label="יוניסקס" value="יוניסקס" />
            </Picker>
        </View>
        
        <TextInput
            value={productInfo.information}
            style={[CSS.postInput,{marginTop:12, textAlignVertical:'top'}]}
            onChangeText={text=> setProductInfo({...productInfo,information: text})}
            maxLength={125}
            selectionColor="orange"
            placeholderTextColor="white"
            placeholder="‏פרטים נוספים"
            underlineColorAndroid='transparent'
            numberOfLines={4}
            multiline
           // autoFocus
         />
         <Text style={{paddingLeft:7, color: productInfo.information.length < 5  ? 'red': 'green'}}>{productInfo.information.length}/125</Text>
        
         <TouchableOpacity onPress={() => numberOfImages<3 ? choosePhotoFromLibrary() : Alert.alert('3 photos only')} style={CSS.imgBlock}>
                        <Icon 
                            iconName='photo'
                            size={70}
                            style={{marginTop:-5}}
                        />
                        {loadingImg ? <ActivityIndicator /> : null}
        </TouchableOpacity>
      
        <View style={[CSS.dateBlock, {marginTop:10}]}>
            {props.cancelButton ?
                // TODO make this block a reusable component
                props.productEntryInfo.img.map( (item, index) => (
                    <View style={{flexDirection:'column',borderWidth:0, borderBottomColor:'#E39B02', alignItems:'center', backgroundColor:'rgba(0,0,0,0.2)'}}
                            key={index}>
                                <Image style={CSS.img} source={{uri: item}} />
                                <Button 
                                    iconName='delete' 
                                    iconSize={35}
                                    containerStyle={{
                                    margin:3,
                                    borderRadius:50,
                                    backgroundColor:'rgba(0,0,0,.35)',
                                    }}
                                    onPress={()=>deletePhoto(index)}
                                />
                    </View>
                ))
              : 
                <>
                {
                        image.map( (item, index) => (
                            <View style={{flexDirection:'column',borderWidth:0, borderBottomColor:'#E39B02',alignItems:'center', backgroundColor:'rgba(0,0,0,0.2)'}}
                                  key={index}>
                                <Image style={CSS.img} source={{uri: item}} />
                                <Button 
                                    iconName='delete' 
                                    iconSize={35}
                                    containerStyle={{
                                    borderRadius:50,
                                    backgroundColor:'rgba(0,0,0,.35)',
                                    }}
                                    onPress={()=>deletePhoto(index)}
                                />
                            </View>
                        ))
                 
                } 
               </>
            }
        </View>
         
        <View style={CSS.buttonContainer}>
        { props.cancelButton  ?
        <>
            <Button
                title="חזרה"
                containerStyle={{
                    borderBottomColor:'#fac300',
                    borderBottomWidth:3,
                    borderRadius: 10,
                    backgroundColor: '#34262f',
                    width:'45%',
                    marginTop:20
                }}
                textStyle={{ 
                    fontSize: 18, 
                    color:'#fac300',
                    marginHorizontal: 0,
                    marginVertical: 10,
                }}
                onPress={props.toggleOverlay}
            /> 
            <Button
                title="עתכון מוצר"
                containerStyle={{
                    borderBottomColor:'#fac300',
                    borderBottomWidth:3,
                    borderRadius: 10,
                    backgroundColor: '#34262f',
                    width:'45%',
                    marginTop:20
                }}
                textStyle={{ 
                    fontSize: 18, 
                    color:'#fac300',
                    marginHorizontal: 0,
                    marginVertical: 10,
                }}
                onPress={() => handleEdit()}
            />
        </>
        :
        <Button
            title="שמירת מוצר"
            containerStyle={{
                borderBottomColor:'#fac300',
                borderBottomWidth:3,
                borderRadius: 10,
                backgroundColor: '#34262f',
                width:'50%',
                marginTop:20
            }}
            textStyle={{ 
                fontSize: 18, 
                color:'#fac300',
                marginHorizontal: 0,
                marginVertical: 10,
            }}
            onPress={() => handleSubmit()}
            />
        }
        </View>
        <Overlay isVisible={visible} 
                onBackdropPress={toggleOverlay} 
                fullScreen={true}
                overlayStyle={{padding:20, backgroundColor:'rgba(255,255,255,0.4)'}}
                >
                <ActivityIndicator size={100} color="#E39B02" marginTop={'50%'} />
        <Text style={CSS.loading}>אנא המתן בזמן ההעלאה</Text>
        </Overlay>
    </ScrollView>
    </>
    )
 }

const CSS = StyleSheet.create({
  container:{
    flex:1,
    width:'94%',
    backgroundColor:'rgba(255,255,255,0)',
    paddingTop:10,
  },
  body:{
    width:'100%',
    justifyContent:'center',
    alignSelf:'center',
    fontSize: 20,
    textAlign: 'right',
    color:'white',
    fontFamily:'drugulinclm-bold-webfont',
    backgroundColor:'rgba(0,0,0,0.5)',
    paddingRight:12,
    paddingTop:7,
    paddingBottom: 5
  },
  title: {
    width:'100%',
    height:50,
    textAlignVertical:'center',
    fontSize: 30,
    textAlign: 'center',
    color:'#E39B02',
    backgroundColor:'rgba(0,0,0,0.5)',
    fontFamily:'drugulinclm-bold-webfont',
  },
  postInput: {
    fontSize: 15,
    borderBottomColor:'#E39B02',
    borderBottomWidth:3,
    marginTop:10,
    fontFamily: "Cairo-Regular",
    textAlign:'right',
    color: 'white',
    borderRadius:0,
    paddingRight:10,
    backgroundColor:'rgba(0,0,0,0.5)',
  },
  postInputDate: {
    width:'48%',
    textAlignVertical:'top',
    fontSize: 15,
    borderBottomColor:'#E39B02',
    borderBottomWidth:3,
    margin:0,
    fontFamily: "Cairo-Regular",
    textAlign:'center',
    backgroundColor:'rgba(0,0,0,0.5)',
    color: 'white',
  },
  dateBlock: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10,
    marginBottom:5
  },
  checkBoxesBlock: {
    width:'100%',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
    alignSelf:'center',
    backgroundColor:'rgba(0,0,0,0.5)',
    marginBottom: 10,
    borderBottomColor:'#E39B02',
    borderBottomWidth:3,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  imgBlock:{
    flex:1,
    justifyContent:'center',
    resizeMode:'contain',
    alignItems:'center',
    margin:7
  },
  img: {
    // width:110,
    width: Dimensions.get('window').width/3.7,
    height: 120,
    resizeMode:'cover',
  },
  loading: {
    textAlign:'center',
    fontSize: 20,
    color:'green',
  }
});

export default newProductForm;