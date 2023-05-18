import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image,SafeAreaView,KeyboardAvoidingView } from 'react-native';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const ImageSc = () => {
  const [prompt, setprompt] = useState([]);
  const [apiKey,setApiKey] = useState(null);
  const Ai_Key = apiKey;
  const apiURl = 'https://api.openai.com/v1/images/generations';
  const [imageUrl, setImageUrl] = useState('');
  const [text,setText]=useState('');
  const handleSend = async () => {
    try {
      const response = await axios.post(apiURl, {
        "model": "image-alpha-001",
        "prompt": prompt,
        "num_images": 1,
        "size": "512x512",
        "response_format": "url"
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Ai_Key}`,
        }
      });
      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.log(error);
    }
  }
  //for apikey fetch
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
        <Text style={styles.title}>AI ImageGenerator</Text>
        <Image style={{ width: 50, height: 50 }} source={require('../assets/Images/Imagebot.png')} />

      </View>
      {imageUrl && (
        <View style={{ flexDirection: 'column',alignItems:'center',justifyContent:'center', padding: 10,margin: 10  }}>
          <Text style={styles.bot}>User: {prompt} </Text>
          <Image 
            source={{ uri: imageUrl }}
            style={{ alignItems: 'center',width: 300, height: 300,borderWidth: 1,
              borderColor: '#0a365e',
              borderRadius: 15,
              
            
            }}
          />
        </View>
      )}

      <View style={styles.textinput}>
        <TextInput
          style={styles.input}
          value={prompt}
          onChangeText={text => setprompt(text)}
          placeholder='Enter a prompt for generating an image'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSend}
        >
          <Image style={styles.imagetxt} source={require('../assets/Images/send.png')} />
        </TouchableOpacity>
      </View>

      </KeyboardAvoidingView>
    </SafeAreaView>  )
}

export default ImageSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',

  },
  bottext: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  title: {
    color: '#0a365e',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50
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
    alignItems: 'center',
    borderWidth: 1,
    width: '95%',
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