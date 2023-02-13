import { useEffect, useState } from "react";

import { Diaries } from "./types";
import Note from "./components/Notes";
import { getAllNotes, createNote } from "./services/NoteService";
const App = () => {
  const [diaries, setDiaries] = useState<Diaries[]>([]);
  useEffect(() => {
    getAllNotes().then(data => {
      setDiaries(data);
    })
  }, []);
  
  return(
    <div>
      <Note part = {diaries}/>
    </div>
  )


}

export default App;