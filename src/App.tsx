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
            <Paper shadow="xl" p="md" key={pokemon.id}>
              <Center>
                <Group direction="column" grow>
                  <Avatar
                    src={pokemon.sprites.front_default ?? undefined}
                    alt={`Imagem do pokemon ${pokemon.name}`}
                    mx="auto"
                    radius="xl"
                    size="xl"
                    sx={{
                      background: "#F1F3F5",
                    }}
                  />
                  <Title order={3} sx={{ textAlign: "center" }}>
                    {pokemon.name}
                  </Title>
                  <Group mx="auto">
                    {pokemon.types.map((type) => (
                      <Badge>{type.type.name}</Badge>
                    ))}
                  </Group>

                  <Group mx="auto" spacing={40}>
                    <ActionIcon
                      variant="filled"
                      color="red"
                      size="lg"
                      aria-label="Adicionar pokemon ao vermelho"
                    >
                      <ArrowLeft />
                    </ActionIcon>

                    <ActionIcon
                      variant="filled"
                      color="blue"
                      size="lg"
                      aria-label="Adicionar pokemon ao azul"
                    >
                      <ArrowRight />
                    </ActionIcon>
                  </Group>
                </Group>
              </Center>
            </Paper>
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
