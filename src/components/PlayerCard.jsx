/* eslint-disable react/prop-types */
export default function PlayerCard({ player }) {
  return (
    <div
      className="group h-[380px] w-[240px] md:h-[420px] md:w-[280px]"
      data-id={player.player_id}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="relative h-[180px] md:h-[200px]">
          <img
            src={player.player_image_url}
            alt={`${player.first_name} ${player.last_name}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 md:p-4">
            <img
              src={player.team_image_url}
              alt="Team logo"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-white bg-white object-contain p-1"
            />
          </div>
        </div>

        <div className="flex h-[200px] md:h-[220px] flex-col p-3 md:p-4">
          <div className="mb-auto">
            <h3 className="text-base md:text-lg font-bold text-gray-900">
              {player.first_name} {player.last_name}
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              {player.team_name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-gray-50 p-2 text-center">
              <span className="block text-xs text-gray-500">Jersey</span>
              <span className="font-bold text-gray-900">#{player.jersey}</span>
            </div>
            <div className="rounded-lg bg-gray-50 p-2 text-center">
              <span className="block text-xs text-gray-500">Position</span>
              <span className="font-bold text-gray-900">
                {player.position || "N/A"}
              </span>
            </div>
          </div>

          <button
            onClick={() => console.log()}
            className="mt-3 md:mt-4 w-full rounded-lg bg-blue-600 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
