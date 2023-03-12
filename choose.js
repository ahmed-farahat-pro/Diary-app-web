import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { Image, StyleSheet, View ,Text, TouchableOpacity} from "react-native";
import { FontFamily, Color } from "./GlobalStyles";

const choose = ({navigation}) => {
 const route = useRoute()
 const email = route.params.email;


  return (
    <View style={styles.iphone14Pro2}>
        
        <TouchableOpacity  onPress={()=> navigation.navigate("CAMERA" , {email:email})}  style={styles.videoCameraIcon}>
     <Text style={{alignSelf:'center'}}>camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate("RECORD" , {email : email})}  style={styles.microphone1Icon}>
        <Text style={{alignSelf:'center'}}>micerophone</Text>
      </TouchableOpacity>
    
        <View style={styles.ss}>
                <TouchableOpacity  onPress= {()=>navigation.navigate("PAST" , {email : email})}style={styles.button}>
                    <Text >past</Text>
                </TouchableOpacity>
        </View>
  
    </View>
  );
};

const styles = StyleSheet.create({
  videoCameraIcon: {
    top: "80%",
    left: "5%",
    width: 50,
    height: 50,
    position: "absolute",
    overflow: "hidden",
    backgroundColor:'#7EC8E3',
    justifyContent:'center',
    alignItems:'center'
  },
  microphone1Icon: {
    top: "80%",
    right: "5%",
    width:  100,
    height: 50,
    position: "absolute",
     backgroundColor:'#7EC8E3',
       justifyContent:'center',
    alignItems:'center'
  
  },
  
  screenshot20230201At734: {
    top: "5%",
    left: "13%",
    width: "75%",
    height: "27%",
    position: "absolute",
  },
  iphone14Pro2: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
    button: {
    backgroundColor: '#7EC8E3',
    borderRadius: 10,
    justifyContent: 'center',
   height:"100%",
   width:"100%",
    alignItems: 'center',
    marginTop: 40,
      left:"50%"
 
  },
  ss:{
      height: "10%",
    width:"50%",
    zIndex:2,
    top:"40%",
    justifyContent: 'center',
    alignItems:'center',
    alignself:'center'

  }
});

export default choose;
