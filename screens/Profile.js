import { StyleSheet, Text, View, SafeAreaView, Pressable,Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
const Profile = () => {
  const [name, setName] = useState(null);
  const [email, SetEmail] = useState(null);
  const user = auth.currentUser;
  const naviagtion = useNavigation();
  const signOutUser = () => {
    signOut(auth).then(() => {
      naviagtion.replace("Login")

    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    const fetchUserdata = async () => {
      const colRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(colRef);
      if (docSnap.exists()) {
        setName(docSnap.data().userName);
        SetEmail(docSnap.data().email);
      }
    };
    fetchUserdata();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 10 }}>
       <View style={styles.bottext}>
        <Text style={styles.title}>Profile</Text>
        <Image style={{ width: 50, height: 30 }} source={require('../assets/Images/Image5.jpg')} />

      </View>
      <Pressable style={{ marginVertical: 10 }}>
        <Text style={styles.text}>Welcome: {email}</Text>
        <Text style={styles.text}>User Name: {name}</Text>
      </Pressable>
      <Pressable onPress={signOutUser}>
        <Text style={styles.signOut}>sign Out</Text>

      </Pressable>
      <Image style={styles.image} source={require("../assets/Images/Image3.jpg")}/>
      
    </SafeAreaView>

  )
}

export default Profile;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'white',
    margin: 10,
    padding: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0a365e',
    borderColor:'black',
    borderRadius:5,
  },
  signOut:{
    fontSize: 20,
    color:'white',
    margin:8,
    padding: 10,
    backgroundColor:'blue',
    borderColor:'blue',
    borderRadius:10,
  },
  bottext: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#0a365e',
    fontSize: 28,
    fontWeight: 'bold',
  },
  image:{
    width: '100%',
    height: '70%',
    margin: 5,

  }
});