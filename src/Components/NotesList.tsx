import useNotes from "../Hooks/useNotes";
import DeleteNoteIcon from "../Media/Icons/DeleteNoteIcon";
import EditNoteIcon from "../Media/Icons/EditNoteIcon";
import { motion, AnimatePresence } from "framer-motion";
import "../Style/scrollbar.css";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

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
    fontSize: "38px",
  },
};

const NotesList = () => {
  const { notes, setNotes } = useNotes();

  console.log({ notes });

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
                      className="border border-[#2b3238] w-full h-full rounded-2xl px-10 py-4 mb-2.5 hover:bg-[#353E43] cursor-pointer flex justify-between items-center"
                      key={note.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      variants={containerVariants}
                      whileHover="hovered"
                      exit={{ scale: 0, originZ: 0 }}
                    >
                      <div className="group w-full overflow-hidden text-ellipsis">
                        <motion.div
                          className=" text-lg font-medium text-[#FFC440] mb-2.5"
                          initial={{ fontSize: "28px" }}
                          variants={titleVariants}
                          style={{ margin: 0 }}
                        >
                          {note.title}
                        </motion.div>
                        <div className="text-md pr-10 mb-2.5 text-neutral-200 whitespace-nowrap overflow-hidden text-ellipsis">
                          {note.description}
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
                      <div className="flex gap-2">
                        <div className="group">
                          <Link to={`/edit/${note.id}`}>
                            <button className="group-hover:[&>svg>path]:fill-[#FFC440] p-2 hover:bg-[#353E43]">
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
            className="mt-10 text-lg text-[#FFC440]"
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
