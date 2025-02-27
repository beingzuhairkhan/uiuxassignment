import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "../../../store/BoardStore";

const Header = () => {
  const searchString = useBoardStore((state) => state.searchString);
  const setSearchString = useBoardStore((state) => state.setSearchString);
  

  return (
    <header >
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-5 bg-gray-100 border border-gray-100" >
      <div className="absolute top-0 left-0 w-full h-150 bg-gradient-to-br from-pink-500 via-purple-500 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50!" />

      <div className="flex items-center gap-4">
        <img
          src="https://cdn.freebiesupply.com/logos/large/2x/trello-logo-png-transparent.png"
          alt="logo"
          className="h-12 w-auto md:h-16 object-contain"
        />
        <h1 className="text-xl md:text-2xl font-bold tracking-widest text-gray-700">
          StackBoard
        </h1>
      </div>

      {/* Right Section: Search Bar & Avatar */}
      <div className="flex items-center gap-5 w-full md:w-auto mt-4 md:mt-0">
        {/* Search Bar */}
        <form className="flex items-center bg-white rounded-md px-3 py-2 shadow-md w-full md:w-72 lg:w-96 hover:shadow-lg transition-shadow">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchString}
            onChange={(e)=> setSearchString(e.target.value)}
            className="flex-1 outline-none px-2 py-1 font-semibold  text-gray-700"
          />
          <button type="submit" hidden>Search</button>
        </form>

        {/* Avatar */}
        <Avatar name="Zuhair Khan" size="40" round={true} className="cursor-pointer " />
      </div>
      </div>
     
    </header>
  );
};

export default Header; 