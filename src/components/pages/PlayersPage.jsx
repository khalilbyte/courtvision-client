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
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

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
  };

  return (
    <>
      <h1 className="text-3xl text-left mx-auto mb-4 max-w-[1200px] font-semibold border-2 border-blue-600">
        All Players
      </h1>

      <SearchBar onSearchResults={updatePlayersFromSearch} />

      <div
        ref={containerRef}
        className="container mx-auto px-4 py-8 max-w-[1200px] border-2 border-blue-600"
      >
        {error ? (
          <div className="text-center py-8">
            <p className="text-xl">{error}</p>
          </div>
        ) : loading ? (
          <LoadingSpinner />
        ) : players.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {players.map((player) => (
              <div key={player.player_id} className="flex justify-center">
                <PlayerCard player={player} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl">No players found.</p>
          </div>
        )}
      </div>
    </>
  );
}
