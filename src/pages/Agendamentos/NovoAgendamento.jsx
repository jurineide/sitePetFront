import axios from "axios";
import Img from "../../assets/soul-pet-logo.svg";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Produtos/AddProd.css"

export function NovoAgendamento() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [servicos, setServicos] = useState([]);
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/servicos")
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get("http://localhost:3001/pets")
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    function onSubmit(data) {
        axios.post("http://localhost:3001/agendamentos", data)
            .then(response => {
                toast.success("Agendamento realizado.", { position: "bottom-right", duration: 2000 });
                navigate("/agendamentos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    return (
        <div className="container">
            <Row>
                <Col xs={5} className="mt-30">
                    <img className="img-form col-md-10 " src={Img} alt="LOGO" />
                </Col>
                <Col>
                    <h1>Novo agendamento</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3 ">
                            <Form.Label>Pets</Form.Label>
                            <Form.Select className={errors.petId && "is-invalid"}
                                {...register("petId", { required: "Escolha um pet para o agendamento." })}>
                                <option value=""> Selecione o pet..</option>
                                {pets.map(pet =>
                                    <option value={pet.id}>{pet.nome}</option>
                                )}
                            </Form.Select>
                            {errors.petId && <Form.Text className="invalid-feedback">{errors.petId.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Serviços</Form.Label>
                            <Form.Select className={errors.servicoId && "is-invalid"}
                                {...register("servicoId", { required: "Escolha um serviço." })}>
                                <option value=""> Escolha um serviço...</option>
                                {servicos.map(servico =>
                                    <option value={servico.id}>{servico.nome}</option>
                                )}
                            </Form.Select>
                            {errors.servicoId && <Form.Text className="invalid-feedback">{errors.servicoId.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Data de agendamento</Form.Label>
                            <Form.Control type="date" className={errors.dataAgendada && "is-invalid"} {...register("dataAgendada", { required: "Campo obrigatório.", maxLength: { value: 25, message: "Limite de 25 caracteres." } })} />
                            {errors.dataAgendada && <Form.Text className="invalid-feedback">{errors.dataAgendada.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status do serviço</Form.Label>
                            <Form.Select className={errors.realizada && "is-invalid"}
                                {...register("realizada", { required: "O serviço foi realizado?" })}>
                                <option value=""> O serviço foi realizado?</option>
                                <option>Sim</option>
                                <option>Não</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="primary" type="submit" className="ml-auto">
                                Agendar
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>

        </div>
    );
}