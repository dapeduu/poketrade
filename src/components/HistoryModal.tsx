import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Paper,
  Title,
  List,
  SimpleGrid,
  Text,
  Center,
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery, useToggle } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Clock } from "react-feather";
import {
  clearTradeHistory,
  getTradeHistory,
  HistoryTradeDataType,
} from "../config/trade";

function HistoryModal() {
  const maxWidth500px = useMediaQuery("(max-width: 500px)");
  const [isOpen, toggle] = useToggle(false, [false, true]);
  const [tradeHistory, setTradeHistory] = useState<HistoryTradeDataType[]>([]);

  useEffect(() => {
    setTradeHistory(getTradeHistory());
  }, [isOpen]);

  return (
    <>
      {maxWidth500px ? (
        <ActionIcon
          variant="outline"
          color="blue"
          size="lg"
          onClick={() => toggle()}
        >
          <Clock />
        </ActionIcon>
      ) : (
        <Button leftIcon={<Clock />} variant="outline" onClick={() => toggle()}>
          Histórico
        </Button>
      )}

      <Modal
        opened={isOpen}
        onClose={() => toggle()}
        title="Histórico de Trocas"
        size="lg"
      >
        <Group position="center" my="lg">
          <Button
            onClick={() => {
              clearTradeHistory();
              setTradeHistory([]);
            }}
          >
            Limpar Histórico
          </Button>
        </Group>

        <Group direction="column">
          {tradeHistory?.map((data, index) => (
            <Paper
              withBorder
              p="md"
              style={{
                width: "100%",
              }}
              key={index}
            >
              <Title order={2}>Data da Troca: {data.tradeDate}</Title>
              <Group>
                <PokemonsList
                  color="red"
                  pokemons={data.redPokemons}
                  totalXp={data.redPokemonsXp}
                />
                <PokemonsList
                  color="blue"
                  pokemons={data.bluePokemons}
                  totalXp={data.bluePokemonsXp}
                />
              </Group>
            </Paper>
          ))}
        </Group>
      </Modal>
    </>
  );
}

export default HistoryModal;

function PokemonsList({
  pokemons,
  color,
  totalXp,
}: {
  pokemons: string[];
  color: "red" | "blue";
  totalXp: number;
}) {
  const hexColor = {
    red: "#FFA8A8",
    blue: "#74C0FC",
  };

  return (
    <Paper
      withBorder
      sx={{
        flex: "1",
        background: hexColor[color],
      }}
      p="sm"
    >
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 3, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
        spacing="xs"
      >
        {pokemons.map((name) => (
          <Text>
            <Center>{name}</Center>
          </Text>
        ))}
      </SimpleGrid>

      <Text>
        <Center>XP Total: {totalXp}</Center>
      </Text>
    </Paper>
  );
}
