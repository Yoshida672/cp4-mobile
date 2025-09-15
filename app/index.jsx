import { useEffect, useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { auth } from "../src/services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import ThemeToggleButton from "../src/components/ThemeToggleButton";
import { useTheme } from "../src/context/ThemeContext";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const mudarIdioma = (lang) => {
    i18n.changeLanguage(lang);
  };
  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert(t("login.alerts.title"), t("login.alerts.message"));
      return;
    }
    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        router.push("/HomeScreen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (error.code === "auth/network-request-failed") {
          Alert.alert("Error", "Verifique sua conexão");
        }
        if (error.code === "auth/invalid-credential") {
          Alert.alert("Atenção", "Verifique as credenciais");
        }
      });
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        router.push("/HomeScreen");
      } else {
        console.log("Error ao verificar login", error);
      }
    };
    checkUser();
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <ThemeToggleButton />

      <Text style={{ ...styles.title, color: colors.text }}>
        {t("login.title")}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={t("login.email")}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder={t("login.password")}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={[styles.languageButton, { backgroundColor: "#007bff" }]}
          onPress={() => mudarIdioma("pt")}
        >
          <Text style={styles.buttonText}>PT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.languageButton, { backgroundColor: "#328132" }]}
          onPress={() => mudarIdioma("en")}
        >
          <Text style={styles.buttonText}>EN</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t("login.buttonLogin")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => router.push("/Register")}
      >
        <Text style={styles.linkText}>{t("login.register")}</Text>
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
  languageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 12,
  },
  languageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
