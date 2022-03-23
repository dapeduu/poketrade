import {
  Container,
  SimpleGrid,
  Paper,
  Avatar,
  Center,
  Box,
  Text,
  ActionIcon,
} from "@mantine/core";
import { UseListStateHandler } from "@mantine/hooks/lib/use-list-state/use-list-state";
import { Pokemon } from "pokenode-ts";
import { X } from "react-feather";
import { getTotalXpReducer } from "../config/trade";

type TradeAreaProps = {
  redPokemonsList: Pokemon[];
  bluePokemonsList: Pokemon[];
  redHandlers: UseListStateHandler<Pokemon>;
  blueHandlers: UseListStateHandler<Pokemon>;
};

export function TradeArea({
  redPokemonsList,
  bluePokemonsList,
  redHandlers,
  blueHandlers,
}: TradeAreaProps) {
  const redPokemonsXp = redPokemonsList.reduce(getTotalXpReducer, 0);
  const bluePokemonsXp = bluePokemonsList.reduce(getTotalXpReducer, 0);

  const removeFromList = (
    handler: UseListStateHandler<Pokemon>,
    index: number
  ) => {
    handler.remove(index);
  };

  return (
    <Container
      size="lg"
      sx={{
        width: "100%",
        flex: "1",
        display: "flex",
        border: "1px solid #CED4DA",
      }}
      my="xs"
      px={0}
    >
      <PokemonsArea
        pokemons={redPokemonsList}
        xp={redPokemonsXp}
        color="red"
        removeFromList={removeFromList}
        redHandlers={redHandlers}
        blueHandlers={blueHandlers}
      />

      <PokemonsArea
        pokemons={bluePokemonsList}
        xp={bluePokemonsXp}
        color="blue"
        removeFromList={removeFromList}
        redHandlers={redHandlers}
        blueHandlers={blueHandlers}
      />
    </Container>
  );
}

type PokemonsAreaProps = {
  pokemons: Pokemon[];
  xp: number;
  color: "red" | "blue";
  removeFromList: (
    handler: UseListStateHandler<Pokemon>,
    index: number
  ) => void;
  redHandlers: UseListStateHandler<Pokemon>;
  blueHandlers: UseListStateHandler<Pokemon>;
};

function PokemonsArea({
  pokemons,
  xp,
  color,
  removeFromList,
  redHandlers,
  blueHandlers,
}: PokemonsAreaProps) {
  const hexColor = {
    red: "#FFA8A8",
    blue: "#74C0FC",
  };
  const handlerColor = {
    red: redHandlers,
    blue: blueHandlers,
  };

  return (
    <Box
      sx={{
        background: hexColor[color],
        width: "50%",
        minHeight: "300px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      p="xs"
    >
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 3, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
        sx={{
          flex: "1",
        }}
      >
        {pokemons.map((pokemon, index) => (
          <Paper
            sx={{
              height: "fit-content",
              position: "relative",
            }}
            key={String(pokemon.id) + String(index)}
          >
            <Avatar
              src={pokemon.sprites.front_default ?? undefined}
              alt={`Imagem do pokemon ${pokemon.name}`}
              mx="auto"
              radius="xl"
              size="xl"
            />
            <Text>
              <Center>{pokemon.name}</Center>
            </Text>

            <ActionIcon
              color="red"
              sx={{
                position: "absolute",
                right: "0",
                top: "0",
              }}
              onClick={() => removeFromList(handlerColor[color], index)}
            >
              <X />
            </ActionIcon>
          </Paper>
        ))}
      </SimpleGrid>
      <Text>
        <Center my="xs">XP Total: {xp}</Center>
      </Text>
    </Box>
  );
}
