import React, { useState, useEffect } from 'react';
import { MdDeleteForever, MdAdd, MdSave, MdClear, MdEdit } from "react-icons/md"
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  Stack,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

const baseURL = 'http://localhost:3000/products';

const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  async function fetchData() {
    const response = await fetch(baseURL),
      data = await response.json();
    setProdutos(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleGetAddProduto = () => {
    onOpen();
    setDescricao();
    setPreco();
    setProduto();
  };

  const handleGetEditProduto = (prod) => {
    setProduto(prod);
    setDescricao(prod.nome);
    setPreco(prod.preco);
    setIsUpdate(true)
    onOpen();
  };

  const handleAddProduto = async () => {
    if (descricao === '' || preco === '') {
      return;
    }
    const newProduto = {
      id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
      nome: descricao,
      preco: preco
    };
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduto)
    }).then(() => fetchData());
    setDescricao('');
    setPreco('');
  };

  const handleUpdateProduto = async () => {
    const oddProduto = {
      id: produto.id,
      nome: descricao,
      preco: preco
    };

    const response = await fetch(baseURL + `/${oddProduto.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(oddProduto)
    }).then(() => fetchData());
    setIsUpdate(false);
    onClose();
  };
  
  const handleSaveProduto = async () => {
    if (!isUpdate) {
      handleAddProduto();
    } else {
      handleUpdateProduto();
    }
  };

  const handleDelProduto = async (id) => {
    fetch(baseURL + `/${id}`, {
      method: 'DELETE'
    }).then(() => fetchData());
  };

  return (
    <ChakraProvider theme={theme}>
      <VStack>
        <Box textAlign="center" fontSize="xl">
          <Text fontWeight={'extrabold'} color={'teal'}>
            Lista de produtos
          </Text>
          <Stack w={'sm'}>
            <Button width={'7rem'} colorScheme='green' size={'sm'} onClick={handleGetAddProduto}><MdAdd /> Produto</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Adicionar produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel htmlFor='descricao'>Descrição:</FormLabel>
                    <Input id='descricao' type='descricao' onChange={(e) => setDescricao(e.target.value)} value={descricao} />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='preco'>Preço:</FormLabel>
                    <Input id='preco' type='preco' onChange={(e) => setPreco(e.target.value)} value={preco} />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={handleSaveProduto}>
                    <MdSave />
                  </Button>
                  <Button colorScheme='red' mr={3} onClick={onClose}>
                    <MdClear />
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
          <TableContainer>
            <Table size={'sm'} variant='striped' colorScheme='gray'>
              <TableCaption>Produtos</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Descrição</Th>
                  <Th>Preço</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {produtos.map(prod =>
                  <Tr key={prod.id}>
                    <Td>{prod.id}</Td>
                    <Td>{prod.nome}</Td>
                    <Td>{prod.preco}</Td>
                    <Td>
                      <Button padding={0} alignItems={'center'} justifyContent={'end'} size={'sm'} leftIcon={<MdEdit />} colorScheme='orange' variant={'ghost'} onClick={() => handleGetEditProduto(prod)}>
                      </Button>
                      <Button padding={0} alignItems={'center'} justifyContent={'end'} size={'sm'} leftIcon={<MdDeleteForever />} colorScheme='red' variant={'ghost'} onClick={() => handleDelProduto(prod.id)}>
                      </Button>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
