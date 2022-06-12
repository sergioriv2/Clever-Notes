import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

interface CategoryValues {
  id: number;
  description: string;
}

const Filter = ({
  setEndpoint,
}: {
  setEndpoint: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useFetch(`${process.env.REACT_APP_CATEGORIES_ENDPOINT}`);
  const [selectedCategory, setSelectedCategory] = useState<any>("none");

  const handleChange = (value: string) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    if (selectedCategory === "none") {
      setEndpoint(`${process.env.REACT_APP_NOTES_ENDPOINT}`);
      //   console.log(process.env.REACT_APP_NOTES_ENDPOINT);
    } else {
      setEndpoint(
        `${process.env.REACT_APP_NOTESCATEGORIES_ENDPOINT}category/${selectedCategory}`
      );
    }
  }, [selectedCategory, setEndpoint]);

  return (
    <Form.Select
      value={selectedCategory}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option value="none">Select a category</option>
      {data.map((el: CategoryValues) => (
        <option value={el.id} key={el.id}>
          {el.description}
        </option>
      ))}
    </Form.Select>
  );
};

export default Filter;
