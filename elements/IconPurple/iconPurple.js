import React, {useState} from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    Image
} from 'react-native';

const iconPurple = (props) => {
    const [icons, setIcons] = useState({
        home:  require('./assets/home.png'),
        bell:  require('./assets/bell.png'),
        add:  require('./assets/add.png'),
        camera:  require('./assets/camera.png'),
        card:  require('./assets/card.png'),
        cart:  require('./assets/cart.png'),
        settings:  require('./assets/settings.png'),
        menu:  require('./assets/menu.png'),
        profile:  require('./assets/profile.png'),
        search:  require('./assets/search.png'),
        edit:  require('./assets/edit.png'),
        contacts:  require('./assets/contacts.png'),
        location:  require('./assets/location.png'),
        exit:  require('./assets/exit.png'),
        envelope:  require('./assets/envelope.png'),
        upload:  require('./assets/upload.png'),
        typing:  require('./assets/typing.png'),
        video:  require('./assets/video.png'),
        load:  require('./assets/load.png'),
        share:  require('./assets/share.png'),
        photo:  require('./assets/photo.png'),
        home2:  require('./assets/home2.png'),
        mic:  require('./assets/mic.png'),
        speakers:  require('./assets/speakers.png'),
        new:  require('./assets/new.png'),
        fire:  require('./assets/fire.png'),
        discountbags: require('./assets/discountbags.png'),
        discount: require('./assets/discount.png'),
        discount20: require('./assets/discount20.png'),
        emptylist: require('./assets/emptylist.png'),
        listlight: require('./assets/listlight.png'),
        listdark: require('./assets/listdark.png'),
        listbag: require('./assets/listbag.png'),
        face: require('./assets/face.png'),
        insta: require('./assets/insta.png'),
        back: require('./assets/back.png'),
        delete: require('./assets/delete.png'),
        editBlack: require('./assets/editBlack.png'),
        whiteStar: require('./assets/whiteStar.png'),
        goldStar: require('./assets/goldStar.png'),
        logo: require('./assets/logo.png'),
        home3: require('./assets/home3.png'),
        gpay: require('./assets/gpay.png'),
    })
   
    return(
    <View>
        <Image style={[{
                    width:props.size,
                    height:props.size,
                }, props.style]} 
                source={icons[props.iconName]} 
                />
    </View>
    )
}

const CSS = StyleSheet.create({
    icon: {
        width:50,
        height:50
    }
})

export default iconPurple;


