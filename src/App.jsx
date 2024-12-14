import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import PlayersPage from "./components/PlayersPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/players" Component={PlayersPage}></Route>
      </Routes>
    </>
  );
};

export default App;
