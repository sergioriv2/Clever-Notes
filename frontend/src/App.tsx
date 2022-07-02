import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeLayout from "./views/Home/HomeLayout";

import ActiveNotesView from "./views/Home/ActiveNotesView";
import ArchivedNotesView from "./views/Home/ArchivedNotesView";
import useLocalStorage from "./hooks/useLocalStorage";
import LoginContext from "./components/context/LoginContext";
import RegisterView from "./views/Home/RegisterView";

function App() {
  const [storedValue, setValue] = useLocalStorage("token");

  return (
    <LoginContext.Provider value={{ storedValue, setValue }}>
      <Routes>
        <Route path="/" element={<HomeLayout></HomeLayout>}>
          <Route index element={<ActiveNotesView />}></Route>
          <Route path="home" element={<ActiveNotesView />}></Route>
          <Route path="archived" element={<ArchivedNotesView />}></Route>
          <Route path="register" element={<RegisterView />}></Route>
          <Route path="*"></Route>
        </Route>
      </Routes>
    </LoginContext.Provider>
  );
}

export default App;
