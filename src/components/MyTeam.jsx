import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTeam, removeHero } from "../services/teamService";

export default function MyTeam() {
  const [team, setTeam] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        const parsed = JSON.parse(user);
        setUserId(parsed.uid);
        loadTeam(parsed.uid);
      }
    };
    loadUser();
  }, []);

  const loadTeam = async (uid) => {
    const data = await getTeam(uid);
    setTeam(data);
  };

  const handleRemove = async (heroId) => {
    if (!userId) return;
    await removeHero(userId, heroId);
    loadTeam(userId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Time</Text>
      {team.length === 0 ? (
        <Text>Nenhum herói adicionado ainda.</Text>
      ) : (
        <FlatList
          data={team}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imagem }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.nome}</Text>
                {item.comentario && <Text>{item.comentario}</Text>}
                <Button title="Remover" onPress={() => handleRemove(item.id)} />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
});
