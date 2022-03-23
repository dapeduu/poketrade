import { TextInput, Button, Box, Container, AspectRatio } from "@mantine/core";
import { Clock } from "react-feather";
// @ts-ignore
import PokeballIcon from "../assets/pokeball.svg?component";

export function Navbar() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "white",
        borderBottom: "1px solid #CED4DA",
      }}
    >
      <Container
        size="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        py=".5rem"
        px=".5rem"
      >
        <Box
          sx={{
            width: 55,
          }}
        >
          <PokeballIcon />
        </Box>

        <TextInput placeholder="Pesquisar Pokémon" />
        <Button leftIcon={<Clock />} variant="outline">
          Histórico
        </Button>
      </Container>
    </Box>
  );
}
