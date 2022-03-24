import { Pokemon } from "pokenode-ts";

export const getTotalXpReducer = (total: number, current: Pokemon) =>
  (total += current.base_experience);

export function getTotalXp(pokemonList: Pokemon[]) {
  return pokemonList.reduce(getTotalXpReducer, 0);
}

export function canTrade(
  pokemonList1: Pokemon[],
  pokemonList2: Pokemon[]
): boolean {
  const pokemonList1Xp = getTotalXp(pokemonList1);
  const pokemonList2Xp = getTotalXp(pokemonList2);

  const result = Math.abs(pokemonList1Xp - pokemonList2Xp) <= 1000;

  return result;
}

export type HistoryTradeDataType = {
  tradeDate: string;
  redPokemons: string[];
  bluePokemons: string[];
  redPokemonsXp: number;
  bluePokemonsXp: number;
};

export function getTradeHistory(): HistoryTradeDataType[] {
  const history = JSON.parse(localStorage.getItem("tradeHistory") ?? "[]");

  return history;
}

function formatHistoryTradeData(
  redPokemonsList: Pokemon[],
  bluePokemonsList: Pokemon[]
) {
  const tradeDate = new Date().toLocaleDateString("pt-br");

  const redPokemons = redPokemonsList.map((pokemon) => pokemon.name);
  const bluePokemons = redPokemonsList.map((pokemon) => pokemon.name);

  const redPokemonsXp = getTotalXp(redPokemonsList);
  const bluePokemonsXp = getTotalXp(bluePokemonsList);

  return {
    tradeDate,
    redPokemons,
    bluePokemons,
    redPokemonsXp,
    bluePokemonsXp,
  };
}

export function storeToTradeHistory(
  redPokemonsList: Pokemon[],
  bluePokemonsList: Pokemon[]
) {
  const historyDataToAdd = formatHistoryTradeData(
    redPokemonsList,
    bluePokemonsList
  );

  const history: HistoryTradeDataType[] = getTradeHistory();

  history.push(historyDataToAdd);

  localStorage.setItem("tradeHistory", JSON.stringify(history));
}

export function clearTradeHistory() {
  localStorage.setItem("tradeHistory", "[]");
}
