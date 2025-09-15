import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
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

  const [team, setTeam] = useState([]);

  useEffect(() => {
    const loadTeam = async () => {
      const storedTeam = await AsyncStorage.getItem("@team");
      if (storedTeam) {
        setTeam(JSON.parse(storedTeam));
      }
    };
    loadTeam();
  }, []);

  const saveTeam = async (newTeam) => {
    setTeam(newTeam);
    await AsyncStorage.setItem("@team", JSON.stringify(newTeam));
  };

  const addToTeam = (character) => {
    if (team.find((c) => c.id === character.id)) {
      Alert.alert("Ops!", "Esse personagem já está no seu time!");
      return;
    }
    if (team.length >= 6) {
      Alert.alert("Limite atingido!", "Seu time só pode ter até 6 heróis.");
      return;
    }
    const newTeam = [...team, character];
    saveTeam(newTeam);
  };

  // Remove personagem do time
  const removeFromTeam = (id) => {
    const newTeam = team.filter((c) => c.id !== id);
    saveTeam(newTeam);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
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
    <ScrollView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <ThemeToggleButton />

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>{t("home.logout")}</Text>
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
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToTeam(item)}
            >
              <Text style={styles.addButtonText}>+ Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={{ ...styles.title, color: colors.text }}>
        Meu Time ({team.length}/6)
      </Text>
      <FlatList
        data={team}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View style={styles.teamCard}>
            <Image
              source={{
                uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              }}
              style={styles.teamImage}
            />
            <Text style={styles.teamName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromTeam(item.id)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loading: { fontSize: 18 },
  error: { fontSize: 16, color: "red" },

  title: { fontSize: 24, fontWeight: "bold", marginVertical: 14 },

  list: { paddingBottom: 20 },

  card: {
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  image: { width: 140, height: 140, borderRadius: 12, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  addButton: {
    backgroundColor: "#e62429",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },

  logoutButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#555",
    borderRadius: 8,
  },
  logoutText: { color: "#fff", fontWeight: "600" },

  teamCard: {
    backgroundColor: "#202020",
    marginRight: 14,
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    width: 120,
  },
  teamImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 8 },
  teamName: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#e62429",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  removeButtonText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
