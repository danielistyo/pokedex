const BASE_URL = "https://pokeapi.co/api/v2";

export default {
  getPokemonType(id = "") {
    return fetch(`${BASE_URL}/type/${id}`);
  },
  getPokemon({ id = "", params = "" }) {
    return fetch(`${BASE_URL}/pokemon/${id}${params}`);
  }
};
