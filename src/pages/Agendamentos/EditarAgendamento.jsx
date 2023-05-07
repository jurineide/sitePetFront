import axios from "axios";
import { useEffect, } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Img from "../../assets/soul-pet-logo.svg";

export function EditarAgendamento() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();


    function onSubmit(data) {
        axios.put(`http://localhost:3001/agendamentos/${id}`, data)
            .then(response => {
                toast.success("Agendamento editado.", { position: "bottom-right", duration: 2000 });
                navigate("/agendamentos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/agendamentos/${id}`)
            .then(response => {
                const { petId, servicoId, dataAgendada, realizada } = response.data;
                reset({ petId, servicoId, dataAgendada, realizada });
            })
    }, [id, reset])

    return (
        <div className="container">
            <Row>
                <Col xs={5} className="mt-30">
                    <img className="img-form col-md-10 " src={Img} alt="LOGO" />
                </Col>
                <Col>
                    <h1>Editar Agendamento</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Pet</Form.Label>
                            <Form.Control type="text" className={errors.petId && "is-invalid"} {...register("petId", { required: "O pet é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
                            {errors.petId && <Form.Text className="invalid-feedback">{errors.petId.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Serviço</Form.Label>
                            <Form.Control type="text" className={errors.servicoId && "is-invalid"} {...register("servicoId", { required: "O serviço é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres." } })} />
                            {errors.servicoId && <Form.Text className="invalid-feedback">{errors.servicoId.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="date" className={errors.dataAgendada && "is-invalid"} {...register("dataAgendada", { required: "A data é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
                            {errors.dataAgendada && <Form.Text className="invalid-feedback">{errors.dataAgendada.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" className={errors.realizada && "is-invalid"} {...register("realizada", { required: "O status é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
                            {errors.realizada && <Form.Text className="invalid-feedback">{errors.realizada.message}</Form.Text>}
                        </Form.Group>


                        <div className="d-flex justify-content-end">
                            <Button variant="primary" type="submit" className="ml-auto">
                                Editar
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
