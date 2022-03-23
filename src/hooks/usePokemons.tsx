import { Pagination } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useState } from "react";
import { useQuery } from "react-query";
import { getPokemons } from "../config/pokenode";

export function usePokemons() {
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

  return {
    changePage,
    pokemons,
    amountOfPages: amountOfPages ?? 0,
    Pagination,
  };
}
