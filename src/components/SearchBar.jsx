import React, { useRef, useState } from "react";
import TaskList from "./TaskList";

function SearchBar() {
  const [query, setQuery] = useState("");
  const inputRef = useRef();

  function handleSearch() {
    setQuery(inputRef.current.value);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search tasks..."
        ref={inputRef}
        onChange={handleSearch}
      />
      <TaskList query={query} />
    </div>
  );
}

export default SearchBar;
