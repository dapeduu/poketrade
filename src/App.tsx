import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api, getPokemons } from "./config/pokenode";

function App() {
  const { data } = useQuery("pokemons", () => getPokemons());

  return (
    <div className="App">
      {data?.map((pokemon) => (
        <p key={pokemon.id}>{pokemon.name}</p>
      ))}
    </div>
  );
}

export default App;
