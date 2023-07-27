import NoteForm from "./NoteForm";
import { motion } from "framer-motion";

const CreateNote = () => {
  return (
    <motion.div
      className="px-20 h-[calc(100vh-128px)] py-5 w-full overflow-y-auto scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
    >
      <NoteForm />
    </motion.div>
  );
};

export default CreateNote;
