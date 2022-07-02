import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

interface FormValues {
  description: string;
}

const CategoryForm = ({ refetch }: { refetch: Function }) => {
  const [values, setValues] = useState("");

  const handleSubmit = async () => {
    const category: FormValues = {
      description: values,
    };

    try {
      await fetch(`${process.env.REACT_APP_CATEGORIES_ENDPOINT}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: JSON.stringify(category),
      });

      refetch();
      setValues("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="p-0">
      <Row>
        <Col xs={12} md={3}>
          <Button
            variant="danger"
            className="globalButton-secondary"
            onClick={() => handleSubmit()}
          >
            Add category
          </Button>
        </Col>
        <Col xs={12} md={9}>
          <Form.Control
            name="description"
            placeholder="New category..."
            onChange={(e) => {
              setValues(e.target.value);
            }}
            value={values}
          ></Form.Control>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryForm;
