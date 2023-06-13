import Notify from "./components/Notify";
import Diary from "./components/Diaries";
import AddDiaries from "./components/AddDiaries";
import { Diaries } from "./types";
import { useEffect, useState } from "react";
import { Notification } from "./types";
import { getAllDiaries } from "./services/DiaryService";
const App = () => {
  const [diaries, setDiaries] = useState<Diaries[]>([]);
  const [error, setError] = useState<Notification>({message: ""});
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, []);
  console.log(error)
  return(
    <div>
      <Notify message={error} setError = {setError}/>
      <AddDiaries data = {setDiaries} diarylist={diaries} setError={setError}/>
      <Diary part = {diaries}/>
    </div>
  )


}

export default App;