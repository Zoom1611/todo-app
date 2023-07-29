import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { NotesProvider } from "./Services/NotesProvider.tsx";

import Root from "./Components/Root.tsx";
import NotesList from "./Components/NotesList.tsx";
import CreateNote from "./Components/CreateNote.tsx";
import EditNote from "./Components/EditNote.tsx";
import NotePreview from "./Components/NotePreview.tsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<NotesList />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/preview/:id" element={<NotePreview />} />
      </Route>
    )
  );

  return (
    <NotesProvider>
      <div className="relative block min-h-screen bg-primary-100 font-sans text-white">
        <RouterProvider router={router} />
      </div>
    </NotesProvider>
  );
}

export default App;
