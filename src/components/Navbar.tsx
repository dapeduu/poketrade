import {
  TextInput,
  Button,
  Box,
  Container,
  AspectRatio,
  ActionIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Clock } from "react-feather";
// @ts-ignore
import PokeballIcon from "../assets/pokeball.svg?component";
import HistoryModal from "./HistoryModal";

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

        <HistoryModal />
      </Container>
    </Box>
  );
}
