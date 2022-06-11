import NoteButton from "../NoteButton";
import { useContext } from "react";
import NoteContext from "../../context/NoteContext";
import Swal from "sweetalert2";
import AppContext from "../../context/AppContext";

const EditButton = () => {
  const { id } = useContext(NoteContext);
  const { setModal, setSelectedNote } = useContext(AppContext);

  const handleClick = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_NOTES_ENDPOINT}${id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      setSelectedNote(data.results);
      setModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return <NoteButton icon="pencil" handleClick={handleClick}></NoteButton>;
};

export default EditButton;
