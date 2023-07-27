import { useEffect, useState } from "react";
import useNotes from "../Hooks/useNotes";
import { NoteInterface } from "../Services/NotesProvider";
import NoteForm from "./NoteForm";
import { motion } from "framer-motion";

const EditNote = () => {
  const { notes } = useNotes();
  const [editNote, setEditNote] = useState<NoteInterface | null>(null);

  useEffect(() => {
    const pathName = window.location.pathname;
    const noteId = pathName.substring("/edit/".length);

    notes.find((note) => {
      if (note.id === noteId) setEditNote(note);
    });
  }, []);

  return (
    <motion.div
      className="px-20 h-[calc(100vh-128px)] py-5 w-full overflow-y-auto scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
    >
      <NoteForm editNote={editNote} />
    </motion.div>
  );
};

export default EditNote;
