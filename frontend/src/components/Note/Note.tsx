import moment from "moment";
import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import ArchiveButton from "./Buttons/ArchiveButton";

import NoteContext from "../context/NoteContext";
import EditButton from "./Buttons/EditButton";

import "./Note.css";
import DeleteButton from "./Buttons/DeleteButton";

interface NoteDefinition {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteProps {
  note: NoteDefinition;
}

const Note = (props: NoteProps) => {
  const { note } = props;
  const location = useLocation();

  console.log();

  return (
    <NoteContext.Provider
      value={{
        ...note,
      }}
    >
      <Container
        className="noteContainer d-flex flex-column justify-content-center p-4"
        fluid
      >
        <Row>
          <Col xs={12} className="noteTitle mb-3">
            {note.title}
          </Col>

          <Col xs={8} className="d-flex justify-items-end">
            <p className="m-0">{`Last edit on ${moment(note.updatedAt).format(
              "DD/MM/YYYY"
            )}`}</p>
          </Col>
          <Col xs={4} className="d-flex align-items-end">
            <Container className="p-0 d-flex justify-content-end">
              {location.pathname.split("/")[1] !== "archived" ? (
                <ArchiveButton></ArchiveButton>
              ) : (
                <ArchiveButton unarchive></ArchiveButton>
              )}
              <EditButton></EditButton>
              <DeleteButton></DeleteButton>
            </Container>
          </Col>
        </Row>
      </Container>
    </NoteContext.Provider>
  );
};

export default Note;
