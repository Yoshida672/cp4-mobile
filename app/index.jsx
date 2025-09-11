import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import {auth} from "../src/services/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
export default function Login(){
    const [email,setEmail]= useState("");
    const [senha,setSenha]= useState("");
    const router = useRouter()
    const handleLogin=()=>{
    if(!email || !senha ){
        Alert.alert("Atenção!","Preencha todos os campos!");
    }
    else{
    signInWithEmailAndPassword(auth,email,senha).then(
        async(userCredential)=>{
            const user = userCredential.user
            router.push("/HomeScreen")

        }
    )
   
}
}

    return(
    <View>
     <Text>Login</Text>
     <TextInput
     placeholder="Email"
     value={email}
     onChangeText={setEmail}

     />   
     <TextInput
     placeholder="Senha"
     value={senha}
     onChangeText={setSenha}   
 />
     <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
     </TouchableOpacity>

    </View>
    );
}