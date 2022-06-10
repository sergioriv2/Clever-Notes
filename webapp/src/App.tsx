import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeLayout from './views/Home/HomeLayout';

import HomeView from './components/Home/HomeView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout></HomeLayout>}>
        <Route index element={<HomeView/>} ></Route>
        <Route path="home" ></Route>
        <Route path="home" ></Route>
        <Route path="*" ></Route>
      </Route>
    </Routes>
  );
}

export default App;
