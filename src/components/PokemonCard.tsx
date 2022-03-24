import {
  Paper,
  Center,
  Group,
  Avatar,
  Title,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { UseListStateHandler } from "@mantine/hooks/lib/use-list-state/use-list-state";
import { Pokemon } from "pokenode-ts";
import { ArrowLeft, ArrowRight } from "react-feather";

export function PokemonCard({
  pokemon,
  addToList,
}: {
  pokemon: Pokemon;
  addToList: (pokemon: Pokemon, listColor: "red" | "blue") => void;
}) {
  const { id, name, sprites, types } = pokemon;

  const addToRedList = () => addToList(pokemon, "red");
  const addToBlueList = () => addToList(pokemon, "blue");

  return (
    <Paper
      withBorder
      p="md"
      key={id}
      sx={{
        minWidth: "15rem",
      }}
    >
      <Center>
        <Group direction="column" grow>
          <Avatar
            src={sprites.front_default ?? undefined}
            alt={`Imagem do pokemon ${name}`}
            mx="auto"
            radius="xl"
            size="xl"
            sx={{
              background: "#F1F3F5",
            }}
          />
          <Title order={3} sx={{ textAlign: "center" }}>
            {name}
          </Title>
          <Group mx="auto">
            {types.map((type) => (
              <Badge key={type.slot}>{type.type.name}</Badge>
            ))}
          </Group>

          <Group mx="auto" spacing={40}>
            <ActionIcon
              variant="filled"
              color="red"
              size="lg"
              aria-label="Adicionar pokemon ao vermelho"
              onClick={addToRedList}
            >
              <ArrowLeft />
            </ActionIcon>

            <ActionIcon
              variant="filled"
              color="blue"
              size="lg"
              aria-label="Adicionar pokemon ao azul"
              onClick={addToBlueList}
            >
              <ArrowRight />
            </ActionIcon>
          </Group>
        </Group>
      </Center>
    </Paper>
  );
}
