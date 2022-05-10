import { MdDeleteForever, MdEdit } from "react-icons/md"
import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Button,

} from '@chakra-ui/react';

const TableProdutos = ({
    produtos,
    handleGetEditProduto,
    handleDelProduto
}) => {
    return (
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
                                <Button
                                    padding={0}
                                    alignItems={'center'}
                                    justifyContent={'end'}
                                    size={'sm'}
                                    leftIcon={<MdEdit />}
                                    colorScheme='orange'
                                    variant={'ghost'}
                                    onClick={() => handleGetEditProduto(prod)}>
                                </Button>
                                <Button
                                    padding={0}
                                    alignItems={'center'}
                                    justifyContent={'end'}
                                    size={'sm'}
                                    leftIcon={<MdDeleteForever />}
                                    colorScheme='red' variant={'ghost'}
                                    onClick={() => handleDelProduto(prod.id)}>
                                </Button>
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default TableProdutos;