import { useState } from "react";
import { auth } from "../src/services/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  validatePassword,
} from "firebase/auth";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import ThemeToggleButton from "../src/components/ThemeToggleButton";
import { useTheme } from "../src/context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { colors } = useTheme();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { t } = useTranslation();

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert(t("login.alerts.title"), t("login.alerts.message"));
      return;
    }
    try {
      const status = await validatePassword(auth, senha);
      if (!status.isValid) {
        let msg = "Senha inválida. Requisitos: \n";
        if (status.containsLowercaseLetter === false)
          msg += "- Pelo menos uma letra minúscula\n";
        if (status.containsUppercaseLetter === false)
          msg += "- Pelo menos uma letra maiúscula\n";
        if (status.containsNumericCharacter === false)
          msg += "- Pelo menos um número\n";
        if (status.containsNonAlphanumericCharacter === false)
          msg += "- Pelo menos um caractere especial\n";
        if (
          status.passwordPolicy.customStrengthOptions.minPasswordLength !==
            undefined &&
          senha.length <
            status.passwordPolicy.customStrengthOptions.minPasswordLength
        )
          msg += `- Mínimo ${status.passwordPolicy.customStrengthOptions.minPasswordLength} caracteres\n`;
        Alert.alert("Senha inválida", msg);
        console.log(status);
        return;
      }
      await createUserWithEmailAndPassword(auth, email, senha);
      router.back();
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          Alert.alert(
            t("register.alerts.error.title"),
            t("register.alerts.error.weakPassword")
          );
          break;
        case "auth/email-already-in-use":
          Alert.alert(
            t("register.alerts.error.title"),
            t("register.alerts.error.emailInUse")
          );
          break;
        case "auth/invalid-email":
          Alert.alert(
            t("register.alerts.error.title"),
            t("register.alerts.error.invalidEmail")
          );
          break;
        case "auth/invalid-password":
          Alert.alert(
            t("register.alerts.error.title"),
            t("register.alerts.error.invalidPassword")
          );
          break;
        default:
          Alert.alert(
            t("register.alerts.error.title"),
            t("register.alerts.error.generic")
          );
          break;
      }
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <ThemeToggleButton />
      <Text style={{ ...styles.title, color: colors.text }}>
        {t("register.title")}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={t("register.name")}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder={t("register.email")}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder={t("register.password")}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{t("register.buttonRegister")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => router.back()}
      >
        <Text style={styles.linkText}>{t("register.backToLogin")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#202020",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    alignItems: "center",
  },
  linkText: {
    color: "#007BFF",
    fontSize: 16,
  },
});
