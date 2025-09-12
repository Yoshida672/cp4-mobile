import React from "react";
import { View ,Text, FlatList, Image} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "../src/api/marvelApi";

export default function HomeScreen(){

  const { data, isLoading, error } = useQuery({
    queryKey: ["marvel-characters"],
    queryFn: fetchCharacter,
  });

  if (isLoading) {
    return <Text>Carregando...</Text>
  }

  if (error) {
    return <Text>Erro: {error}</Text>
  }

return(
    <View>
        <Text>Personagens</Text>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
        <View>
            <Image
              source={{
                uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              }}
              style={{width:100,height:100}}
            />

            <Text style={{fontSize:20}}>{item.name}</Text>
            
          </View>
        )}
      />
    </View>
);
    
}