import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import ProjectsTableOperations from "./ProjectsTableOperations";
import { useProjects } from "../features/projects/useProjects";
import RenderProjectsData from "./RenderProjectsData";
import { useSearchParams } from "react-router-dom";
import { popularQueries } from "../Data/data";
import Pagination from "./Pagination";
import { PAGE_SIZE } from "../utils/constants";

function SearchPageUi() {
  let [selectedQuery, setSelectedQuery] = useState({});
  const { isLoading, userProjects: searchResults } = useProjects();
  let [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  const projects = searchResults?.slice(from, to);

  function handleChangeQuery(e) {
    e.preventDefault();
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("search", query);
    // Set the new search parameters to the URL
    setSearchParams(newSearchParams);
  }

  // function handleChangeSelectedQuery(){
  //   const newSearchParams = new URLSearchParams();
  //   newSearchParams.set('query', selectedQuery.label);
  //   // Set the new search parameters to the URL
  //   setSearchParams(newSearchParams);
  //    }

  useEffect(() => {
    if (selectedQuery && selectedQuery.label) {
      const newSearchParams = new URLSearchParams();

      newSearchParams.set("query", selectedQuery.value.join(","));
      setSearchParams(newSearchParams);
    }
  }, [selectedQuery]);

  return (
    <div className="h-screen w-full overflow-scroll pb-32 text-[var(--color-dark)]">
      <div className="flex md:w-2/4 w-3/4 mb-8 mx-auto space-x-1 rounded-md bg-[var(--bg-secondary)] text-[var(--color-light)] py-1 px-4 h-fit items-center ">
        <IoIosSearch className="md:text-3xl text-xl mt-1 text-[var(--color-light)] " />
        <form action="" onSubmit={handleChangeQuery} className="w-full">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="px-4 text-base py-2 w-full placeholder:text-[var(--color-light)] bg-transparent placeholder:capitalize focus:outline-none"
            placeholder="search the creative world at work"
          />
        </form>
      </div>
      <div className="w-full">
        <ProjectsTableOperations />
      </div>
      <div className="my-10">
        <h3 className="text-2xl text-center">Most Searched Queries</h3>

        <div className="flex flex-wrap w-full justify-center items-center md:px-28 md:gap-8 gap-2 mt-10">
          {popularQueries.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedQuery(item)}
              className={`px-3 pt-1 pb-1.5  rounded-sm ${
                item.id === selectedQuery.id
                  ? "bg-[var(--bg-secondary)] text-[var(--color-light)]"
                  : "bg-[var(--bg-quaternary)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-10">
        {projects && projects.length > 0 ? (
          <RenderProjectsData
            renderUserInfo={true}
            projects={projects}
            isLoading={isLoading}
          />
        ) : (
          <div className="h-auto p-20 flex items-center justify-center capitalize text-2xl">
            <p>
              no search results found, try again with a different query perhaps
            </p>
          </div>
        )}
      </div>
      <footer>
        <Pagination count={searchResults?.length} />
      </footer>
    </div>
  );
}

export default SearchPageUi;
