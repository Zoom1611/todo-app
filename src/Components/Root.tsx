import { Link, Outlet } from "react-router-dom";
import NotesIcon from "../Media/Icons/NotesIcon";
import AddIcon from "../Media/Icons/AddIcon";
import { motion } from "framer-motion";
import { useState } from "react";

const Root = () => {
  const [showNotesListText, setShowNotesListText] = useState(false);
  const [showCreateNoteText, setShowCreateNoteText] = useState(false);

  return (
    <>
      <div className="w-full h-32 py-7 flex justify-between items-center px-20 bg-[#1D2327] rounded-b-3xl border-2 border-[#2b3238]">
        <Link to="/">
          <motion.div
            className="relative p-5 rounded-full border-2 border-[#2b3238] hover:bg-[#353E43]"
            onMouseEnter={() => setShowNotesListText(true)}
            onMouseLeave={() => setShowNotesListText(false)}
            whileHover={{ scale: 1.1 }}
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            transition={{ type: "tween" }}
          >
            <NotesIcon />
            {showNotesListText ? (
              <motion.div
                className="absolute top-1/2 w-max left-20 transform -translate-y-1/2 text-lg text-[#FFFAF0]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Notes
              </motion.div>
            ) : null}
          </motion.div>
        </Link>
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="text-xlg">Notify</div>
          <div className="text-sm text-[#FFC440]">
            Stay Organized, Notify Your Ideas!
          </div>
        </motion.div>
        <Link to="/create">
          <motion.div
            className="bg-[#42c773] p-5 rounded-full border-[#2b3238] hover:bg-[#25C38A]"
            onMouseEnter={() => setShowCreateNoteText(true)}
            onMouseLeave={() => setShowCreateNoteText(false)}
            whileHover={{ scale: 1.1 }}
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            transition={{ type: "tween" }}
          >
            <AddIcon />
            {showCreateNoteText ? (
              <motion.div
                className="absolute top-1/2 w-max right-20 transform -translate-y-1/2 text-lg text-[#FFFAF0]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Create Note
              </motion.div>
            ) : null}
          </motion.div>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Root;
