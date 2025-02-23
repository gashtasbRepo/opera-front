import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Input, Button, Text, VStack, Image } from '@chakra-ui/react';
import './Login.scss';
import LogoImage from '../../assets/logo.png'; // Adjust the path to your logo file

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // For error messages
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); // Clear any previous errors

    try {
      const response = await fetch('http://185.243.48.218/accounts/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'Invalid credentials');
        return;
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      navigate('/'); // Redirect to dashboard after login
    } catch (err) {
      console.error('Login failed:', err);
      setError('مشکلی پیش آمده. لطفا دوباره امتحان کنید');
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      backgroundColor="gray.50"
    >
      <Box
        w="400px"
        bg="white"
        p="8"
        borderRadius="lg"
        boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
        textAlign="center"
      >
        <VStack spacing="6">
          {/* Add Logo */}
          <Image src={LogoImage} alt="Logo" boxSize="100px" objectFit="contain" />

          {/* Login Title */}
          <Text fontSize="2xl" fontWeight="bold" color="purple.700">
            ورود به حساب کاربری
          </Text>
        </VStack>

        <VStack spacing="4" mt="6">
          <Input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            focusBorderColor="purple.500"
          />
          <Input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            focusBorderColor="purple.500"
          />
          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
          <Button
            colorScheme="purple"
            width="full"
            onClick={handleLogin}
          >
            ورود
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
