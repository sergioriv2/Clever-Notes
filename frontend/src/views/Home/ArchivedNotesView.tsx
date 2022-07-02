import React, { useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import AppContext from "../../components/context/AppContext";
import NotesList from "../../components/Note/NotesList";
import useFetch from "../../hooks/useFetch";
import LoginContext from "../../components/context/LoginContext";
import NoteModal from "../../components/Modal/NoteModal";

const ArchivedNotesView = () => {
  const [modal, setModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(undefined);
  const { storedValue } = useContext(LoginContext);

  const { data, loading, refetch } = useFetch(
    `${process.env.REACT_APP_NOTES_ENDPOINT}archive`
  );

  if (!storedValue) return <Navigate to="/register"></Navigate>;

  return (
    <AppContext.Provider
      value={{
        refetchNotes: refetch,
        selectedNote,
        setSelectedNote,
        modal,
        setModal,
        edit: true,
        setEdit: () => {},
      }}
    >
      <Container className="my-5">
        <Row>
          <Col className="d-flex align-items-center">
            <h2>My Archived Notes</h2>
          </Col>
        </Row>
        <Row>
          <NotesList loading={loading} data={data}></NotesList>
        </Row>
        <NoteModal></NoteModal>
      </Container>
    </AppContext.Provider>
  );
};

export default ArchivedNotesView;
