import {StatusBar, statusBar} from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import {Button, StyleSheet , Text , View} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera} from 'expo-camera'

import { firebaseConfig } from './config/firebase1';
import { Audio } from 'expo-av';
import firebase from "firebase/app";
import "firebase/firestore";
import { useRoute } from '@react-navigation/native';

export default function audio()
{

const rr =useRoute();
const email = rr.params.email;

  const db = firebase.firestore();

const addData = async (collectionName, data) => {
  try {
    const ref = db.collection(collectionName);
    const docRef = await ref.add(data);
    console.log("Data added to Firestore with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding data to Firestore: ", error);
  }
};

  






    const [recording , setRecording] = useState();
    const[recordings , setRecordings] = useState([]);;
    const [message , setMessage] = useState("");


    const [uploading , setUploading] = useState(false);





async function submit  (recorduri) {
    console.log("aa");
    const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', recorduri, true);
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
        console.log("download url" , url);
        alert("uploaded successfully");         
        addData(email , {uri:url});
        blob.close();
        return ;
  
    })
})
}




    async function stopRecording()
    {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        let updatedRecordings = [...recordings];
        const {sound , status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
            sound: sound,
            duration : status.durationMillis,
            file: recording.getURI()
        });
        setRecordings(updatedRecordings);
       
    }

    async function  startRecording()
    {{
        try{
            console.log("far2ali");
            const permiosssion =  await Camera.requestMicrophonePermissionsAsync();
            
            if(permiosssion.status === "granted"){
                await Audio.setAudioModeAsync(
                    {
                        allowsRecordingIOS:true,
                        playsInSilentModeIOS:true,
                        
                    }
                );
             const recording = new Audio.Recording();
await recording.prepareToRecordAsync({
  isMeteringEnabled: true,
  android: {
    extension: '.m4a',
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEGLAYER3,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
})
    
await recording.startAsync();
               
                setRecording(recording);

            }else{
                setMessage("please grant permission to app to acess the microphone ")
            }

        }
        catch(err)
        {
            console.log('failed to start recoeridng ' , err);

        }
    }}
function getRecordingLines()
{
   return  recordings.map((recordingLine , index ) => {
        return (
            <View key = {index} style = {styles.row}>
<Text style = {styles.fill}>Recording  { index +1} -  {recordingLine.duration} </Text>
<Button style = {styles.button} onPress={() => recordingLine.sound.replayAsync() } title = "play"></Button>

<Button style = {styles.button} onPress={() => {submit(recordingLine.file) ; console.log(recordingLine.file); }} title = "save online"></Button>
            </View>
        )
    })
}



const soundObject = new Audio.Sound();

    return(
        <View style={styles.container}>
            <Text>{message}</Text>
            <Button 
            title = {recording ? 'stop recording' : 'start recording'}
            onPress = {recording ? stopRecording : startRecording}/>
          
 
            <StatusBar style="auto"/>
            {getRecordingLines()}
        </View>
    )
}



const styles = StyleSheet.create ({
    container : {
        flex: 1 ,
        backgroundColor : '#fff',
        alignItems : 'center',
        justifyContent: 'center',

    },
    row:
    {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',

    },
    fill:{
        flex :1 ,
        margin :16
        
    },
    button:{
        margin:16,

    }
});