import * as React from 'react';
import {Nav, NavDropdown} from 'react-bootstrap';

export default function NavbarAdmin() {
    return (
        <Nav className="NavBar" activeKey="1" justify={true}>
            <Nav.Item>
                <Nav.Link eventKey="1" href="/">
                    Accueil Site
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="1" href="/Admin?page=membres">
                    Gestion des membres
                </Nav.Link>
            </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/Admin?page=articles">
                Gestion des articles
            </Nav.Link>
        </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/Admin?page=photos">
                    Gestion des photos
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/Admin?page=produits">
                    Gestion des produits
                </Nav.Link>
            </Nav.Item>
</Nav>

    );
}
