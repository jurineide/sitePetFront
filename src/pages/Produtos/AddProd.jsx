import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./AddProd.css";
import Img from "../../assets/soul-pet-logo.svg";


export function AddProduto() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        axios
            .post("http://localhost:3001/produtos", data)
            .then((response) => {
                toast.success("Produto adicionado com sucesso!", {
                    position: "bottom-right",
                    duration: 2500,
                });
                navigate("/produtos");
            })
            .catch((error) => {
                toast.error("Não foi possível adicionar um novo Produto.", {
                    position: "bottom-left",
                    duration: 3000,
                });
                console.log(error);
            });
    }

    return (
        <div className="container-form">
            <Row>
            <Col xs={5} className="mt-30">
                    <img className="img-form col-md-10 " src={Img} alt="LOGO" />
                </Col>

                <Col>
                    <h1>Novo Produto</h1>
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
                                Cadastrar
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
