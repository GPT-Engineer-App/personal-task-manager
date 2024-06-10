import { Container, Text, VStack } from "@chakra-ui/react";
import NavBar from "../components/NavBar.jsx";

const Index = () => {
  return (
    <>
      <NavBar />
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        </VStack>
      </Container>
    </>
  );
};

export default Index;