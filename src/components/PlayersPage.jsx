import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import PlayerCard from "./PlayerCard";
import { LoadingSpinner } from "./ui/LoadingSpinner.jsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.js";

const BASE_URL = "http://localhost:8080/api/v1/";
const PLAYERS_PER_PAGE = 25;

function createUrl(page, playersPerPage = PLAYERS_PER_PAGE) {
  return `${BASE_URL}players?page=${page}&players_per_page=${playersPerPage}`;
}

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPlayers = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(createUrl(page));
      const newPlayers = response.data.players;

      if (newPlayers.length < PLAYERS_PER_PAGE) {
        setHasMore(false);
      }

      setPlayers((prev) => [...prev, ...newPlayers]);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setCurrentPage((prev) => {
        fetchPlayers(prev + 1);
        return prev + 1;
      });
    }
  }, [loading, hasMore]);

  useInfiniteScroll(loadMore, loading);

  useEffect(() => {
    fetchPlayers(1);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {players.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {players.map((player) => (
            <div key={player.player_id} className="flex justify-center">
              <PlayerCard player={player} />
            </div>
          ))}
        </div>
      )}

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default PlayersPage;
