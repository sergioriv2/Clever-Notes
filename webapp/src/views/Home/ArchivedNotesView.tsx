import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppContext from "../../components/context/AppContext";
import NotesList from "../../components/Note/NotesList";
import useFetch from "../../hooks/useFetch";

const ArchivedNotesView = () => {
  const [modal, setModal] = useState(false);

  const { data, loading, refetch } = useFetch(
    `${process.env.REACT_APP_NOTES_ENDPOINT}archive`
  );
  return (
    <AppContext.Provider
      value={{
        refetchNotes: refetch,
        setSelectedNote: () => {},
        setModal: () => {},
      }}
    >
      <Container>
        <Row>
          <Col xs={12} sm={4} lg={3} className="d-flex align-items-center">
            <h2>My Archived Notes</h2>
          </Col>
          <Col xs={12} sm={8} className="my-2">
            <Container fluid style={{ padding: "0" }}>
              <Row>
                <Col className="d-flex align-items-center">
                  <Link to="/">Go back to unarchived notes</Link>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <NotesList loading={loading} data={data}></NotesList>
        </Row>
      </Container>
    </AppContext.Provider>
  );
};

export default ArchivedNotesView;
