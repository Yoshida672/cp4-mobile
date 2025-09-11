import { useState } from "react";

export default function Register(){
const [nome,setNome] = useState("");
const [email,setEmail] = useState("");
const [senha,setSenha] = useState("");
    return(
        <View>
         <Text>Cadastre-se</Text>
         <TextInput
         placeholder="Nome"
         value={nome}
         onChangeText={setNome}
    
         />
         
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
            <Text>Cadastrar</Text>
         </TouchableOpacity>
        </View>
        );
}