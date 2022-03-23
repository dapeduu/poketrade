import { usePokemons } from "./hooks/usePokemons";

function App() {
  const { pokemons, amountOfPages, changePage, Pagination } = usePokemons();

  return (
    <div className="App">
      {pokemons?.map((pokemon) => (
        <p key={pokemon.id}>{pokemon.name}</p>
      ))}

      <Pagination total={amountOfPages} onChange={changePage} />
    </div>
  );
}

export default App;
