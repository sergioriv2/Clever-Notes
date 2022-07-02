import { useContext, useState } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import AppContext from "../context/AppContext";
import NoteForm from "../Form/NoteForm";
import CategoryContext from "../context/CategoryContext";

interface CategoryValues {
  id: number;
  description: string;
}

const NoteModal = () => {
  const { modal, setModal, edit, selectedNote } = useContext(AppContext);

  const [categories, setCategories] = useState<CategoryValues[]>([]);

  const handleClick = () => {
    setModal(!modal);
  };

  return (
    <Modal
      show={modal}
      onHide={handleClick}
      centered
      size="lg"
      className="p-xs-0"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create | Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body className="my-2">
        <CategoryContext.Provider
          value={{
            categories,
            setCategories,
          }}
        >
          <Container>
            <Row>
              <Col>
                <NoteForm edit={edit} values={selectedNote} />
              </Col>
            </Row>
          </Container>
        </CategoryContext.Provider>
      </Modal.Body>
    </Modal>
  );
};

export default NoteModal;
