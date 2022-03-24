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

  const result = pokemonList1Xp - pokemonList2Xp <= 1000;

  return result;
}
