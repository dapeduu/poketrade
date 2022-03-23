import {
  Paper,
  Center,
  Group,
  Avatar,
  Title,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { Pokemon } from "pokenode-ts";
import { ArrowLeft, ArrowRight } from "react-feather";

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const { id, name, sprites, types } = pokemon;

  return (
    <Paper shadow="xl" p="md" key={id}>
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
  );
}
