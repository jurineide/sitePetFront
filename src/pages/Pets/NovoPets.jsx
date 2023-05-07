import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/soul-pet-logo.svg";

export function NovoPets() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    function onSubmit(data) {
        axios.post("http://localhost:3001/pets", data)
            .then(response => {
                toast.success("Pet adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/pets");
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
                    <h1>Novo Pet</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
                            {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control type="text" className={errors.tipo && "is-invalid"} {...register("tipo", { required: "O tipo do pet é obrigatório.", maxLength: { value: 25, message: "Limite de 25 caracteres." } })} />
                            {errors.tipo && <Form.Text className="invalid-feedback">{errors.tipo.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Porte</Form.Label>
                            <Form.Control type="text" className={errors.porte && "is-invalid"} {...register("porte", { required: "Campo obrigatório.", maxLength: { value: 25, message: "Limite de 25 caracteres." } })} />
                            {errors.porte && <Form.Text className="invalid-feedback">{errors.porte.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type="date" className={errors.dataNasc && "is-invalid"} {...register("dataNasc", { required: "Campo obrigatório.", maxLength: { value: 25, message: "Limite de 25 caracteres." } })} />
                            {errors.dataNasc && <Form.Text className="invalid-feedback">{errors.dataNasc.message}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cliente ID</Form.Label>
                            <Form.Control type="text" className={errors.clienteId && "is-invalid"} {...register("clienteId", { required: "Campo obrigatório.", maxLength: { value: 25, message: "Limite de 25 caracteres." } })} />
                            {errors.clienteId && <Form.Text className="invalid-feedback">{errors.clienteId.message}</Form.Text>}


                        </Form.Group>


                        <div className="d-flex justify-content-end">
                            <Button variant="primary" type="submit" className="ml-auto">
                                Cadastrar
                            </Button>
                        </div> 
                    </Form>
                </Col>
            </Row>

        </div>
    );
}
