import React, { useEffect, useState } from 'react';
import './List.css';
import { Navbar, Container, Col, Table, Button, Card, Form } from 'react-bootstrap';
import SweetAlert from 'sweetalert2-react';
import { getClients, deleteClient } from '../../../api/clientApi'
import { useHistory } from 'react-router-dom';

function List() {
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [clients, setClients] = useState([])
    const getC = async () => {
        try {
            const resp = await getClients()
            setClients(resp.data.clients)
        } catch (error) {
            setShow(true)
        }
    }

    const deleteC = async (id) => {
        try {
            await deleteClient(id)
            getC()
        } catch (error) {
            setShow(true)
        }
    }
    useEffect(() => {
        getC()
    }, [])
    return (
        <div className="list">
            <Navbar className="border-navbar" bg="light">
                <Navbar.Brand>
                    <img src="zukk-logo.png" alt="logo" />
                </Navbar.Brand>
            </Navbar>
            <Container>
                <Card className="card-list">
                    <br />
                    <Container>
                        <Form>
                            <Form.Row>
                                <Col md={3}>
                                    <Form.Group controlId="searchName">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="searchEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="searchPhone">
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={3}>
                                    <Form.Group controlId="searchEndereco">
                                        <Form.Label>Endereço</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="searchBairro">
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="searchCidade">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="searchUf">
                                        <Form.Label>UF</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={{ span: 2, offset: 10 }}>
                                    <Button variant="primary" block>Buscar</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Container>
                    <br />
                </Card>
                <br />
                <Table responsive bordered variant="light">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Bairro</th>
                            <th>Cidade - UF</th>
                            <th className="text-center" colSpan="2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) =>( <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.address.address}</td>
                            <td>{client.address.neighborhood}</td>
                            <td>{client.address.city} - {client.address.uf.toUpperCase()}</td>
                            <td><Button variant="warning" onClick={() => history.push({pathname: '/editar', state: {client}})}>E</Button></td>
                            <td><Button variant="danger" onClick={() => deleteC(client.id)}>R</Button></td>
                        </tr>))}
                    </tbody>
                </Table>
                <div className="btn-footer">
                    <Button className="btn-round" variant="primary" size="lg" onClick={() => history.push('/cadastrar')}>+</Button>
                </div>
            </Container>
            <SweetAlert
                show={show}
                title="Error"
                text="Erro interno"
                confirmButtonColor="#d33"
                onConfirm={() => setShow(false)}
            />
        </div>
    );
}

export default List;
