import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeLayout from './views/Home/HomeLayout';

import ActiveNotesView from './views/Home/ActiveNotesView';
import ArchivedNotesView from './views/Home/ArchivedNotesView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout></HomeLayout>}>
        <Route index element={<ActiveNotesView/>} ></Route>
        <Route path="home"  element={<ActiveNotesView/>}></Route>
        <Route path="archived"  element={<ArchivedNotesView/>}></Route>
        <Route path="*" ></Route>
      </Route>
    </Routes>
  );
}

export default App;
