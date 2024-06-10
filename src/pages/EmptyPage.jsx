import { Container, Text, VStack } from "@chakra-ui/react";

const EmptyPage = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Empty Page</Text>
        <Text>This is an empty page.</Text>
      </VStack>
    </Container>
  );
};

export default EmptyPage;