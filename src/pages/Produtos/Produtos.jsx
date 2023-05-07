import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import Img from "../../assets/soul-pet-logo.svg";

export function Produtos() {

    const [produtos, setProdutos] = useState(null);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroNome, setFiltroNome] = useState('');
    const [show, setShow] = useState(false);
    const [idProduto, setIdProduto] = useState(null);

    const handleClose = () => {
        setIdProduto(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdProduto(id);
        setShow(true)
    };

    useEffect(() => {
        initializeTable();

    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/produtos")
            .then(response => {
                console.log(response.data);
                setProdutos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function onDelete() {
        axios.delete(`http://localhost:3001/produto/${idProduto}`)
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
        <div className="produtos container">
            <div className="container-img">
                <img className="img-bg col-md-10 " src={Img} alt="LOGO" />
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <h1>Produtos</h1>
                <Button as={Link} to="/produtos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Produto
                </Button>
            </div>

            <div>
            <hr/>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Digite nome "
                                value={filtroNome}
                                onChange={(event) => { setFiltroNome(event.target.value) }}
                            />
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                            </div>
                        </div>
                        
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Digite categoria "
                                value={filtroCategoria}
                                onChange={(event) => { setFiltroCategoria(event.target.value) }}
                            />
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            
            {
                produtos === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Descrição</th>
                                <th>Desconto</th>
                                <th className="text-nowrap">Data do Desconto</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos
                                .filter((produto) => produto.nome.toLowerCase().includes(filtroNome.toLowerCase()))
                                .filter((produto) => produto.categoria.toLowerCase().includes(filtroCategoria.toLowerCase()))
                                .map(produto => {
                                    return (
                                        <tr key={produto.id}>
                                            <td>{produto.nome}</td>
                                            <td>{produto.preco}</td>
                                            <td>{produto.descricao}</td>
                                            <td>{produto.desconto}</td>
                                            <td>{produto.dataDesconto}</td>
                                            <td>{produto.categoria}</td>
                                            <td className="d-flex gap-2">
                                                <Button onClick={() => handleShow(produto.id)}
                                                    data-toggle="tooltip" title="Editar"
                                                >
                                                    <i className="bi bi-trash-fill"></i>
                                                </Button>
                                                <Button as={Link} to={`/produtos/editar/${produto.id}`}
                                                    data-toggle="tooltip" title="Editar"
                                                >
                                                    <i className="bi bi-pencil-fill"></i>
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
                <Modal.Body>Tem certeza que deseja excluir o produto?</Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}