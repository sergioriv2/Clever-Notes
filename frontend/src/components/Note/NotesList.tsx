import React from "react";

import { Col, Container, Row, Spinner } from "react-bootstrap";
import Filter from "../Filter/Filter";
import Note from "./Note";

interface NoteDefinition {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NotesListProps {
  data: NoteDefinition[] | [];
  loading: boolean;
}

const NotesList = (props: NotesListProps) => {
  const { loading, data } = props;

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        {data.map((note: NoteDefinition) => (
          <Col lg={4} xs={12} md={6} className="my-3" key={note.id}>
            <Note note={note}></Note>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NotesList;
