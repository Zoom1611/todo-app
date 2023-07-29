import { useEffect, useState } from "react";
import { NoteInterface } from "../Services/NotesProvider";
import useNotes from "../Hooks/useNotes";
import ReactMarkdown from "react-markdown";
import { htmlToMarkdown } from "./TextAreaParser";
import { motion } from "framer-motion";

const NotePreview = () => {
  const { notes } = useNotes();
  const [notePreview, setNotePreview] = useState<NoteInterface | null>();

  useEffect(() => {
    const pathName = window.location.pathname;
    const noteId = pathName.substring("/preview/".length);

    notes.find((note) => {
      if (note.id === noteId) setNotePreview(note);
    });

    const divElement = document.querySelector(".ql-container .ql-snow");
    if (divElement) {
      divElement.classList.add("scrollbar");
    }
  }, []);

  useEffect(() => {
    if (notePreview) {
    }
  }, [notePreview]);

  return (
    <motion.div
      className="px-20 h-[calc(100vh-128px)] w-full overflow-y-auto scrollbar pb-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
    >
      <div className="bg-primary-100 sticky top-0 pt-5">
        <div className="text-2xlg text-orange-100 sticky top-0">
          {notePreview?.title}
        </div>
        <div className="h-px bg-primary-300 mb-5 sticky top-0"></div>
      </div>
      <ReactMarkdown>
        {htmlToMarkdown(notePreview?.description ?? "")}
      </ReactMarkdown>
    </motion.div>
  );
};

export default NotePreview;
