import React, { useState, useEffect } from 'react';
import './Edit.css';
import { Navbar, Container, Col, Button, Form } from 'react-bootstrap';
import { editClient } from '../../../api/clientApi'
import { getCep } from '../../../api/cepApi'
import SweetAlert from 'sweetalert2-react';
import { useHistory } from 'react-router-dom';

function Edit(props) {
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [cep, setCep] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [addressStreet, setAddressStreet] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    useEffect(()=>{
        setName(props.location.state.client.name)
        setEmail(props.location.state.client.email)
        setPhone(props.location.state.client.phone)
        setAddressStreet(props.location.state.client.address.address)
        setNeighborhood(props.location.state.client.address.neighborhood)
        setCity(props.location.state.client.address.city)
        setUf(props.location.state.client.address.uf)
    }, [])
    const edit = async () => {
        try {
            const address = {
                address: addressStreet,
                neighborhood,
                city,
                uf
            }
            await editClient(props.location.state.client.id, name, email, phone, address)
            history.push('/lista')
        } catch (error) {
            setShow(true)
        }
    }
    const getAddrresByCep = async (cep) => {
        try {
            const resp = await getCep(cep)
            setAddressStreet(resp.data.logradouro)
            setNeighborhood(resp.data.bairro)
            setCity(resp.data.cidade.nome)
            setUf(resp.data.estado.sigla)
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        if(/^\d{5}\d{3}$/.test(cep)){
            getAddrresByCep(cep)
        }
    }, [cep])
    return (
        <div className="edit">
            <Navbar className="border-navbar" bg="light">
                <Navbar.Brand>
                    <img src="zukk-logo.png" alt="logo" />
                </Navbar.Brand>
            </Navbar>
            <Container fluid>
                <Form>
                    <Form.Row>
                        <Col md={4}>
                            <Form.Group controlId="name">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="phone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control type="text" value={phone} onChange={(ev) => setPhone(ev.target.value)} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col md={4}>
                            <Form.Group controlId="cep">
                                <Form.Label>Cep</Form.Label>
                                <Form.Control type="text" value={cep} onChange={(ev) => setCep(ev.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={8}>
                            <Form.Group controlId="endereco">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control type="text" value={addressStreet} onChange={(ev) => setAddressStreet(ev.target.value)} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col md={4}>
                            <Form.Group controlId="bairro">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control type="text" value={neighborhood} onChange={(ev) => setNeighborhood(ev.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="cidade">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control type="text" value={city} onChange={(ev) => setCity(ev.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="uf">
                                <Form.Label>UF</Form.Label>
                                <Form.Control type="text" value={uf} onChange={(ev) => setUf(ev.target.value)} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col md={{ span: 2, offset: 10 }}>
                            <Button variant="primary" block onClick={() => edit()}>Editar</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
            <SweetAlert
                show={show}
                title="Error"
                text="Usuário não encontrado"
                confirmButtonColor="#d33"
                onConfirm={() => setShow(false)}
            />
        </div>
    );
}

export default Edit;
