import "./App.css";
import HomePage from "./components/page-components/HomePage";
import Navigationhead from "./components/page-components/Navigationhead";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieCRUD from "./components/page-components/MovieCRUD";
import DescriptionPage from "./components/page-components/DescriptionPage";

function App() {
  const environment=process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE_baseURL : process.env.REACT_APP_PRO_MODE_baseURL
  console.log(environment)
  return (
    <BrowserRouter>
      <div className="App">
        <Navigationhead />
        <Routes>
          <Route path="/" element={<HomePage env={environment}/>} />
          <Route path="/add" element={<MovieCRUD mode="add" env={environment} />} />
          <Route path="/edit" element={<MovieCRUD mode="edit" env={environment} />} />
          <Route path="/description" element={<DescriptionPage env={environment} />} />
        </Routes>
        {/* <HomePage/> */}
        {/* <MovieCRUD/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
