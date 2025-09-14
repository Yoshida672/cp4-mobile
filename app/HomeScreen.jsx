import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "../src/api/marvelApi";
import { useTheme } from "../src/context/ThemeContext";
import ThemeToggleButton from "../src/components/ThemeToggleButton";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["marvel-characters"],
    queryFn: fetchCharacter,
  });
  const { colors } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const logout = async () => {
    console.log("Logout");
    console.log(await AsyncStorage.getItem("@user"));
    await AsyncStorage.removeItem("@user").then(() =>
      console.log("User removed")
    );
    console.log(await AsyncStorage.getItem("@user"));
    router.replace("/");
  };

  if (isLoading) {
    return (
      <View style={{ ...styles.center, backgroundColor: colors.background }}>
        <Text style={{ ...styles.loading, color: colors.text }}>
          {t("home.loading")}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ ...styles.center, backgroundColor: colors.background }}>
        <Text style={{ ...styles.error, color: colors.text }}>
          {t("home.error")}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <ThemeToggleButton />
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>{t("home.logout")}</Text>
      </TouchableOpacity>
      <Text style={{ ...styles.title, color: colors.text }}>
        {t("home.characters")}
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              }}
              style={styles.image}
            />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    fontSize: 18,
    color: "#555",
  },
  error: {
    fontSize: 16,
    color: "red",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#202020",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
