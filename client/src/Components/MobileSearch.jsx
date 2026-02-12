import { FaSearch } from "react-icons/fa"
export default function MobileSearch({ show }) {
  return (
    <div className={`sm:hidden border-t border-gray-700 py-4 ${show}`}>
      <div className="relative">
        <input
          type="search"
          placeholder="Search BBC News..."
          className="bg-gray-800 text-white px-4 py-3 pr-10 rounded-lg border border-gray-600 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 w-full mobile-search"
        />

        <div className="w-4 h-4 text-gray-400 absolute right-3 top-4">
          <FaSearch />
        </div>

      </div>
    </div>
  );
}
