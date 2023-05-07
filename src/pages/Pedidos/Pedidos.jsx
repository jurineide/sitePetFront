import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import Img from "../../assets/soul-pet-logo.svg";

export function Pedidos() {

    const [pedidos, setPedidos] = useState(null);
    const [show, setShow] = useState(false);
    const [idpedido, setIdpedido] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [filtroCliente, setFiltroCliente] = useState('');
    const [filtroProduto, setFiltroProduto] = useState('');
    const [showPedidos, setShowPedidos] = useState(false);
    const [selecionaPedidos, setSelecionaPedidos] = useState(null);

    const handleClose = () => {
        setIdpedido(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdpedido(id);
        setShow(true)
    };

    const resetFiltros = () => {
        setFiltroCliente('');
        setFiltroProduto('');
    };


    const handlePedidos = (id) => {
        setSelecionaPedidos(null);
        setShowPedidos(false)
    };

    const buscarPedido = (codigo) => {
        return axios
            .get(`http://localhost:3001/pedidos/${codigo}`)
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: "bottom-right",
                    duration: 2000,
                });
            });
    }

    const handleShowPedido = (id) => {
        buscarPedido(id).then((pedido) => {
            setSelecionaPedidos(pedido);
            setShowPedidos(true);
        });
    };


    useEffect(() => {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get("http://localhost:3001/produtos")
        .then(response => {
            setProdutos(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        initializeTable();
    }, [])

    function initializeTable() {
        axios.get(`http://localhost:3001/pedidos`)
            .then(response => {
                setPedidos(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    function onDelete() {
        axios.delete(`http://localhost:3001/pedidos/${idpedido}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                initializeTable();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleClose();
    }

    return (
        <div className="container">
            <div className="container-img">
                <img className="img-bg col-md-10 " src={Img} alt="LOGO" />
            </div>
            <div className="d-flex justify-content-between align-items-center m-0 p-0">
                <h1>Pedidos</h1>
                <Button as={Link} to="/pedidos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Pedido
                </Button>
            </div> 
            <hr/>
            <div className="mb-3">
            <Row>
                <Col>
                    <Form.Select onChange={(event) => { setFiltroCliente(event.target.value) }} aria-label="Default select example">
                        <option value="">Selecione o nome do cliente</option>
                        {clientes.map(cliente =>
                        <option value={cliente.nome}>{cliente.nome}</option>
                        )}
                    </Form.Select> 
                </Col>
                <Col>
                    <Form.Select className="" onChange={(event) => { setFiltroProduto(event.target.value) }} aria-label="Default select example">
                        <option value="">Selecione o nome do produto</option>
                        {produtos.map(produto =>
                        <option value={produto.nome}>{produto.nome}</option>
                        )}
                    </Form.Select>
                </Col>
                
                <Col>
                <div className="d-flex justify-content-end">
                <Button onClick={() => resetFiltros()} className="ml-auto">Reiniciar filtros</Button>
                </div>
                </Col>
                        
                </Row>               
            </div>
            {
                pedidos === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Quantidade</th>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th>Ações</th>

                            </tr>
                        </thead>
                        <tbody>  
                        {pedidos
                        .filter((pedido) => pedido.cliente.nome.includes(filtroCliente))
                        .filter((pedido) => pedido.produto.nome.includes(filtroProduto))
                        .map(pedido => {
                                return (
                                    <tr key={pedido.codigo}>
                                        <td>{pedido.quantidade}</td>
                                        <td>{pedido.cliente.nome}</td>
                                        <td>{pedido.produto.nome}</td>
                                        <td className="d-flex gap-2">
                                            <Button onClick={() => handleShow(pedido.codigo)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/pedidos/editar/${pedido.codigo}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button onClick={() => handleShowPedido(pedido.codigo)}>
                                                <i class="bi bi-info-circle"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o pedido?</Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPedidos} onHide={handlePedidos}>
                <Modal.Body>
                    <Modal.Title>Informações do Pedido</Modal.Title>
                    {selecionaPedidos && (
                        <>
                            <div>
                                <hr></hr>
                                <p>
                                    <b>Código: {selecionaPedidos.codigo}</b> <br />
                                    Quantidade: {selecionaPedidos.quantidade} <br />
                                </p>
                                <hr></hr>
                                <p>
                                    <b>Cliente: </b> <br />
                                    Nome: {selecionaPedidos.cliente.nome} <br />
                                    Telefone: {selecionaPedidos.cliente.telefone} <br />
                                </p>
                                <hr></hr>
                                <p>
                                    <b>Produtos: </b> <br />
                                    Nome: {selecionaPedidos.produto.nome} <br />
                                    Descrição: {selecionaPedidos.produto.descricao} <br />
                                </p>
                            </div>
                        </>
                    )}
                    <div className="d-flex justify-content-end">
                        <Button variant="warning" onClick={handlePedidos} >
                            Fechar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    )}