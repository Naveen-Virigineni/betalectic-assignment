function header({ onSearch, searchQuery }) {
  return (
    <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold">⚡ TaskFlow</h1>
      <p className="text-gray-600">
        Your Smart Productivity Dashboard
      </p>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-8 py-2 rounded-xl bg-white shadow-sm border border-gray-200 outline-none text-sm focus:border-purple-400 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-base leading-none"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default header;