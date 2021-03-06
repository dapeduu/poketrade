import {
  Container,
  SimpleGrid,
  Paper,
  Avatar,
  Center,
  Box,
  Text,
  ActionIcon,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { UseListStateHandler } from "@mantine/hooks/lib/use-list-state/use-list-state";
import { useNotifications } from "@mantine/notifications";
import { Pokemon } from "pokenode-ts";
import { Info, ThumbsDown, ThumbsUp, X } from "react-feather";
import { canTrade, getTotalXp, storeToTradeHistory } from "../config/trade";

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
  const maxWidth1000px = useMediaQuery("(max-width: 1000px)");
  const redPokemonsXp = getTotalXp(redPokemonsList);
  const bluePokemonsXp = getTotalXp(bluePokemonsList);
  const notifications = useNotifications();

  const removeFromList = (
    handler: UseListStateHandler<Pokemon>,
    index: number
  ) => {
    handler.remove(index);
  };

  const handleTrade = () => {
    if (redPokemonsList.length <= 0 || bluePokemonsList.length <= 0) {
      notifications.showNotification({
        title: "Erro!",
        message: "As duas listas devem conter ao menos 1 pokémon.",
        icon: <Info />,
      });

      return;
    }

    const tradeResult = canTrade(redPokemonsList, bluePokemonsList);

    if (tradeResult) {
      notifications.showNotification({
        title: "Sucesso!",
        message: "Troca justa.",
        color: "green",
        icon: <ThumbsUp size="1rem" />,
      });

      storeToTradeHistory(redPokemonsList, bluePokemonsList);

      redHandlers.setState([]);
      blueHandlers.setState([]);
    } else {
      notifications.showNotification({
        title: "Erro!",
        message: "Essa troca não é justa.",
        color: "red",
        icon: <ThumbsDown size="1rem" />,
      });
    }
  };

  return (
    <>
      <Container
        size="lg"
        sx={{
          position: "relative",
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

        {!maxWidth1000px && (
          <Button
            sx={{
              position: "absolute",
              width: "100px",
              height: "44px",
              left: "50%",
              marginLeft: "-50px",
              top: "50%",
              marginTop: "-22px",
            }}
            color="red"
            onClick={handleTrade}
          >
            Trocar!
          </Button>
        )}

        <PokemonsArea
          pokemons={bluePokemonsList}
          xp={bluePokemonsXp}
          color="blue"
          removeFromList={removeFromList}
          redHandlers={redHandlers}
          blueHandlers={blueHandlers}
        />
      </Container>

      {maxWidth1000px && (
        <Button
          sx={{
            width: "100px",
            height: "44px",
            alignSelf: "center",
          }}
          mb="xs"
          color="red"
          onClick={handleTrade}
        >
          Trocar!
        </Button>
      )}
    </>
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
  const maxWidth1000px = useMediaQuery("(max-width: 1000px)");

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
      pl={color === "blue" && !maxWidth1000px ? "4rem" : undefined}
      pr={color === "red" && !maxWidth1000px ? "4rem" : undefined}
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
            <Center>
              <Text
                style={{
                  textAlign: "center",
                  width: "15ch",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {pokemon.name}
              </Text>
            </Center>

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
