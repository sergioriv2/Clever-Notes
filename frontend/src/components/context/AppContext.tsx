import React from "react";

interface Note {
  id: number;
  title: string;
  content: string;
}

interface Values {
  selectedNote?: Note | undefined;
  edit?: boolean;
  modal?: boolean;
  setSelectedNote: Function;
  setModal: Function;
  refetchNotes: Function;
  setEdit: Function;
}

const AppContext = React.createContext<Values>({
  selectedNote: undefined,
  edit: false,
  modal: false,
  setSelectedNote: () => {},
  setModal: () => {},
  refetchNotes: () => {},
  setEdit: () => {},
});

export default AppContext;
