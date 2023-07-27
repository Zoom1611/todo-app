import { useContext } from "react";
import NotesContext from "../Services/NotesProvider";

const useNotes = () => {
  return useContext(NotesContext);
};

export default useNotes;
