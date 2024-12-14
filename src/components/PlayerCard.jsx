/* eslint-disable react/prop-types */
const PlayerCard = ({ player }) => {
  return (
    <a>
      <div className="player-card-container border border-slate-400 bg-slate-100 shadow-lg rounded-lg px-2 pb-4 pt-6 flex flex-col items-center text-center w-60 h-[300px]">
        <div className="player-image w-[100%] h-[50%] bg-slate-100 mb-5">
          <img
            src={player.playerImageUrl}
            alt={`${player.firstName} ${player.lastName}`}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="player-info h-[50%] flex flex-col justify-start items-center">
          <p className="player-name text-xl leading-6 font-bold mb-2">
            {player.firstName} {player.lastName}
          </p>
          <div className="flex gap-2 justify-center items-center">
            <img src={player.teamImageUrl} alt="" className="block w-14 h-14" />
            <p className="font-semibold">{player.fullName}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default PlayerCard;
