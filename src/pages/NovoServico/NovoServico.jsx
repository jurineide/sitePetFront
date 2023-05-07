import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/soul-pet-logo.svg";
import { Button, Col, Form, Row } from "react-bootstrap";

export function NovoServico() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:3001/servicos", data)
            .then(response => {
                toast.success("Serviço adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/servicos");
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
                    <h1>Serviços</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="nomeServico">
                            <Form.Label>Nome do Serviço</Form.Label>
                            <Form.Control
                                type="text"
                                className={errors.nome ? "is-invalid" : ""}
                                {...register("nome", {
                                    required: "O nome do serviço é obrigatório.",
                                })}
                            />
                            {errors.nome && (
                                <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="precoServico">
                            <Form.Label>Preço do Serviço</Form.Label>
                            <Form.Control
                                type="text"
                                className={errors.preco ? "is-invalid" : ""}
                                {...register("preco", {
                                    required: "O preço do serviço é obrigatório.",
                                })}
                            />
                            {errors.preco && (
                                <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>
                            )}
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="primary" type="submit" className="ml-auto">
                                Cadastrar
                            </Button>
                        </div> 
                    </Form></Col>
            </Row>

        </div>
    );
}
