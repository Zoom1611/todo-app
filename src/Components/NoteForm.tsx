import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useNotes from "../Hooks/useNotes";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { NoteInterface } from "../Services/NotesProvider";

type NoteFormPropsType = {
  editNote?: NoteInterface | null;
};

const NoteForm = ({ editNote }: NoteFormPropsType) => {
  const navigate = useNavigate();
  const { notes, setNotes } = useNotes();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    if (editNote) {
      const updatedNotes = notes.map((note) => {
        if (note.id === editNote.id) {
          return { ...note, title, description, edited: new Date() };
        }
        return note;
      });

      // making edited note first 
      const updatedNoteIndex = updatedNotes.findIndex(
        (note) => note.id === editNote.id
      );

      if (updatedNoteIndex !== -1) {
        const [removedItem] = updatedNotes.splice(updatedNoteIndex, 1);
        updatedNotes.push(removedItem);
      }

      setNotes(updatedNotes);
    } else {
      setNotes((prev) => {
        return [
          ...prev,
          {
            title,
            description,
            id: uuid(),
            date: new Date(),
            edited: null,
          },
        ];
      });
    }

    navigate("/");
  };

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setDescription(editNote.description);
    }
  }, [editNote]);

  return (
    <form className="flex gap-8 w-full flex-col h-full" onSubmit={onFormSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        placeholder="Title"
        onChange={onTitleChange}
        autoFocus
        className="py-2.5 px-5 rounded-3xl border-2 border-[#2b3238] bg-transparent focus:border-[#FFC440] focus-visible:outline-none text-h4"
      />
      <textarea
        name="description"
        id="description"
        placeholder="Description"
        onChange={onDescriptionChange}
        value={description}
        className="h-full py-4 px-5 rounded-3xl border-2 border-[#2b3238] bg-transparent focus:border-[#FFC440] focus-visible:outline-none text-md"
      ></textarea>
      <div className="w-full flex justify-between items-center">
        <div className="text-neutral-400 text-sm">
          Date: {DateTime.fromJSDate(new Date()).toFormat("dd.MM.yyyy")}
        </div>
        <div>
          <Link to={"/"}>
            <button className="px-8 py-3 bg-red-500 rounded-3xl mr-8 hover:bg-red-600">
              Cancel
            </button>
          </Link>
          <button
            className="px-8 py-3 bg-[#42C773] rounded-3xl disabled:bg-neutral-400 hover:bg-[#25C38A]"
            disabled={
              !title ||
              !description ||
              (title === editNote?.title &&
                description === editNote?.description)
            }
          >
            {editNote?.id ? "Edit Note" : "Create Note"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoteForm;
