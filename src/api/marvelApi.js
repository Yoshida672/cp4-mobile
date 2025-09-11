import md5 from "crypto-js/md5";
import axios from "axios";

const publicKey = "cdc91370fcda351c0e25726829af31a2";
const privateKey = "3c01f0a60fdb12887d7d1adf4f5fb6c74d3d3c5f";

export async function fetchCharacter() {
  const ts = Date.now().toString();
  const hash = md5(ts + privateKey + publicKey).toString();

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  const res = await axios.get(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar personagens da Marvel");
  }

  return res.data.json();
}
