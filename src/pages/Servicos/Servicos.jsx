import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import Img from "../../assets/soul-pet-logo.svg";


export function Servicos() {
    const [servicos, setServicos] = useState(null);
    const [filtroNome, setFiltroNome] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteServicoId, setDeleteServicoId] = useState(null);

    const handleClose = () => {
        setDeleteServicoId(null);
        setShowDeleteModal(false);
    };

    const handleShow = (id) => {
        setDeleteServicoId(id);
        setShowDeleteModal(true);
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios
            .get("http://localhost:3001/servicos")
            .then((response) => {
                setServicos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // FE-12
    function deleteServico(id) {
        axios
            .delete(`http://localhost:3001/servicos/${id}`)
            .then(() => {
                buscarServicos();
                handleClose();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function buscarServicos() {
        initializeTable();
    }

    return (
        <div className="servicos container">
            <div className="container-img">
                <img className="img-bg col-md-10 " src={Img} alt="LOGO" />
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <h1>Serviços</h1>
                <Button as={Link} to="/servicos/novo">
                    <i className="bi bi-plus-lg me-2"></i>Serviço
                </Button>
            </div>
            <hr/>
            <div className="input-group mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Digite o nome do serviço"
                    value={filtroNome}
                    onChange={(event) => {
                        setFiltroNome(event.target.value);
                    }}
                />
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="bi bi-search"></i>
                    </span>
                </div>
            </div>
            {servicos === null ? (
                <Loader />
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos
                            .filter((servico) =>
                                servico.nome.toLowerCase().includes(filtroNome.toLowerCase())
                            )
                            .map((servico) => {
                                return (
                                    <tr key={servico.id}>
                                        <td>{servico.nome}</td>
                                        <td>{servico.preco}</td>
                                        <td className="d-flex gap-2">
                                            <Button
                                                variant = "primary"
                                                as={Link}
                                                to={`/servicos/editar/${servico.id}`}
                                                data-toggle="tooltip"
                                                title="Editar"
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button
                                                variant="primary"
                                                onClick={() => handleShow(servico.id)}
                                                data-toggle="tooltip"
                                                title="Deletar"
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            )}
            <Modal show={showDeleteModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir este serviço?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => deleteServico(deleteServicoId)}
                    >
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
