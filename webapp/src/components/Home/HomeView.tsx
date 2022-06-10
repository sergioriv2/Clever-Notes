import React from 'react';
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import {Link} from 'react-router-dom'
import NoteForm from '../Form/NoteForm';

const HomeView = () => {

    const handleClick = () => {

    }

    return (
        <Container>
            <Row>
                <Col xs={12} sm={4} lg={3} className="d-flex align-items-center">
                    <h2>My Notes</h2>
                </Col>
                <Col xs={12} sm={8} className="my-2">
                    <Container fluid style={{padding: '0'}} >
                        <Row>
                            <Col xxl={2} xl={3} md={4} sm={6} xs={6}>
                                <Button onClick={()=> handleClick()}>Create note</Button>
                            </Col>
                            <Col xxl={10} xl={9} md={8} sm={6} xs={6} className="d-flex align-items-center">
                                <Link to="/">Archived notes</Link>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <NoteForm></NoteForm>
            </Row>
        </Container>
    )
}

export default HomeView;