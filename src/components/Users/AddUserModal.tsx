// AddUserModal.tsx
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    Switch,
} from "@chakra-ui/react";

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleModalActiveToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    newUser: {
        name: string;
        username: string;
        active: boolean
    };
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    isOpen,
    onClose,
    handleInputChange,
    newUser,
    handleModalActiveToggle
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent dir="rtl" borderRadius={12}>
                <ModalHeader borderTopRightRadius={11} borderTopLeftRadius={11}>افزودن کاربر</ModalHeader>
                <ModalCloseButton transform={'translateY(5px)'} />
                <ModalBody mt={5}>
                    <FormControl>
                        <FormLabel>نام کامل</FormLabel>
                        <Input
                            size={'lg'}
                            borderColor={'#E4E4E4'}
                            _placeholder={{ color: '9F9F9F' }}
                            borderRadius={10}
                            _focus={{ border: '2px solid #BD5EC2', boxShadow: 'none' }}
                            placeholder="نام کامل را وارد کنید"
                            name="name"
                            value={newUser.name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>نام کاربری</FormLabel>
                        <Input
                            size={'lg'}
                            borderColor={'#E4E4E4'}
                            _placeholder={{ color: '9F9F9F' }}
                            borderRadius={10}
                            _focus={{ border: '2px solid #BD5EC2', boxShadow: 'none' }}
                            placeholder="نام کاربری را وارد کنید"
                            name="username"
                            value={newUser.username}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl mt={6} display={'flex'}>
                        <FormLabel fontSize={'17px'} ml={'6'}>فعال بودن کاربر</FormLabel>
                        <Switch
                            size={'lg'}
                            isChecked={newUser.active}
                            onChange={handleModalActiveToggle}
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
                    </FormControl>
                </ModalBody>
                <ModalFooter mt={10}>
                    <Button
                        bg={"#BD5EC2"}
                        color={'white'}
                        onClick={onClose}
                        _hover={{background: '#BD5EC2'}}
                        borderTopRightRadius={0}
                        borderTopLeftRadius={0}
                        height={'50px'}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            right: '0'
                        }}
                    >
                        اضافه کردن
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddUserModal;
