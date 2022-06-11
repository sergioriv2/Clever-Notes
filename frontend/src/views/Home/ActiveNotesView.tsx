import React, { MutableRefObject, useRef, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import NoteForm from "../../components/Form/NoteForm";
import NotesList from "../../components/Note/NotesList";

import AppContext from "../../components/context/AppContext";
import useFetch from "../../hooks/useFetch";
import { FormikProps } from "formik";

const ActiveNotesView = () => {
  const [modal, setModal] = useState(false);

  const [selectedNote, setSelectedNote] = useState(undefined);
  const [edit, setEdit] = useState(false);

  const { data, loading, refetch } = useFetch(
    `${process.env.REACT_APP_NOTES_ENDPOINT}`
  );

  const handleClick = () => {
    setSelectedNote(undefined);
    setModal(!modal);
    setEdit(false);
  };

  return (
    <AppContext.Provider
      value={{
        refetchNotes: refetch,
        selectedNote,
        setSelectedNote,
        setEdit,
        setModal,
      }}
    >
      <Container>
        <Row>
          <Col xs={12} sm={4} lg={3} className="d-flex align-items-center">
            <h2>My Notes</h2>
          </Col>
          <Col xs={12} sm={8} className="my-2">
            <Container fluid style={{ padding: "0" }}>
              <Row>
                <Col xxl={2} xl={3} md={4} sm={6} xs={6}>
                  <Button onClick={() => handleClick()}>Create note</Button>
                </Col>
                <Col
                  xxl={10}
                  xl={9}
                  md={8}
                  sm={6}
                  xs={6}
                  className="d-flex align-items-center"
                >
                  <Link to="/archived">Archived notes</Link>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <NotesList data={data} loading={loading}></NotesList>
        </Row>
        <Modal show={modal} onHide={handleClick} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Create | Edit Note</Modal.Title>
          </Modal.Header>
          <Modal.Body className="my-2">
            <Container>
              <NoteForm edit={edit} values={selectedNote} />
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
    </AppContext.Provider>
  );
};

export default ActiveNotesView;
