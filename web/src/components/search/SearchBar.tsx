import React, { KeyboardEvent, ChangeEvent } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({ query, setQuery, onSearch }: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target;
    setQuery(target.value);

    // Resize the textarea to fit the content
    target.style.height = "24px";
    const newHeight = target.scrollHeight;
    target.style.height = `${newHeight}px`;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      onSearch();
      event.preventDefault();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center w-full opacity-100 border-2 border-border dark:border-border-dark rounded-lg px-4 py-2 focus-within:border-accent bg-inverted dark:bg-inverted">
        <MagnifyingGlass
          className="text-emphasis dark:text-emphasis-dark"
          color="text-inverted-dark dark:text-inverted-black"
        />
        <textarea
          autoFocus
          className="flex-grow ml-2 h-6 outline-none placeholder-default overflow-hidden whitespace-normal resize-none text-inverted-dark dark:text-inverted-dark"
          role="textarea"
          aria-multiline
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning={true}
        />
      </div>
    </div>
  );
};
