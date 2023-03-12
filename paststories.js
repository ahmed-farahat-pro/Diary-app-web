import * as React from "react";
import { Image, StyleSheet, View ,Text ,FlatList, TouchableOpacity , ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "./GlobalStyles";
import { Audio , Sound} from 'expo-av';
import { useState , useEffect } from 'react';
import { useRoute } from "@react-navigation/native";
import firebase from "firebase/app";
import "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
export default function paststories({navigation})
{


     const route = useRoute()
 const email = route.params.email;
 const db = firebase.firestore()
 const [loading , setLoading] = useState(true);
 let docIds = [];
   let uril = [];
   const [uri , setUri] = useState();
useEffect(() => {
db.collection(email)
  .get()
  .then(querySnapshot => {
  
    
    querySnapshot.forEach(doc => {
      docIds.push(doc.id);
    });
   
     for(let i=0;i<docIds.length;i++)
  {
     console.log(docIds[i])
     db.collection(email)
  .doc(docIds[i])
  .get()
  .then(doc => {
    console.log(doc.data()["uri"]);
    uril.push(doc.data());
    
     setLoading(false);
       setUri(uril);

  });
   

  }
 
 

    
  });
},[])

function navi (item)
{
navigation.navigate("displayit",{uri:item});
}
return (
    <SafeAreaView style={{flex:1}}>
   
    {loading ? <ActivityIndicator/> : <FlatList
        data={uri}
        renderItem = {({item})=>(
           
            <TouchableOpacity onPress={()=>navi(item.uri)} style={{padding:10}}><Text>{item.uri}</Text></TouchableOpacity>
            
        )
    }/>}
  
    </SafeAreaView>
)

}

