import { Box, Center, Container, SimpleGrid } from "@mantine/core";
import { usePokemons } from "./hooks/usePokemons";
import { PokemonCard } from "./components/PokemonCard";
import { Navbar } from "./components/Navbar";
import { useListState, useMediaQuery } from "@mantine/hooks";
import { Pokemon } from "pokenode-ts";
import { TradeArea } from "./components/TradeArea";
import { useNotifications } from "@mantine/notifications";
import { XCircle } from "react-feather";

function App() {
  const { pokemons, amountOfPages, changePage, Pagination } = usePokemons();
  const [redPokemonsList, redHandlers] = useListState<Pokemon>([]);
  const [bluePokemonsList, blueHandlers] = useListState<Pokemon>([]);
  const maxWidth420px = useMediaQuery("(max-width: 420px)");
  const notifications = useNotifications();

  const addToList = (pokemon: Pokemon, listColor: "red" | "blue") => {
    const list = {
      red: redPokemonsList,
      blue: bluePokemonsList,
    };
    const handler = {
      red: redHandlers,
      blue: blueHandlers,
    };

    if (list[listColor].length >= 6) {
      notifications.showNotification({
        title: "Erro!",
        message: "Só é possível adicionar no máximo 6 pokémons.",
        color: "red",
        icon: <XCircle />,
      });
      return;
    }

    handler[listColor].append(pokemon);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#DEE2E6",
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
              addToList={addToList}
            />
          ))}
        </SimpleGrid>

        <Center my={20}>
          <Pagination
            total={amountOfPages}
            onChange={changePage}
            withControls={!maxWidth420px}
            size={maxWidth420px ? "sm" : "md"}
          />
        </Center>
      </Container>
    </Box>
  );
}

export default App;
