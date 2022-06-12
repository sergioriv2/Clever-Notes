import React, { useRef, useState, useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NotesList from "../../components/Note/NotesList";

import AppContext from "../../components/context/AppContext";
import useFetch from "../../hooks/useFetch";
import NoteModal from "../../components/Modal/NoteModal";
import Filter from "../../components/Filter/Filter";
import LoginContext from "../../components/context/LoginContext";
import { Navigate } from "react-router-dom";

const ActiveNotesView = () => {
  const [modal, setModal] = useState(false);

  const [selectedNote, setSelectedNote] = useState(undefined);
  const [edit, setEdit] = useState(false);
  const { storedValue } = useContext(LoginContext);

  const { data, loading, refetch, setEndpoint } = useFetch(
    `${process.env.REACT_APP_NOTES_ENDPOINT}`
  );

  const handleClick = () => {
    setSelectedNote(undefined);
    setModal(!modal);
    setEdit(false);
  };

  if (!storedValue) return <Navigate to="/register"></Navigate>;

  return (
    <AppContext.Provider
      value={{
        refetchNotes: refetch,
        selectedNote,
        setSelectedNote,
        edit,
        modal,
        setEdit,
        setModal,
      }}
    >
      <Container className="my-5">
        <Row>
          <Col xs={12} sm={4} lg={3} className="d-flex align-items-center">
            <h2>My Notes</h2>
          </Col>
          <Col xs={12} sm={8} className="my-2">
            <Container fluid style={{ padding: "0" }}>
              <Row>
                <Col>
                  <Button
                    className="globalButton-secondary"
                    variant="danger"
                    onClick={() => handleClick()}
                  >
                    New Note
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col sm={12}>
            <Row className="my-3">
              <Col xs={12} sm={3} xl={2} className="d-flex align-items-center">
                <p className="m-0">Category filter</p>
              </Col>
              <Col xs={12} sm={6} xl={4}>
                <Filter setEndpoint={setEndpoint}></Filter>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <NotesList data={data} loading={loading}></NotesList>
        </Row>
        <NoteModal></NoteModal>
      </Container>
    </AppContext.Provider>
  );
};

export default ActiveNotesView;
