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
import "firebase/firestore";
import { useRoute } from '@react-navigation/native';

export default function displayit()
{
    const rrr  = useRoute();
    const uri = rrr.params.uri;
    return(


        <View style={{flex:1}}>
            <Video style={{     flex :1 ,
        alignSelf :'stretch'}} source ={{uri: uri}} useNativeControls resizeMode='contain'  />
        </View>
    )
}