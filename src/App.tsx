import { Pagination } from "@mantine/core";
import { usePokemons } from "./hooks/usePokemons";

function App() {
  const { pokemons, amountOfPages, changePage } = usePokemons();

  return (
    <div className="App">
      {pokemons?.map((pokemon) => (
        <p key={pokemon.id}>{pokemon.name}</p>
      ))}

      <Pagination total={amountOfPages ?? 0} onChange={changePage} />
    </div>
  );
}

export default App;
