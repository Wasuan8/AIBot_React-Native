import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView,SafeAreaView } from 'react-native';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const Home = () => {
  const [data, setData] = useState([]);
  const[apiKey, setApiKey] = useState(null);
  const Ai_Key = apiKey;
  const apiURl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const [textInput, setTextInput] = useState('');
  const handleSend = async () => {
    const prompt = textInput
    const response = await axios.post(apiURl, {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.5,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Ai_Key}`,
      }
    });
    const text = response.data.choices[0].text;
    setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }]);
    setTextInput('');
  }
  //for api key fetch 
  useEffect(() => {
    const fetchUserdata = async () => {
      const colRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(colRef);
      if (docSnap.exists()) {
        setApiKey(docSnap.data().apiKey);
      }
    };
    fetchUserdata();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView>


      <View style={styles.bottext}>
        <Text style={styles.title}>AI ChatBot</Text>
        <Image style={{ width: 50, height: 30 }} source={require('../assets/Images/bot.png')} />

      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 10, marginRight: 30 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: item.type === 'user' ? '#0a365e' : '#2473fe' }}>{item.type === 'user' ? 'Wasu:  ' : 'Bot: '}</Text>

            <Text style={styles.bot}>{item.text} </Text>


          </View>
        )}
      />
      <View style={styles.textinput}>
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={text => setTextInput(text)}
          placeholder='Ask me anything'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSend}
        >
          <Image style={styles.imagetxt} source={require('../assets/Images/send.png')} />
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10

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
  body: {
    backgroundColor: '$fffcc9',
    width: '102%',
    margin: 10

  },

  bot: {
    fontSize: 18,
    textAlign:'justify',
    margin: 10,
    color: 'black',
    borderWidth: 1,
    borderColor: '#0a365e',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#0a365e',
    
  },
  input: {
    flex: 1,
    color: '#0a365e',
  },
  button: {
    backgroundColor: 'white',
    width: 42,
    height: 42,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'

  },
  textinput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    borderWidth: 1,
    width: '100%',
    height: 60,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  imagetxt: {
    padding: 8,
    margin: 5,
    height: 30,
    width: 30,
    resizeMode: 'stretch',
    alignItems: 'center',
  }
})