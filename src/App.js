import React, { useState, useEffect } from 'react';
import { MdAdd } from "react-icons/md"
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Stack,
  Button,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import TableProdutos from './components/TableProdutos';
import ModalAddProdutos from './components/ModalAddProdutos';

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
            <Button
              width={'7rem'}
              colorScheme='green'
              size={'sm'}
              onClick={handleGetAddProduto}>
              <MdAdd /> Produto
            </Button>
            <ModalAddProdutos
              isOpen={isOpen}
              descricao={descricao}
              preco={preco}
              onClose={onClose}
              setDescricao={setDescricao}
              setPreco={setPreco}
              handleSaveProduto={handleSaveProduto} />
          </Stack>
          <TableProdutos
            produtos={produtos}
            handleGetEditProduto={handleGetEditProduto}
            handleDelProduto={handleDelProduto} />
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default App;
