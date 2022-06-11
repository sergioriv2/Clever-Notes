import React from "react";

interface Note {
  id: number;
  title: string;
  content: string;
}

interface Values {
  selectedNote?: Note | undefined;
  setSelectedNote: Function;
  setModal: Function;
  refetchNotes: Function;
}

const AppContext = React.createContext<Values>({
  selectedNote: undefined,
  setSelectedNote: () => {},
  setModal: () => {},
  refetchNotes: () => {},
});

export default AppContext;
