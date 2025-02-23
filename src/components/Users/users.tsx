import { Table, Thead, Tbody, Tr, Th, Td, Box, Switch, Button, Fade, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toFarsiNumber } from '../../utils/utils';
import { Flex, Pagination } from 'antd';
import AddUserModal from "./AddUserModal";

import AddIcon from '../../assets/icons/add.svg'
import EditIcon from '../../assets/icons/edit.svg'
import CloseIcon from '../../assets/icons/close.svg'

import './style.scss'

interface User {
  id: number;
  name: string;
  sessionId: string;
  evaluatorName: string,
  isActive: boolean;
}

const usersData = [
  {
    id: 1,
    name: 'Ali',
    evaluatorName: 'A.kalate',
    sessionId: '123456789',
    isActive: true,
  },
  {
    id: 2,
    name: 'Ali',
    evaluatorName: 'A.kalate',
    sessionId: '123456789',
    isActive: true,
  },
  {
    id: 3,
    name: 'Ali',
    evaluatorName: 'A.kalate',
    sessionId: '123456789',
    isActive: true,
  },
  {
    id: 4,
    name: 'Ali',
    evaluatorName: 'A.kalate',
    sessionId: '123456789',
    isActive: true,
  },
  {
    id: 5,
    name: 'Ali',
    evaluatorName: 'A.kalate',
    sessionId: '123456789',
    isActive: false,
  },
  {
    id: 6,
    name: 'Ali',
    evaluatorName: 'A.kalate',
    sessionId: '123456789',
    isActive: false,
  },
  {
    id: 7,
    name: 'Ali',
    evaluatorName: 'A.kalate',
    sessionId: '123456789',
    isActive: false,
  },
  {
    id: 8,
    name: 'Ali',
    evaluatorName: 'A.kalate',
    sessionId: '123456789',
    isActive: false,
  },
  {
    id: 9,
    name: 'Ali',
    evaluatorName: 'A.kalate',
    sessionId: '123456789',
    isActive: false,
  },
  {
    id: 10,
    name: 'Ali',
    evaluatorName: 'A.kalate',
    sessionId: '123456789',
    isActive: false,
  }
]

const Users = () => {

  const [users, setUsers] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    active: true
  });

  useEffect(() => {
    if (usersData.length) {
      setUsers(usersData)
    }
  }, [usersData])

  const handleToggle = (id: number) => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleModalActiveToggle = () => {
    setNewUser(prevState => ({ ...prevState, active: !prevState.active }));
  };


  return (
    <Fade
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AddUserModal
        isOpen={isOpen}
        onClose={onClose}
        handleInputChange={handleInputChange}
        newUser={newUser}
        handleModalActiveToggle={handleModalActiveToggle}
      />
      <Box dir='rtl' className='users' p={'5'}>
        <Button className='addUsersButton' onClick={onOpen}>
          <img src={AddIcon} alt='addIcon' />
          <span>افزودن کاربر</span>
        </Button>
        <Table variant="simple" className='usersTable' size={'sm'}>
          <Thead className='usersTableHeader'>
            <Tr>
              <Th width={'10%'}>ردیف</Th>
              <Th width={'20%'}>نام کامل</Th>
              <Th width={'20%'}>نام کاربری</Th>
              <Th width={'15%'}>فعال</Th>
              <Th width={'15%'}>عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user => (
              <Tr key={user.id}>
                <Td width={2}>{toFarsiNumber(user.id)}</Td>
                <Td>{user.name}</Td>
                <Td>{user.evaluatorName}</Td>
                <Td>
                  <Switch
                    size={'lg'}
                    isChecked={user.isActive}
                    onChange={() => handleToggle(user.id)}
                    sx={{
                      '& .chakra-switch__track': {
                        backgroundColor: '#eee',
                      },
                      '& .chakra-switch__thumb': {
                        backgroundColor: '#545454',
                        border: '2px solid #545454',
                      },
                      '&.chakra-switch[data-checked] .chakra-switch__track': {
                        backgroundColor: 'rgba(189, 94, 194, 0.3)',
                      },
                      '&.chakra-switch[data-checked] .chakra-switch__thumb': {
                        backgroundColor: '#BD5EC2',
                        border: '2px solid #BD5EC2',
                      },
                    }}
                  />
                </Td>
                <Td>
                  <Flex >
                    <Button className='EditButton' onClick={() => { }}>
                      <img src={EditIcon} alt='editIcon' />
                      <span>ویرایش</span>
                    </Button>
                    <Button className='CloseButton' onClick={() => { }} ml={2}>
                      <img src={CloseIcon} alt='closeIcon' />
                      <span>حذف</span>
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box mt={'5'} className='usersPagePagination'>
          <Pagination defaultCurrent={1} total={50} align='center' />
        </Box>
      </Box>
    </Fade>
  );
};

export default Users;
