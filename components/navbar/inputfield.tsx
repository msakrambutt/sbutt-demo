import { FiSearch } from "react-icons/fi";
export default function Inputfield() {
  return (
    <div
      id="searh-bar"
      className="flex mr-2 gap-1 border px-1 rounded-md w-80 justify-start items-center"
    >
      <FiSearch />
      <input
        type="text"
        placeholder="What are you looking for"
        className="text-sm font-light pl-2 py-1 w-full grow"
      />
    </div>
  );
}
