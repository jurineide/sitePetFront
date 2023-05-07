import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import Img from "../../assets/soul-pet-logo.svg";

export function Clientes() {

    const [clientes, setClientes] = useState(null);
    const [show, setShow] = useState(false);
    const [showCliente, setShowCliente] = useState(false);
    const [selecionaCliente, setSelecionaCliente] = useState(null);
    const [idCliente, setIdCliente] = useState(null);


    const handleClose = (id) => {
        setIdCliente(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdCliente(id);
        setShow(true)
    };

    const handleCliente = (id) => {
        setSelecionaCliente(null);
        setShowCliente(false)
    };

    const buscarCliente = (id) => {
        return axios
            .get(`http://localhost:3001/clientes/${id}`)
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

    const handleShowCliente = (id) => {
        buscarCliente(id).then((cliente) => {
            setSelecionaCliente(cliente);
            setShowCliente(true);
        });
    };


    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    function onDelete() {
        axios.delete(`http://localhost:3001/clientes/${idCliente}`)
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
        <div className="clientes container">
            <div className="container-img">
                <img className="img-bg col-md-10 " src={Img} alt="LOGO" />
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <h1>Clientes</h1> 
                <div> 
                    <Button as={Link} to="/clientes/novo" className="m-2">
                        <i className="bi bi-plus-lg"></i> Cliente
                    </Button>

                    <Button onClick={() => window.open('http://localhost:3001/relatorio')}>
                        <i class="bi bi-filetype-pdf"></i> Relatório
                    </Button>
                </div>
            </div>
            <hr/>
            {
                clientes === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => {
                                return (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.telefone}</td>
                                        <td className="d-flex gap-2">
                                            <Button onClick={() => handleShow(cliente.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/clientes/editar/${cliente.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button onClick={() => handleShowCliente(cliente.id)}>
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
                <Modal.Body>Tem certeza que deseja excluir o cliente?</Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="warning" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showCliente} onHide={handleCliente}>
                <Modal.Body>
                    <Modal.Title>Informações do Cliente</Modal.Title>
                    {selecionaCliente && (
                        <>
                            <div>
                                <hr></hr>
                                <p>
                                    <b>Código: {selecionaCliente.id}</b> <br />
                                    Nome: {selecionaCliente.nome} <br />
                                    Email: {selecionaCliente.email} <br />
                                    Telefone: {selecionaCliente.telefone} <br />
                                </p>
                                <hr></hr>
                                <p>
                                    <b>Endeceço: </b> <br />
                                    Rua: {selecionaCliente.endereco.rua} <br />
                                    Nº: {selecionaCliente.endereco.numero} <br />
                                    Cidade: {selecionaCliente.endereco.cidade} <br />
                                    UF: {selecionaCliente.endereco.uf} <br />
                                    CEP: {selecionaCliente.endereco.cep} <br />
                                </p>
                                <hr></hr>
                                <p>
                                    <b>Pets: </b> <br />
                                    Quantidade de pets: {selecionaCliente.pets.length} <br />
                                    Nome e tipo: <br />
                                    {(() => {
                                        const petNames = [];
                                        selecionaCliente.pets.forEach((pet) => {
                                            petNames.push(<p key={pet.id} className="m-0 p-0"> - {pet.nome}: {pet.tipo}</p>);
                                        });
                                        return petNames;
                                    })()}
                                </p>
                            </div>
                        </>
                    )}
                    <div className="d-flex justify-content-end">
                        <Button variant="warning" onClick={handleCliente} >
                            Fechar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
}