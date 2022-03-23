import { Pagination } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useState } from "react";
import { useQuery } from "react-query";
import { getPokemons } from "./config/pokenode";

function App() {
  const limit = 6;
  const [page, setPageState] = useState(1);

  const { data } = useQuery(
    ["pokemons", page],
    () => getPokemons(limit, page),
    { keepPreviousData: true }
  );
  const { amountOfPages, pokemons } = data ?? {};

  const { setPage } = usePagination({ total: amountOfPages ?? 0 });

  function changePage(page: number) {
    setPage(page);
    setPageState(page);
  }

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
