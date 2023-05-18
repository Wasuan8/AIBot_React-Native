import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const navigation = useNavigation();
    useEffect(() => {
        try {
            setLoading(true);
            const UnSubscribe = auth.onAuthStateChanged((authUser) => {
                if (!authUser) {
                    setLoading(false);
                }
                if (authUser) {
                    navigation.replace("Home");
                }
            });
            return UnSubscribe;
        } catch (e) {
            console.log(e);

        }
    }, []);
    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("user credential", userCredential);
            const user = userCredential.user;
            console.log("user details", user)
        })
    }
    return (
        <SafeAreaView style={{ felx: 1, backgroundColor: 'white', alignItems: 'center', padding: 10 }}>
            {loading ? (
                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", flex: 1 }}>
                    <Text style={{ marginRight: 10 }}>Loading</Text>
                    <ActivityIndicator size="large" color={"red"} />
                </View>

            ) : (
                <KeyboardAvoidingView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                        <Text style={{ fontSize: 20, color: '#662d91', fontWeight: 'bold' }}>Sign In</Text>
                        <Text style={{ fontSize: 18, marginTop: 8, fontWeight: '600' }}>Sign In to your account</Text>
                    </View>
                    <View style={{ marginTop: 50 }}>
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
                        <Pressable onPress={login} style={{ width: 200, backgroundColor: 'blue', padding: 15, borderRadius: 7, marginTop: 50, marginLeft: 'auto', marginRight: 'auto' }}>
                            <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>Login</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("Registration")} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign: 'center', fontSize: 17, color: 'gray', fontWeight: '500' }}>Dont't have a account? Sign Up</Text>
                        </Pressable>

                    </View>
                </KeyboardAvoidingView>
            )}

        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({})