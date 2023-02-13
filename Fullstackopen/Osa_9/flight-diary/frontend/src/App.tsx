import { useEffect, useState } from "react";

import { Diaries } from "./types";
import Diary from "./components/Diaries";
import AddDiaries from "./components/AddDiaries";
import { getAllDiaries } from "./services/DiaryService";
const App = () => {
  const [diaries, setDiaries] = useState<Diaries[]>([]);
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, []);
  
  return(
    <div>
      <AddDiaries data = {setDiaries} diarylist={diaries}/>
      <Diary part = {diaries}/>
    </div>
  )


}

export default App;