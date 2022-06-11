import NoteButton from "../NoteButton";
import { useContext } from "react";
import NoteContext from "../../context/NoteContext";
import Swal from "sweetalert2";
import AppContext from "../../context/AppContext";

const ArchiveButton = ({ unarchive = false }: { unarchive?: boolean }) => {
  const { id } = useContext(NoteContext);
  const { refetchNotes } = useContext(AppContext);

  const archiveNote = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Archive note?",
      icon: "question",
      confirmButtonText: "Confirm",
    });

    if (isConfirmed) {
      try {
        await fetch(
          `${process.env.REACT_APP_NOTES_ENDPOINT}${id}/archive/true`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
          }
        );

        Swal.fire({
          title: "Archived",
          text: "Note archived successfully.",
          icon: "success",
        });

        refetchNotes();
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "There was an error processing your request, try again later.",
          icon: "error",
        });
      }
    }
  };

  const unarchiveNote = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Unarchive note?",
      icon: "question",
      confirmButtonText: "Confirm",
    });

    if (isConfirmed) {
      try {
        await fetch(
          `${process.env.REACT_APP_NOTES_ENDPOINT}${id}/archive/false`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
          }
        );

        Swal.fire({
          title: "Unarchived",
          text: "Note unarchived successfully.",
          icon: "success",
        });

        refetchNotes();
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "There was an error processing your request, try again later.",
          icon: "error",
        });
      }
    }
  };

  return (
    <NoteButton
      icon={!unarchive ? "box-archive" : "upload"}
      handleClick={!unarchive ? archiveNote : unarchiveNote}
    ></NoteButton>
  );
};

export default ArchiveButton;
