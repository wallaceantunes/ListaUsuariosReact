import React, { useState, useContext } from 'react';
import './Login.css';
import {Container, Row, Col, Button, Card, Form} from 'react-bootstrap';
import {login} from '../../../api/loginApi'
import SweetAlert from 'sweetalert2-react';
import {storeContext} from '../../../store/store'
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory()
  const [, setJwt] = useContext(storeContext)
  const [show, setShow] = useState(false)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const logar = async () =>{
    try {
      const resp = await login(user, password)
      setJwt(resp.data.token);
      history.push('/lista')
    } catch (error) {
      setShow(true)
    } 
  }

  return (
      <div className="login">
        <Container className="align-self-center">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Card className="card-login">
                <Card.Body>
                  <Card.Title className="text-center"><h4>Fazer login</h4></Card.Title>
                  <hr />
                    <Form>
                      <Form.Group controlId="userLogin">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control type="text" value={user} onChange={(ev)=>setUser(ev.target.value)}/>
                      </Form.Group>
                      <Form.Group controlId="passwordLogin">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" value={password} onChange={(ev)=>setPassword(ev.target.value)}/>
                      </Form.Group>
                      <Button variant="primary" block onClick={() => logar()}>Entrar</Button>
                    </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <SweetAlert
          show={show}
          title="Error"
          text="Usuário não encontrado"
          confirmButtonColor="#d33"
          onConfirm={() =>setShow(false)}
        />
      </div>
  );
}

export default Login;
