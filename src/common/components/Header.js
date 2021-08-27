import React from "react";
import {
  Container,
  Box,
  HStack,
  VStack,
  Stack,
  Heading,
  Select,
  Button,
} from "@chakra-ui/react";
import ALGORITHMS from "../../PathFinding/algorithms";
import MAZES from "../../maze";
import { SPEED } from "../../utils/constants";

const Header = ({
  algorithm = "Dijkstra",
  setAlgorithm,
  maze = "Random",
  setMaze,
  speed,
  setSpeed,
  animating,
  visualize,
  generateMaze,
  clearBoard,
}) => {
  return (
    <Container maxW="100%" bg="#34495E" py="6">
      <Box>
        <Heading color="white" fontSize="2xl">
          Pathfinding Visualizer
        </Heading>
      </Box>
      <Box mt={3}>
        <Stack direction={["column", "column", "row"]}>
          <HStack>
            <Box>
              <Select
                onChange={(e) => setAlgorithm(e.target.value)}
                width="120px"
                defaultValue={algorithm}
                colorScheme="teal"
                color="white"
                fontSize="13px"
              >
                {Object.keys(ALGORITHMS).map((el) => (
                  <option
                    style={{ color: "black", fontSize: "15px" }}
                    key={el}
                    value={el}
                  >
                    {ALGORITHMS[el].name}
                  </option>
                ))}
              </Select>
            </Box>
            <Select
              onChange={(e) => setMaze(e.target.value)}
              width="170px"
              defaultValue={maze}
              colorScheme="teal"
              color="white"
              fontSize="13px"
            >
              {Object.keys(MAZES).map((el) => (
                <option
                  style={{ color: "black", fontSize: "15px" }}
                  key={el}
                  value={el}
                >
                  {MAZES[el].name}
                </option>
              ))}
            </Select>
          </HStack>
          <HStack>
            <Select
              onChange={(e) => setSpeed(e.target.value)}
              width="170px"
              defaultValue={speed}
              colorScheme="teal"
              color="white"
              fontSize="13px"
            >
              {Object.keys(SPEED).map((el) => (
                <option
                  style={{ color: "black", fontSize: "15px" }}
                  key={el}
                  value={el}
                >
                  {el}
                </option>
              ))}
            </Select>
          </HStack>
          <HStack>
            <Button
              isDisabled={animating}
              onClick={() => visualize()}
              colorScheme="teal"
              fontSize="sm"
            >
              Visualize {algorithm}
            </Button>
            <Button
              isDisabled={animating}
              onClick={() => generateMaze()}
              colorScheme="blue"
              fontSize="sm"
            >
              Generate Maze
            </Button>
          </HStack>
          <HStack>
            <Button
              isDisabled={animating}
              onClick={() => clearBoard()}
              fontSize="sm"
              variant="ghost"
              color="white"
              _hover={{
                color: "#34495E",
                backgroundColor: "white",
              }}
            >
              Clear Board
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Header;
