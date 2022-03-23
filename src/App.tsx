import { Box, Center, Container, SimpleGrid } from "@mantine/core";
import { usePokemons } from "./hooks/usePokemons";
import { PokemonCard } from "./components/PokemonCard";
import { Navbar } from "./components/Navbar";
import { useListState } from "@mantine/hooks";
import { Pokemon } from "pokenode-ts";
import { TradeArea } from "./components/TradeArea";

function App() {
  const { pokemons, amountOfPages, changePage, Pagination } = usePokemons();
  const [redPokemonsList, redHandlers] = useListState<Pokemon>([]);
  const [bluePokemonsList, blueHandlers] = useListState<Pokemon>([]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#F8F9FA",
      }}
    >
      <Navbar />

      <TradeArea
        redPokemonsList={redPokemonsList}
        bluePokemonsList={bluePokemonsList}
        blueHandlers={blueHandlers}
        redHandlers={redHandlers}
      />

      <Container size="lg">
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {pokemons?.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              redHandlers={redHandlers}
              blueHandlers={blueHandlers}
            />
          ))}
        </SimpleGrid>

        <Center my={20}>
          <Pagination total={amountOfPages} onChange={changePage} />
        </Center>
      </Container>
    </Box>
  );
}

export default App;
