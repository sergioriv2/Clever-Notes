import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

const RemoveCategoryButton = ({ categoryId }: { categoryId: number }) => {
  const handleClick = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Remove category",
      text: "Remove this category from the note?",
      icon: "question",
      confirmButtonText: "Yes, remove it",
    });

    if (isConfirmed) {
      await fetch(`${process.env.REACT_APP_CATEGORIES_ENDPOINT}${categoryId}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });
    }
  };

  return (
    <div className="rmCategoryButton" onClick={() => handleClick()}>
      <FontAwesomeIcon icon="xmark"></FontAwesomeIcon>
    </div>
  );
};

export default RemoveCategoryButton;
