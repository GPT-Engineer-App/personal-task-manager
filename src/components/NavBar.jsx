import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box bg="brand.700" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link as={RouterLink} to="/" color="white" fontWeight="bold" fontSize="xl">
            Task Manager
          </Link>
        </Box>
        <Flex alignItems="center">
          <Link as={RouterLink} to="/projects" color="white" mr={4}>
            Projects
          </Link>
          <Link as={RouterLink} to="/todos" color="white">
            Todos
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;