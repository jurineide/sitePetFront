import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Img from "../../assets/soul-pet-logo.svg";

export function EditarProd() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        axios.put(`http://localhost:3001/produto/${id}`, data)
            .then(response => {
                toast.success("Produto editado.", { position: "bottom-right", duration: 2000 });
                navigate("/produtos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/produtos/${id}`)
            .then(response => {
                const { nome, preco, descricao, desconto, dataDesconto, categoria } = response.data;
                reset({ nome, preco, descricao, desconto, dataDesconto, categoria });
            })
    }, [id, reset])

    return (
        <div className="container">
            <Row>
                <Col xs={5} className="mt-30">
                    <img className="img-form col-md-10 " src={Img} alt="LOGO" />
                </Col>
                <Col>
                    <h1>Editar Produtos</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                className={errors.nome && "is-invalid"}
                                {...register("nome", {
                                    required: "O nome do Produto é obrigatório.",
                                })}
                            />
                            {errors.nome && (
                                <Form.Text className="invalid-feedback">
                                    {errors.nome.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                type="text"
                                className={errors.preco && "is-invalid"}
                                {...register("preco", {
                                    required: "O produto deve conter um preço.",
                                })}
                            />
                            {errors.preco && (
                                <Form.Text className="invalid-feedback">
                                    {errors.preco.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                type="text"
                                className={errors.descricao && "is-invalid"}
                                {...register("descricao", {
                                    required: "A descrição do produto é obrigatória.",
                                    maxLength: {
                                        value: 150,
                                        message: "Limite de 150 caracteres.",
                                    },
                                })}
                            />
                            {errors.descricao && (
                                <Form.Text className="invalid-feedback">
                                    {errors.descricao.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Desconto</Form.Label>
                            <Form.Control
                                type="text"
                                className={errors.desconto && "is-invalid"}
                                {...register("desconto", {
                                    required: "Declare o desconto do produto.",
                                })}
                            />
                            {errors.desconto && (
                                <Form.Text className="invalid-feedback">
                                    {errors.desconto.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Data do Desconto</Form.Label>
                            <Form.Text className="text-muted">
                                (A data deve ser maior do que o dia atual)
                            </Form.Text>
                            <Form.Control
                                type="date"
                                className={errors.dataDesconto && "is-invalid"}
                                {...register("dataDesconto", {
                                    required: "É necessário informar a data do desconto.",
                                })}
                            />
                            {errors.dataDesconto && (
                                <Form.Text className="invalid-feedback">
                                    {errors.dataDesconto.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Text className="text-muted">
                                : Higiene, Brinquedos, Conforto, Alimentação, Medicamentos.
                            </Form.Text>
                            <Form.Control
                                type="text"
                                className={errors.categoria && "is-invalid"}
                                {...register("categoria", {
                                    required:
                                        "Informe uma categoria válida: Higiene, Brinquedos, Conforto, Alimentação, Medicamentos.",
                                })}
                            />
                            {errors.categoria && (
                                <Form.Text className="invalid-feedback">
                                    {errors.categoria.message}
                                </Form.Text>
                            )}
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