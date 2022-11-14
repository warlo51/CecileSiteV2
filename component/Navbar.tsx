import * as React from 'react';
import {Nav, NavDropdown} from 'react-bootstrap';

export default function Navbar() {
    return (
        <Nav className="NavBar" activeKey="1" justify={true}>
            <Nav.Item>
                <Nav.Link eventKey="1" href="/">
                    Accueil
                </Nav.Link>
            </Nav.Item>
        <Nav.Item>
            <NavDropdown title="Prestations" id="nav-dropdown" >
                <NavDropdown.Item href={"/Yogatherapie"}>Yogathérapie</NavDropdown.Item>
                <NavDropdown.Item href={"/Massages"}>Massages</NavDropdown.Item>
                <NavDropdown.Item href={"/boiteaoutils"}>Boite à outils</NavDropdown.Item>
            </NavDropdown>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href={"/Actualites"}>
                Actualités
            </Nav.Link>
        </Nav.Item>
            <Nav.Item>
                <Nav.Link href={"/Contact"}>
                    Contact
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href={"/Membres"}>
                    Espace Membres
                </Nav.Link>
            </Nav.Item>
</Nav>

    );
}
