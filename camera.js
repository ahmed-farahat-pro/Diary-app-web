import {StatusBar, statusBar} from 'expo-status-bar';
import React from 'react';
import { useState , useEffect , useRef } from 'react';
import {Button, StyleSheet , Text , View} from 'react-native';
import {Audio} from 'expo-av'
import { Camera} from 'expo-camera'
import { Video} from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from  'expo-media-library'
import { firebaseConfig } from './config/firebase1';
import firebase from "firebase/app";
import {Platform} from 'react-native'
import "firebase/firestore";
import { useRoute } from '@react-navigation/native';
       


export default function App()
{const rr =useRoute();
     const db = firebase.firestore();
    const [uploading , setUploading] = useState(false);
    async function submit (abc) {
  
    const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
       
    };
    xhr.onerror = function() {
       
      reject(new TypeError('Network request failed'));
       
    };
    xhr.responseType = 'blob';
    xhr.open('GET', abc, true);
    xhr.send(null);
     
  });

const ref = firebase.storage().ref().child(new Date().toISOString());
const snapshot = ref.put(blob)

snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED , ()=>{
    setUploading(true)
 
    
},
(error) => {

    setUploading(false);
    console.log(error);
          blob.close();
        return ;
},
()=> {
    snapshot.snapshot.ref.getDownloadURL().then((url)=> {
        setUploading(false);
            alert("abcd")
        addData(email , {uri:url})
        blob.close();
        return ;
  
    })
})
    }
const email = rr.params.email;

    const addData = async (collectionName, data) => {
  try {
    alert("aa");
    const ref = db.collection(collectionName);
    const docRef = await ref.add(data);
    console.log("Data added to Firestore with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding data to Firestore: ", error);
    alert("error");
  }
};
   
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          chunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const blo = new Blob(chunks, { type: mediaRecorder.mimeType });
         
          submit(URL.createObjectURL(blo));
          


        });

                  
          // do something with the recorded data, such as saving it to a file or sending it to a server

        




        mediaRecorder.start();
        setIsRecording(true);

        // stop recording after a specified time interval
        setTimeout(() => { 
          mediaRecorder.stop();
          setIsRecording(false);
        }, 1000);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
 

<Video
  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/firstapp-ad6a4.appspot.com/o/2023-02-07T03%3A50%3A37.049Z?alt=media&token=ebf4104b-c3cc-4d07-a835-c947c7071c87', type: 'video/x-matroska' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
   useNativeControls
  resizeMode="contain"
  shouldPlay

 
  style={{ width: 300, height: 300 }}
/>
<View>
      <video ref={videoRef} style={{ width: 300, height: 300 }} />
      <Text>{isRecording ? 'Recording...' : 'Not Recording'}</Text>
      {Platform.OS === 'web' && (
        <button onClick={startRecording}>Start Recording</button>
      )}
    </View>

    </View>
  );




    }






const styles = StyleSheet.create ({
    container : {
        flex: 1 ,
        backgroundColor : '#fff',
        alignItems : 'center',
        justifyContent: 'center',

    },
    buttonContainer:
    {
        backgroundColor: '#fff',
        alignSelf:'flex-end',
        

    },
    video:{
        flex :1 ,
        alignSelf :'stretch'
        
    },
    button:{
        margin:16,

    }
});