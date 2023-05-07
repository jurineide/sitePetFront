import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css"
import Img from "../../assets/soul-pet-logo.svg";


export function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get("http://localhost:3001/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <Container>
      <div className="container-img">
                <img className="img-bg col-md-10 " src={Img} alt="LOGO" />
            </div>
      <h1 className="titulo">Análise de controle</h1><hr/>
      <div className="d-flex justify-content-around">
      <Row>
        <Col>
          <Card className="card">
            <Card.Body className="body">
              <Card.Title>Clientes cadastrados</Card.Title>
              <Card.Title>{dashboardData?.totalCliente}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card">
            <Card.Body className="body">
              <Card.Title>Pets cadastrados</Card.Title>
              <Card.Title>{dashboardData?.totalPet}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card">
            <Card.Body className="body">
              <Card.Title>Produtos cadastrados</Card.Title>
              <Card.Title>{dashboardData?.totalProduto}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card">
            <Card.Body className="body">
              <Card.Title>Serviços cadastrados</Card.Title>
              <Card.Title>{dashboardData?.totalServico}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card">
            <Card.Body className="body">
              <Card.Title>Agendamentos realizados</Card.Title>
              <Card.Title>{dashboardData?.totalAgendamento}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row> 
      </div>
    </Container> 
  );
}
