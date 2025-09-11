import { useState } from "react";
import { auth } from "../src/services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = () => {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }
    createUserWithEmailAndPassword(auth, email, senha).then(router.back());
  };
  return (
    <View>
      <Text>Cadastre-se</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} />
      <TouchableOpacity onPress={handleRegister}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
