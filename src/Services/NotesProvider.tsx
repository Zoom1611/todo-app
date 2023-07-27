import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface NotesContextValueInterface {
  notes: NoteInterface[];
  setNotes: Dispatch<SetStateAction<NoteInterface[]>>;
}

export interface NoteInterface {
  title: string;
  description: string;
  date: Date;
  id: string;
  edited: Date | null;
}

interface NotesProviderPropsInterface {
  children: React.ReactNode;
}

const NotesContext = createContext<NotesContextValueInterface>({
  notes: [],
  setNotes: () => {},
});

export const NotesProvider = ({ children }: NotesProviderPropsInterface) => {
  const [notes, setNotes] = useState<NoteInterface[]>(() => {
    // Retrieve notes from Local Storage when the component mounts
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      // we need to do this because we get strigified data from local storage on first render
      // this is a problem because our dates are in Date format and we need them as that, not as a string
      const parsedNotes: NoteInterface[] = JSON.parse(storedNotes).map(
        (note: NoteInterface) => ({
          ...note,
          date: new Date(note.date),
          edited: note.edited ? new Date(note.edited) : null,
        })
      );
      setNotes(parsedNotes);
    }
  }, []);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
