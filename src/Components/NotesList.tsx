import useNotes from "../Hooks/useNotes";
import DeleteNoteIcon from "../Media/Icons/DeleteNoteIcon";
import EditNoteIcon from "../Media/Icons/EditNoteIcon";
import { motion, AnimatePresence } from "framer-motion";
import "../Style/scrollbar.css";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { htmlToMarkdown } from "./TextAreaParser";

const containerVariants = {
  hovered: {
    scale: 0.99,
  },
};

const titleVariants = {
  normal: {
    fontSize: "24px",
  },
  hovered: {
    fontSize: "42px",
  },
};

const NotesList = () => {
  const { notes, setNotes } = useNotes();

  const onDeleteNoteClick = (noteId: string) => {
    const index = notes.findIndex((item) => item.id === noteId);
    if (index !== -1) {
      const updatedItems = [...notes];
      updatedItems.splice(index, 1);
      setNotes(updatedItems);
    }
  };

  return (
    <div className="px-20 h-[calc(100vh-128px)] py-5 w-full overflow-y-auto scrollbar">
      {notes.length ? (
        <>
          <div className="w-full overflow-y-auto">
            <AnimatePresence>
              {notes
                .map((note) => {
                  return (
                    <motion.div
                      className="border border-primary-300 w-full h-full rounded-2xl px-10 py-4 mb-2.5 hover:bg-primary-400 cursor-pointer flex justify-between items-center"
                      key={note.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      variants={containerVariants}
                      whileHover="hovered"
                      exit={{ scale: 0, originZ: 0 }}
                    >
                      <Link to={`/preview/${note.id}`} className="w-full">
                        <div className="group w-full overflow-hidden text-ellipsis">
                          <motion.div
                            className="overflow-hidden whitespace-nowrap text-ellipsis text-lg font-medium text-orange-100 mb-2.5"
                            initial={{
                              fontSize: "38px",
                            }}
                            animate={{ maxWidth: "1100px" }}
                            variants={titleVariants}
                          >
                            {note.title}
                          </motion.div>
                          <div className="text-md pr-10 mb-2.5 text-neutral-800 overflow-hidden max-h-20">
                            <ReactMarkdown>
                              {htmlToMarkdown(note?.description ?? "")}
                            </ReactMarkdown>
                          </div>
                          <div className="text-sm text-neutral-400">
                            <span>
                              Created:{" "}
                              {DateTime.fromJSDate(note.date).toFormat(
                                "dd.MM.yyyy"
                              )}
                            </span>
                            {note.edited ? (
                              <span className="ml-5">
                                Edited:{" "}
                                {DateTime.fromJSDate(note?.edited).toFormat(
                                  "dd.MM.yyyy"
                                )}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                      <div className="flex gap-2">
                        <div className="group">
                          <Link to={`/edit/${note.id}`}>
                            <button className="group-hover:[&>svg>path]:fill-orange-100 p-2 hover:bg-primary-400">
                              <EditNoteIcon />
                            </button>
                          </Link>
                        </div>
                        <div className="group">
                          <button
                            className="group-hover:[&>svg>path]:fill-red-500 p-2"
                            onClick={() => onDeleteNoteClick(note.id)}
                          >
                            <DeleteNoteIcon />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
                .reverse()}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div className="relative top-1/4">
          <motion.div
            className="text-[50px]"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
          >
            Never Forget a Thought, Capture Ideas with Ease!
          </motion.div>
          <motion.div
            className="mt-10 text-lg text-orange-100"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              delay: 0.7,
              duration: 1,
            }}
          >
            Start Creating Notes, Organizing Thoughts, and Never Miss an Idea
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NotesList;
