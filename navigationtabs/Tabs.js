import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, ImageSc, Profile } from '../screens';


const Tab = createBottomTabNavigator();
const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? 'black' : 'gray';
                    switch (route.name) {
                        case "ChatBot":
                            return (
                                <Image
                                    source={require('../assets/Images/ai.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />
                            );
                        case "TextToImage":
                            return (
                                <Image
                                    source={require('../assets/Images/ai1.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />
                            );
                        case "Profile":
                            return (
                                <Image
                                    source={require('../assets/Images/chatbot.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />
                            );

                    }
                }
            }

            )}

        >
             <Tab.Screen
             name='ChatBot'
             component={Home}
             />
             <Tab.Screen
            name='TextToImage'
            component={ImageSc}
            />
            <Tab.Screen
            name='Profile'
            component={Profile}
            />

        </Tab.Navigator>

    )
}

export default Tabs;

