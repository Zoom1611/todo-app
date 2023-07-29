import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useNotes from "../Hooks/useNotes";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { NoteInterface } from "../Services/NotesProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Style/quill.css";
import "../Style/scrollbar.css";

const modules = {
  toolbar: [
    // ... Other toolbar options ...
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic"], // You can remove "underline" from this list
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

type NoteFormPropsType = {
  editNote?: NoteInterface | null;
};

const NoteForm = ({ editNote }: NoteFormPropsType) => {
  const navigate = useNavigate();
  const { notes, setNotes } = useNotes();
  const [title, setTitle] = useState<string>("Main title");
  const [description, setDescription] = useState<string>(
    "<h1>Write your note here.</h1> You can use headings, <strong>bold</strong>, <em>italic</em>, lists and links by using the toolbar above."
  );

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (content: string) => {
    setDescription(content);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editNote) {
      const updatedNotes = notes.map((note) => {
        if (note.id === editNote.id) {
          return {
            ...note,
            title,
            description,
            edited: new Date(),
          };
        }
        return note;
      });

      // placing the edited note on top of the display
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
        className="py-2.5 px-5 rounded-3xl border-2 border-primary-300 bg-transparent focus:border-orange-100 focus-visible:outline-none text-h4"
      />
      <div className="relative h-full max-h-full overflow-y-auto">
        <ReactQuill
          value={description}
          onChange={onDescriptionChange}
          style={{ height: "87%" }}
          modules={modules}
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="text-neutral-400 text-sm">
          Date: {DateTime.fromJSDate(new Date()).toFormat("dd.MM.yyyy")}
        </div>
        <div>
          <Link to={"/"}>
            <button className="px-8 py-3 bg-red-500 rounded-3xl mr-8 hover:bg-red-600 !text-white">
              Cancel
            </button>
          </Link>
          <button
            className="px-8 py-3 bg-green-100 rounded-3xl disabled:bg-neutral-400 hover:bg-green-200"
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
