import { Title, TextInput, Button, Box } from "@mantine/core";
import { Clock } from "react-feather";

export function Navbar() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "white",
        borderBottom: "1px solid #CED4DA",
      }}
      py="1rem"
      px=".5rem"
    >
      <Title>Poketrade</Title>
      <TextInput placeholder="Pesquisar Pokémon" />
      <Button leftIcon={<Clock />} variant="outline">
        Histórico
      </Button>
    </Box>
  );
}
