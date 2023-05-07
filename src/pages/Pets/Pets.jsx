import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import Img from "../../assets/soul-pet-logo.svg";

export function Pets() {

    const [pets, setPets] = useState(null);
    const [show, setShow] = useState(false);
    const [idPets, setIdPets] = useState(null);

    const handleClose = () => {
        setIdPets(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdPets(id);
        setShow(true)
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/pets")
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function onDelete() {
        axios.delete(`http://localhost:3001/pets/${idPets}`)
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
        <div className="pets container">
            <div className="container-img">
                <img className="img-bg col-md-10 " src={Img} alt="LOGO" />
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <h1>Pets</h1>
                <div>
                    <Button as={Link} to="/pets/novo" className="m-2">
                        <i className="bi bi-plus-lg"></i> Pets
                    </Button>

                </div>
            </div>
            <hr/>
            {
                pets === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th>Porte</th>
                                <th>Data Nascimento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map(pet => {
                                return (
                                    <tr key={pet.id}>
                                        <td>{pet.nome}</td>
                                        <td>{pet.tipo}</td>
                                        <td>{pet.porte}</td>
                                        <td>{pet.dataNasc}</td>
                                        <td className="d-flex gap-2">
                                            <Button onClick={() => handleShow(pet.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/pets/editar/${pet.id}`}>
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
                <Modal.Body>Tem certeza que deseja excluir o pet?</Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="warning" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}