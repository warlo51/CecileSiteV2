import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";

export default function NavBar() {
    const [fix,setFix] = useState(false);
    const [tailleEcran, setTailleEcran] = useState(0);
    function setFixed(){

        if(window.scrollY >=300){
            setFix(true);
        }else{
            setFix(false);
        }
    }

    useEffect(() => {
        setTailleEcran(window.innerWidth);
        window.addEventListener("scroll",setFixed);
    }, []);

    return (
        <Navbar expand="lg" className={fix && tailleEcran >= 1024 ? "NavBar fixed" : "NavBar"} >
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Accueil</Nav.Link>
                        <NavDropdown title="Prestations" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Yogatherapie">Yogathérapie</NavDropdown.Item>
                            <NavDropdown.Item href="/Massages">Massages</NavDropdown.Item>
                            <NavDropdown.Item href="/boiteaoutils">Boite à outils</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/Actualites">Actualites</Nav.Link>
                        <Nav.Link href="/Contact">Contact</Nav.Link>
                        <Nav.Link href="/api/auth/login">Espace Membres</Nav.Link>
                        <Nav.Link href="/api/auth/logout">Deconnexion</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

