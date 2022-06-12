import { useContext, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

import CategoryForm from "../Form/CategoryForm";
import Category from "./Category";
import AppContext from "../context/AppContext";

import "./Category.css";
import CategoryContext from "../context/CategoryContext";

interface CategoryValues {
  id: number;
  description: string;
}

const CategoryList = () => {
  const { selectedNote } = useContext(AppContext);

  const { data, loading, refetch } = useFetch(
    `${process.env.REACT_APP_CATEGORIES_ENDPOINT}`
  );
  const { data: dbCategories } = useFetch(
    `${process.env.REACT_APP_NOTESCATEGORIES_ENDPOINT}note/${selectedNote?.id}`
  );

  const { setCategories, categories } = useContext(CategoryContext);

  return (
    <Container>
      <Row className="mb-3">
        <Col xs={12} md={3}>
          Categories
        </Col>
        <Col xs={12} md={9}>
          <ul
            style={{ listStyle: "none" }}
            className="px-1 py-2 m-0 categoriesListContainer"
          >
            {loading ? (
              <Spinner animation="grow" className="m-auto d-flex"></Spinner>
            ) : (
              data.map((data: CategoryValues) => (
                <Category
                  category={data}
                  key={data.id}
                  dbCategories={dbCategories}
                  setUserSelect={setCategories}
                  userSelect={categories}
                ></Category>
              ))
            )}
          </ul>
        </Col>
      </Row>
      <CategoryForm refetch={refetch}></CategoryForm>
    </Container>
  );
};

export default CategoryList;
