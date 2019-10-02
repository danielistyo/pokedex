import React, { useState, useEffect, useRef, useCallback } from "react";
import { isEqual } from "lodash";
import Header from "../components/Header";
import api from "../api";
import List from "../components/List/List";
import getIdFromUrl from "../helpers/string/getIdFromUrl";
import "./Home.scss";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(true);
  const prevPokemon = useRef(); // for comparing newOption

  const setResponse = useCallback(
    async res => {
      const { results, next } = await res.json();
      setNextPage(next);
      const newPokemons = [
        ...pokemons,
        ...results.map(({ name, url }) => ({ name, id: getIdFromUrl(url) }))
      ];
      setPokemons(newPokemons);
      prevPokemon.current = newPokemons;
      setLoading(false);
    },
    [pokemons]
  );

  const getPokemon = useCallback(() => {
    api.getPokemon({ params: "?limit=30" }).then(setResponse);
  }, [setResponse]);

  useEffect(() => {
    // skip effect
    if (isEqual(prevPokemon.current, pokemons)) {
      return;
    }
    getPokemon();
  }, [loading, pokemons, getPokemon]);

  async function handleFilterChange(types) {
    if (!types.length) {
      setLoading(true);
      setPokemons([]); // reset, stimulate effect to be called
      return;
    }
    setLoading(true);
    const mergePokemons = [];
    for (const type of types) {
      const res = await api.getPokemonType(type.value);
      const newPokemons = await res.json();
      await newPokemons.pokemon.forEach(({ pokemon }) => {
        const { name, url } = pokemon;
        const id = getIdFromUrl(url);
        if (!mergePokemons.some(mergePokemon => mergePokemon.name === name)) {
          mergePokemons.push({ name, id });
        }
      });
    }
    setPokemons(mergePokemons);
    prevPokemon.current = mergePokemons;
    setLoading(false);
  }

  function handleLoadMore() {
    fetch(nextPage).then(setResponse);
  }

  return (
    <div className="App">
      <Header onFilterChange={handleFilterChange} />
      {loading ? (
        <div className="c-loader" />
      ) : (
        <List items={pokemons} onLoadMore={handleLoadMore} />
      )}
    </div>
  );
}

export default Home;
