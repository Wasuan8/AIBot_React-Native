import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
const Profile = () => {
  const [name, setName] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const Api_Key = apiKey;
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
        setApiKey(docSnap.data().apiKey);
      }
    };
    fetchUserdata();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor:'white', alignItems: 'center' }}>
      <Pressable style={{ marginVertical: 10 }}>
        <Text style={styles.text}>welcome: {user.email}</Text>
        <Text style={styles.text}>User Name: {name}</Text>
        <Text style={styles.text}>{Api_Key}</Text>
      </Pressable>
      <Pressable onPress={signOutUser}>
        <Text style={styles.signOut}>sign Out</Text>

      </Pressable>
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


  }
});