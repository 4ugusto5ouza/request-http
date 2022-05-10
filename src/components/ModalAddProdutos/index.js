import { MdSave, MdClear, } from "react-icons/md"

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';

const ModalAddProdutos = ({
  isOpen,
  descricao,
  preco,
  onClose,
  setDescricao,
  setPreco,
  handleSaveProduto
}) => {
  return (
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
  );
};

export default ModalAddProdutos;