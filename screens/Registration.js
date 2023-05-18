import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Pressable, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [apiKey, setApiKey] = useState("");

    const navigation = useNavigation();
    const register = () => {

        if (email === "" || password === "" || userName === "" || apiKey === " ") {
            Alert.alert(
                "Invalid Details",
                "Please fill all the details",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );

        }
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("user crendential", userCredential);
            const user = userCredential._tokenResponse.email;
            const myUserUid = auth.currentUser.uid;
            setDoc(doc(db, "users", `${myUserUid}`), {
                email: user,
                userName: userName,
                apiKey: apiKey
            }).then(() => {
                console.log('User registered successfully!');
            }).catch((error) => {
                console.log(error);
            });
        })
    }
    // const handleRegister =() =>{

    //     setName("");
    //     setUserName("");
    //     setEmail("");
    //     setPassword("");

    // }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 10 }}>
            <KeyboardAvoidingView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: 20, color: '#662d91', fontWeight: 'bold' }}>Register</Text>
                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: '600' }}>Create a new account</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder='User Name '
                        value={userName}
                        onChangeText={(text) => setUserName(text)}
                        placeholderTextColor="black"
                        style={{
                            fontSize: userName ? 18 : 18,
                            borderBottomWidth: 1, borderBottomColor: 'gray', marginLeft: 13, width: 300,
                            marginVertical: 10,color:'black'
                        }} />

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor="black"
                        style={{
                            fontSize: email ? 18 : 18,
                            borderBottomWidth: 1, borderBottomColor: 'gray', marginLeft: 13, width: 300,
                            marginVertical: 10,color:'black'
                        }} />

                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        placeholderTextColor="black"
                        style={{
                            fontSize: password ? 18 : 18,
                            borderBottomWidth: 1, borderBottomColor: 'gray', marginLeft: 13, width: 300,
                            marginVertical: 20,color:'black'
                        }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder='Api_Key from OpenAi'
                        value={apiKey}
                        onChangeText={(text) => setApiKey(text)}
                        placeholderTextColor="black"
                        style={{
                            fontSize: apiKey ? 18 : 18,
                            borderBottomWidth: 1, borderBottomColor: 'gray', marginLeft: 13, width: 300,
                            marginVertical: 20,color:'black'
                        }} />
                </View>
                <Pressable onPress={register} style={{ width: 200, backgroundColor: 'blue', padding: 15, borderRadius: 7, marginTop: 50, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>Register</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Login", { apikeyValue: apiKey })} style={{ marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 17, color: 'gray', fontWeight: '500' }}>Already have a account? Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Registration;
