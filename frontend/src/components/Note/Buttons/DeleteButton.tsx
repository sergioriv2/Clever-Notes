import NoteButton from "../NoteButton";
import { useContext } from "react";
import NoteContext from "../../context/NoteContext";
import Swal from "sweetalert2";
import AppContext from "../../context/AppContext";

const DeleteButton = () => {
  const { id } = useContext(NoteContext);
  const { refetchNotes } = useContext(AppContext);

  const handleClick = async () => {
    const { isConfirmed } = await Swal.fire({
      icon: "warning",
      title: "Deletion",
      text: "Are you sure you want to delete this note?",
      confirmButtonText: "Delete",
    });

    if (isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_NOTES_ENDPOINT}${id}`,
          {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: data.results.msg,
        });

        refetchNotes();
      } catch (err) {
        console.log(err);

        Swal.fire({
          title: "Error",
          text: "There was an error processing your request, try again later.",
          icon: "error",
        });
      }
    }
  };

  return <NoteButton icon="trash" handleClick={handleClick}></NoteButton>;
};

export default DeleteButton;
