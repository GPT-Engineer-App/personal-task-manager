import { Box, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Box bg="brand.700" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link as={RouterLink} to="/" color="white" fontWeight="bold">
          Home
        </Link>
        <Link as={RouterLink} to="/projects" color="white" fontWeight="bold">
          Projects
        </Link>
        <Link as={RouterLink} to="/todos" color="white" fontWeight="bold">
          Todos
        </Link>
      </Flex>
    </Box>
  );
};

export default NavigationBar;