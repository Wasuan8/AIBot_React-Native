import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import Onboarding from 'react-native-onboarding-swiper';



const Onbaording = () => {
    const navigation = useNavigation();
    const DotComponent = ({ selected }) => {
        let backgroundColor;
        backgroundColor = selected ? '#ADD8E6' : '#0000FF'
        return (
            <View
                style={{
                    width:10,
                    height: 10,
                    marginHorizontal: 3,
                    backgroundColor,
                    borderRadius: 10,
                }}
            />
        )
    };
    return (
        <Onboarding
            onskip={() => navigation.replace("Home")}
            onDone={() => navigation.replace("Home")}
            DotComponent={DotComponent}

            pages={[
                {
                    backgroundColor: 'white',
                    image: <Image style={{ width: 350, height: 250, alignItems:'center'}} source={require('../assets/Images/Image4.jpg')} />,
                    title: <View style={{alignContent:'center',alignItems:'center'}}>
                        <View style={{height:100,margin: 10,flexDirection:'row' }}>
                        <Image  style={{width: '100%', height: '90%', backgroundColor:'white'}} source={require('../assets/Images/openAi.png')}/>
                        </View>
                    </View>,
                    subtitle: 'Get ready for an exciting and unique experience as we introduce you to our chat bot AI.',
                },
                {
                    backgroundColor: 'white',
                    image: <Image style={{width: 350, height: 250 }} source={require('../assets/Images/Image5.jpg')} />,
                    title: 'Welcome to our Chat Bot!',
                    subtitle: 'Chat with our AI assistant to get instant help and support.',
                },
                {
                    backgroundColor: 'white',
                    image: <Image style={{ width: 350, height: 250, alignItems: 'center' }} source={require('../assets/Images/Image6.jpg')} />,
                    title: ' Get Ready to Be Amazed',
                    subtitle: 'Our chat bot AI is ready to blow your mind with its intelligence and natural language processing. Get ready to be wowed!',
                },
            ]}
        />
    )
}

export default Onbaording;

const styles = StyleSheet.create({});