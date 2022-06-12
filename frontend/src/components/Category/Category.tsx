import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RemoveCategoryButton from "./RemoveCategoryButton";

interface CategoryValues {
  id: number;
  description: string;
}

interface CategoryProps {
  category: CategoryValues;
  dbCategories: object[];
  setUserSelect: React.Dispatch<React.SetStateAction<CategoryValues[]>>;
  userSelect: CategoryValues[];
}

const Category = (props: CategoryProps) => {
  const { category, dbCategories, setUserSelect, userSelect } = props;

  const [active, setActive] = useState(false);

  useEffect(() => {
    const result = dbCategories.some((item: any) => {
      return category.id === item.id;
    });
    setActive(result);
  }, [dbCategories, category]);

  const handleChange = () => {
    setActive(!active);

    if (!active) {
      setUserSelect((oldValues: CategoryValues[]) => [...oldValues, category]);
    } else {
      setUserSelect(userSelect.filter((v) => v.id !== category.id));
    }
  };

  return (
    <Container as={"li"} fluid>
      <Row className={`my-2 py-1 categoryItem`}>
        <Col
          xs={1}
          className="d-flex align-items-center justify-content-center"
        >
          <FontAwesomeIcon icon="tag"></FontAwesomeIcon>
        </Col>
        <Col className="d-flex align-items-center">
          <p className="m-0">{category.description}</p>
        </Col>
        <Col className="d-flex align-items-center" xs={1}>
          <input
            type="checkbox"
            name={category.description}
            checked={active}
            onChange={handleChange}
          />
        </Col>
        <Col className="d-flex align-items-center" xs={1}>
          <RemoveCategoryButton categoryId={category.id} />
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
