import { useEffect, useState } from 'react';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import { Box, Flex, Button } from '@chakra-ui/react';
import Users from '../Users/users';
import Search from '../Search/Search';
import Dashboard from '../Dashboard/Dashboard';
import Analyze from '../Analyze/Analyze';
import Login from '../Login/Login';
import Sidebar from '../Sidebar/sidebar';

import './style.scss';
import LogoImage from '../../assets/logo.png';
import AvatarIcon from '../../assets/icons/avatar.svg';
import CallDetails from '../Search/CallDetails';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  const isLoginPage = location.pathname === '/login';

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <Flex direction="column" minHeight="100vh">
      {!isLoginPage && (
        <Box as="header" color="white" p="5" height={'100px'}>
          <Flex justify="space-between" align="center" position="relative">
            {/* Container to keep the dropdown open */}
            <Box
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
              style={{ position: 'relative' }}
            >
              <button className="HeaderProfileButton" style={{ position: 'relative' }}>
                <Flex align="center" justify="space-between">
                  <span>علی کلاته</span>
                  <img src={AvatarIcon} alt="avatarImage" />
                </Flex>
              </button>
              {isMenuOpen && (
                <Box
                  position="absolute"
                  top="100%"
                  right="0"
                  left="0"
                  mt="0"
                  bg="white"
                  color="black"
                  p="3"
                  borderRadius="md"
                  boxShadow="md"
                  zIndex="1000"
                  style={{ textAlign: 'center' }}
                >
                  <Button
                    size="sm"
                    bg={'red.500'}
                    _hover={{ bg: 'red.500' }}
                    onClick={handleLogout}
                    style={{ width: '100%', color: 'white' }}
                  >
                    خروج از حساب کاربری
                  </Button>
                </Box>
              )}
            </Box>
            <Box>
              <img src={LogoImage} alt="Logo" style={{ maxWidth: '100px', height: 'auto' }} />
            </Box>
          </Flex>
        </Box>
      )}

      <Flex as="main" flex="1" direction="row">
        <Box flex="1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/search" element={<Search />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/login" element={<Login />} />
            <Route path="/call-details/:id" element={<CallDetails />} />
          </Routes>
        </Box>

        {!isLoginPage && (
          <Box as="aside" width={{ base: '100%', md: '300px' }} padding="5">
            <Sidebar />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Layout;
