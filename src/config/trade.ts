import { Pokemon } from "pokenode-ts";

export const getTotalXpReducer = (total: number, current: Pokemon) =>
  (total += current.base_experience);

export function canTrade(
  pokemonList1: Pokemon[],
  pokemonList2: Pokemon[]
): boolean {
  const pokemonList1Xp = pokemonList1.reduce(getTotalXpReducer, 0);
  const pokemonList2Xp = pokemonList2.reduce(getTotalXpReducer, 0);

  const result = pokemonList1Xp - pokemonList2Xp <= 1000;

  return result;
}
