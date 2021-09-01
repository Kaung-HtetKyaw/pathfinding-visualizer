import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  HStack,
  Icon,
  Divider,
  color,
} from "@chakra-ui/react";
import { FaQuestion } from "react-icons/fa";
import ALGORITHMS from "../PathFinding/algorithms/index";

const Topic = ({ children }) => {
  return (
    <HStack mt={5} justifyContent="start" alignItems="start">
      <Icon transform="rotate(180deg)" mt={2} as={FaQuestion} />
      <Box>{children}</Box>
    </HStack>
  );
};

const Tutorial = ({ isOpen, onOpen, onClose }) => {
  return (
    <Modal
      size="full"
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        pb={5}
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <ModalHeader color="#0C3547" textAlign="center" fontSize="3xl">
          Welcome to Pathfinding Visualizer
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center" color="#0C3547">
          <Box maxW={{ base: "100%", lg: "70%" }}>
            <Text as="h5" fontSize="xl" textAlign="center">
              This tutorial will walk you through all features of Pathfind
              Visualizer
            </Text>
            <Topic>
              <Text fontWeight="bold" fontSize="xl">
                What is a pathfinding algorithm ?
              </Text>
              <Text as="li" fontSize="17px">
                Pathfinding algorithms address the problem of finding a path
                from a source to a destination avoiding obstacles and minimizing
                the costs (time, distance, risks, fuel, price, etc.)
              </Text>
              <Text as="li" fontSize="17px">
                All pathfinding algorithms are implemented for 2D grid. Movement
                for a grid to its Top, Right, Bottom, Left neighbours will cost
                of 1
              </Text>
            </Topic>
            <Topic>
              <Text fontWeight="bold" fontSize="xl">
                Which algorithms are included in this application ?
              </Text>
              {Object.values(ALGORITHMS).map((el) => (
                <Text mb={2} as="li" fontSize="17px">
                  <Text as="span" display="inline-block" fontWeight="bold">
                    {el.name}
                  </Text>{" "}
                  <span>({el.weighted ? "weighted" : "unweighted"}):</span>{" "}
                  <span>{el.about}</span>
                </Text>
              ))}
              <Text mb={2} as="li" fontSize="17px">
                Note that some algorithms are unweighted, while others are
                weighted. Unweighted algorithms do not take turns or weight
                nodes into account, whereas weighted ones do. Additionally, not
                all algorithms guarantee the shortest path.
              </Text>
            </Topic>
            <Topic>
              <Text fontWeight="bold" fontSize="xl">
                How to add walls and weights{" "}
              </Text>
              <Text as="li" fontSize="17px">
                Click on the grid to add a wall. Click on the grid while
                pressing{" "}
                <Text as="span" fontWeight="bold">
                  W
                </Text>{" "}
                to add a weight
              </Text>
              <Text as="li" fontSize="17px">
                You can also generate maze and pattern by selecting from the
                dropdown and click generate Generate Maze button.
              </Text>
              <Text as="li" fontSize="17px">
                Walls are impenetrable, meaning that a path cannot cross through
                them. Weights, however, are not impassable. They are simply more
                "costly" to move through. In this application, moving through a
                weight node has a "cost" of 15.
              </Text>
            </Topic>
            <Topic>
              <Text fontWeight="bold" fontSize="xl">
                How to relocate start and end nodes{" "}
              </Text>
              <Text as="li" fontSize="17px">
                Just simply click on start or end node and the mouse pointer
                will change to the icon of node you clicked on (start or end)
                and then just simpley click on the node you want start/end node
                to be at.
              </Text>
              <Text as="li" fontSize="17px">
                If the grid is dirty ,i.e. there was a previous visualization,
                relocating start/end node will re-visualize the selected
                pathfinding algorithm.
              </Text>
            </Topic>
            <Topic>
              <Text fontWeight="bold" fontSize="xl">
                Priority Queue{" "}
              </Text>
              <Text as="li" fontSize="17px">
                Binary Heap is used as a Priority Queue for Dijkstra, A* and
                Greedy Best First Search.
              </Text>
            </Topic>
            <Box mt={5} height="5px" bg="#0C3547"></Box>
            <Box fontWeight="bold">
              <Text my={5} as="h5" fontSize="xl">
                This project was inspired by{" "}
                <Text
                  as="a"
                  href="https://clementmihailescu.github.io/Pathfinding-Visualizer/#"
                  textDecor="underline"
                  _hover={{
                    color: "teal",
                  }}
                >
                  Clement Mihailescu's pathfinding visualizer.
                </Text>
              </Text>
              <Text my={5} as="h5" fontSize="xl">
                If you want to see the source of this application, you can get
                it here:{" "}
                <Text
                  _hover={{
                    color: "teal",
                  }}
                  as="a"
                  href="https://github.com/Kaung-HtetKyaw/pathfinding-visualizer"
                  textDecor="underline"
                >
                  https://github.com/Kaung-HtetKyaw/pathfinding-visualizer
                </Text>
              </Text>
              <Text my={5} as="h5" fontSize="xl">
                If you want to see the source of the more generic versions of
                algorithms implemented in this porject, you can get it here:{" "}
                <Text
                  _hover={{
                    color: "teal",
                  }}
                  as="a"
                  href="https://github.com/Kaung-HtetKyaw/Algorithm-Javascript-Implementation"
                  textDecor="underline"
                >
                  https://github.com/Kaung-HtetKyaw/Algorithm-Javascript-Implementation
                </Text>
              </Text>
              <Text my={5} as="h5" fontSize="xl">
                If anyone reading this knows of anything that could make it
                better, please let me know.
              </Text>
            </Box>
          </Box>
        </ModalBody>

        {/* <ModalFooter display="flex" justifyContent="space-between">
          <Button colorScheme="teal" mr={3} onClick={onClose}>
            Skip Tutorial
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default Tutorial;
