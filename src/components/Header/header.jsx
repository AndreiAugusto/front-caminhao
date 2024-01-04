import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="md" >
      <Container>
        <Navbar.Brand href="/dashboard">Gestão de Caminhões</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/manutencao">Manutenções</Nav.Link>
            <Nav.Link href="/oficina">Oficinas</Nav.Link>
            <Nav.Link href="/caminhao">Caminhões</Nav.Link>
            <Nav.Link onClick={logout}>Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
