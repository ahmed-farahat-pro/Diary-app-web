import * as React from "react";
import { Image, StyleSheet, View  ,Text, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "./GlobalStyles";
import { Audio , Sound} from 'expo-av';
import { useState , useEffect } from 'react';
import { useRoute } from "@react-navigation/native";

const ringing = ({navigation}) => {
 const route = useRoute()
 const email = route.params.email;
const ss = require("./assets/ringing.wav")
const as1 = require("./assets/pexelskarolinagrabowska4195324-1.png");
const as2 = require("./assets/ico24communicationcall.png");
const as3 = require("./assets/call.png");
const as4 = require("./assets/screenshot-20230201-at-746-1.png");
const as5 = require("./assets/screenshot-20230201-at-748-1.png");
 const playbackObj = new Audio.Sound();
    
  const playSound = async () => {
 await  playbackObj.loadAsync(ss);
  

   playbackObj.playAsync();


  }
const stopAudio = async () => {
     
       
         try { await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
  } catch (error) {
    console.error(error);
  }
       
    
}
       

    // Your sound has stopped playing!
    useEffect(()=>{
    playSound();
    },[])


    
 

  return (
   
    <View style={styles.iphone14Pro1}>
      
       <TouchableOpacity onPress={()=> { stopAudio();}} style={styles.ico24CommunicationCalIcon}>
     <Text style={{alignSelf:'center' , justifyContent:'center' , alignItems:'center'}}>reject</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> { stopAudio(); navigation.navigate("CHOOSE" , {email:email})}} style={styles.callIcon}>
     <Text style={{alignSelf:'center' , justifyContent:'center' , alignItems:'center'}}>answer</Text>
      </TouchableOpacity>
         
      
    </View>
  );
};

const styles = StyleSheet.create({
  pexelsKarolinaGrabowska4195Icon: {
    top: 0,
    left: 0,
    width: "100%",
    position: "absolute",
    height: "100%",
    zIndex:10,
  },
  ico24CommunicationCalIcon: {
    width: 60,
    height: 60,
    top: "85.62%",
    right: "5.73%",
backgroundColor:'#7EC8E3',
  overflow:'hidden',
    position: "absolute",
justifyContent:'center',
   
  },
  callIcon: {
    top: "85.62%",
    left: "5%",
      width: 60,
    height: 60,
      overflow:'hidden',
      backgroundColor:'#7EC8E3',
    position: "absolute",
    justifyContent:'center',
   
 
  },
  screenshot20230201At746: {
    top: "45%",
    left: "15%",
    width: "45%",
    height: "11%",
    position: "absolute",
    zIndex:10,
  },
  screenshot20230201At748: {
    top: "56%",
    left: "20%",
    width: 60,
    height: 60,
    position: "absolute",
    zIndex:10,
  },
  iphone14Pro1: {
  
    flex: 1,
   
 
  },
});

export default ringing;
