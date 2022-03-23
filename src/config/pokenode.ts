import { NamedAPIResourceList, Pokemon, PokemonClient } from "pokenode-ts";

export const api = new PokemonClient();

async function fetchResources(resources: NamedAPIResourceList) {
  const resourcesLinks = resources.results.map((item) => item.url);
  const promises = resourcesLinks.map(
    async (url) => await (await fetch(url)).json()
  );

  const result = Promise.all(promises);

  return result;
}

export async function getPokemons(offset?: number, limit?: number) {
  const resources = await api.listPokemons(offset, limit);
  const pokemons: Pokemon[] = await fetchResources(resources);

  return pokemons;
}
