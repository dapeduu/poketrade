import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Center,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { usePokemons } from "./hooks/usePokemons";
import { ArrowLeft, ArrowRight } from "react-feather";
import { PokemonCard } from "./components/PokemonCard";

function App() {
  const { pokemons, amountOfPages, changePage, Pagination } = usePokemons();

  return (
    <div className="App">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {pokemons?.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
        </SimpleGrid>

        <Center my={20}>
          <Pagination total={amountOfPages} onChange={changePage} />
        </Center>
      </Container>
    </div>
  );
}

export default App;
