import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login(){
    const [email,setEmail]= useState("");
    const [senha,setSenha]= useState("");
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
     <TouchableOpacity>
        <Text>Login</Text>
     </TouchableOpacity>
    </View>
    );
}