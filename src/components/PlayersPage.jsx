import axios from "axios";
import { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";

let currentPage = 0;
const baseUrl = `http://localhost:8080/api/players?page=${currentPage}`; // Connection to the Java server

const PlayersPage = () => {
  const [players, setPlayer] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      axios.get(baseUrl).then((response) => {
        const serverResponse = response.data;
        setPlayer(serverResponse.content);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleShowMorePlayers = async () => {
    try {
      currentPage++;
      let nextPageUrl = `http://localhost:8080/api/players?page=${currentPage}`;
      setLoading(true);
      const response = await axios.get(nextPageUrl);
      const serverResponse = response.data;
      setPlayer((prevPlayers) => [...prevPlayers, ...serverResponse.content]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container border-2 border-blue-500 flex flex-col min-h-[calc(100vh-5rem)] justify-center items-center">
      {loading && <p className="text-2xl font-bold mx-auto">Loading...</p>}
      {!loading && (
        <div className="players-container border-2 border-red-500 max-w-[1170px] w-[90%] h-full mx-auto grid grid-cols-[repeat(auto-fit,240px)] justify-center gap-4 mb-5">
          {players.map((player) => {
            return <PlayerCard key={player.playerId} player={player} />;
          })}
        </div>
      )}
      <div className="border-2 border-green-500">
        {loading && (
          <button
            type="button"
            className="load-more-button hidden rounded-md mb-4 bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={handleShowMorePlayers}
          >
            Load more
          </button>
        )}
        {!loading && (
          <button
            type="button"
            className="load-more-button block rounded-md mb-4 bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={handleShowMorePlayers}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;
