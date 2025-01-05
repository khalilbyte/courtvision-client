import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import PlayersPage from "./components/pages/PlayersPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/players" element={<PlayersPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
