// Update this page (the content is just a fallback if you fail and example)
// Use chakra-ui
import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to the Task Management System</Text>
        <Button as={Link} to="/projects" colorScheme="teal" size="lg">
          Manage Projects
        </Button>
        <Button as={Link} to="/todos" colorScheme="teal" size="lg">
          Manage Todos
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
