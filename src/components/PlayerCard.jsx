/* eslint-disable react/prop-types */
export default function PlayerCard({ player }) {
  return (
    <div className="group h-[420px] w-[280px]">
      {/* Card Container */}
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1">
        {/* Player Image Section - Fixed Height */}
        <div className="relative h-[200px]">
          <img
            src={player.player_image_url}
            alt={`${player.first_name} ${player.last_name}`}
            className="h-full w-full object-cover"
          />
          {/* Team Logo Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <img
              src={player.team_image_url}
              alt="Team logo"
              className="h-10 w-10 rounded-full border-2 border-white bg-white object-contain p-1"
            />
          </div>
        </div>

        {/* Player Info Section - Fixed Height */}
        <div className="flex h-[220px] flex-col p-4">
          {/* Name and Team - Fixed Height */}
          <div className="mb-auto">
            <h3 className="text-lg font-bold text-gray-900">
              {player.first_name} {player.last_name}
            </h3>
            <p className="text-sm text-gray-600">{player.team_name}</p>
          </div>

          {/* Stats Section */}
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

          {/* View Profile Button */}
          <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
