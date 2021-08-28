import React from "react";
import {
  Container,
  Heading,
  Image,
  Box,
  HStack,
  Flex,
  Text,
} from "@chakra-ui/react";
import startNodeimg from "../../images/triangle-right.svg";
import endNodeImg from "../../images/circle.svg";
import weightNodeImg from "../../images/weight.svg";
import ALGORITHMS from "../../PathFinding/algorithms";

const specialNodes = [
  { name: "Start Node", img: startNodeimg },
  { name: "End Node", img: endNodeImg },
  { name: "Weight Node", img: weightNodeImg },
];

const otherNodes = [
  { name: "Unvisited Node", color: ["white"] },
  { name: "Visited Node", color: ["#51CFE3", "#C573FE"] },
  { name: "Shortest Path Node", color: ["#FCF16A"] },
  { name: "Wall Node", color: ["#0C3547"] },
];

const Glossary = ({ algorithm }) => {
  return (
    <Container my="6" px={10} maxW="100%">
      <Flex>
        {specialNodes.map((el) => (
          <HStack px={5} key={el.name}>
            <Image boxSize="25px" src={el.img} />
            <Text
              className={
                !ALGORITHMS[algorithm].weighted &&
                el.name === "Weight Node" &&
                "strike-through"
              }
              as="span"
              fontSize="18px"
              fontWeight="medium"
            >
              {el.name}
            </Text>
          </HStack>
        ))}
      </Flex>
      <Flex mt={3}>
        {otherNodes.map((node) => (
          <HStack px={5} key={node.name}>
            {node.color.map((el) => (
              <Box
                key={el}
                mr={"5px"}
                className="node"
                bg={el}
                width="25px"
                h="25px"
              ></Box>
            ))}
            <Text as="span" fontSize="18px" fontWeight="medium">
              {node.name}
            </Text>
          </HStack>
        ))}
      </Flex>
      <Text color="#0C3547" mt="6" fontSize="18px" textAlign="center">
        {ALGORITHMS[algorithm].name} is{" "}
        <Text as="span" fontStyle="italic" fontWeight="bold">
          {ALGORITHMS[algorithm].weighted ? "weighted" : "unweighted"}{" "}
        </Text>{" "}
        and
        <Text fontStyle="italic" as="span" fontWeight="bold">
          {" "}
          {ALGORITHMS[algorithm].shortest ? "" : "does not"} guarantee
        </Text>
        {ALGORITHMS[algorithm].shortest ? "s" : ""} shortest path
      </Text>
    </Container>
  );
};

export default Glossary;
