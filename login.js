import React, { useState } from "react";
import { StyleSheet , Text , View , Button , TextInput , Image , SafeAreaView , TouchableOpacity , StatusBar , Alert } from "react-native";
const backImage = require("./assets/sea.jpg");
import { firebaseConfig } from "./config/firebase1";
import firebase from "firebase/app";
import "firebase/firestore";


export default function Login ({navigation}) 
{
    
 if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


   


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

//addData("ahmedzxo", { name: "John Doe", email: "johndoe@example.com" });


    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const onHandleLogin = () => {
        if(email !== "" && password !== "")
        {
           firebase.auth().signInWithEmailAndPassword(  email , password)
            .then(() => navigation.navigate("RINGING" , {email: email}))
            .catch((err) => alert("Login error" , err.message));
        }
    };
    return (
        <View style = {styles.container}>
            <Image source={backImage} style = {styles.backImage} />
            <View style={styles.whiteSheet} >
                <SafeAreaView style = {styles.form}>
                    <Text style = {styles.title}> Login </Text>
                      <TextInput
        style={styles.input}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}/>

         <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
      </TouchableOpacity>
       <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SIGNUP")}>
          <Text style={{color: '#7EC8E3', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
        </TouchableOpacity>
        </View>
                </SafeAreaView>
             </View> 
           
            
        </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#7EC8E3",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 500,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '60%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  button: {
    backgroundColor: '#7EC8E3',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});