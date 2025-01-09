import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
import PlayerCard from "../PlayerCard.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";
import useInfiniteScroll from "../../hooks/useInfiniteScroll.js";
import SearchBar from "../ui/SearchBar.jsx";

const BASE_URL = "http://localhost:8080/api/v1";
const PLAYERS_PER_PAGE = 25;

function createPlayersUrl(page, playersPerPage = PLAYERS_PER_PAGE) {
  return `${BASE_URL}/players?page=${page}&players_per_page=${playersPerPage}`;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const clearResultButton = useRef(null);

  const fetchPlayers = useCallback(async (page) => {
    try {
      setLoading(true);
      setError(null);
      const scrollPosition = window.scrollY;
      const response = await axios.get(createPlayersUrl(page));
      const newPlayers = response.data.players;

      if (newPlayers.length < PLAYERS_PER_PAGE) {
        setHasMore(false);
      }

      setPlayers((prev) => [...prev, ...newPlayers]);

      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
      });
    } catch (e) {
      setError("Unable to load players. Please try again later.");
      console.error("Error loading players:", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlayers(1);
  }, [fetchPlayers]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = Math.floor(players.length / PLAYERS_PER_PAGE) + 1;
      fetchPlayers(nextPage);
    }
  }, [fetchPlayers, loading, hasMore, players.length]);

  useInfiniteScroll(loadMore, loading);

  const updatePlayersFromSearch = (searchResults, errorMessage = null) => {
    setPlayers(searchResults);
    setError(errorMessage);
    setHasMore(false);
    setIsShowingSearchResults(true);
  };

  const removeSearchResults = () => {
    setPlayers([]);
    setError(null);
    setHasMore(true);
    fetchPlayers(1);
    setIsShowingSearchResults(false);
  };

  return (
    <div className="container mx-auto w-[90%] max-w-[1200px] border-2 border-green-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-2 border-blue-500">
        <h1 className="text-3xl font-semibold">All Players</h1>
        {isShowingSearchResults && (
          <div className="flex items-center gap-x-3">
            <button
              type="button"
              onClick={removeSearchResults}
              ref={clearResultButton}
              className="px-4 py-1
              bg-blue-500 text-white
              rounded-md
              hover:bg-blue-600
              transition-colors duration-200"
            >
              Clear Results
            </button>
            <SearchBar onSearchResults={updatePlayersFromSearch} />
          </div>
        )}
        {!isShowingSearchResults && (
          <div className="flex items-center gap-x-3">
            <SearchBar onSearchResults={updatePlayersFromSearch} />
          </div>
        )}
      </div>

      <div ref={containerRef} className="py-8">
        {error ? (
          <div className="text-center py-8">
            <p className="text-xl">{error}</p>
          </div>
        ) : loading ? (
          <LoadingSpinner />
        ) : players.length > 0 ? (
          <div className="flex justify-center">
            <div className="w-[360px] sm:w-[744px] md:w-[872px] lg:w-[1172px] flex justify-center flex-wrap gap-4 border-2 border-red-500">
              {players.map((player) => (
                <PlayerCard key={player.player_id} player={player} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl">No players found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
