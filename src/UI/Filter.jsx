import {useSearchParams} from "react-router-dom";
import React from 'react'



function Filter({filterField, options}) {
const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(e){
    // searchParams.set('filter', e.target.value);
    const newSearchParams = new URLSearchParams();
    if (searchParams.get("page")) searchParams.set("page", 1);
    newSearchParams.set('filter', e.target.value);
    // Set the new search parameters to the URL
    setSearchParams(newSearchParams);
    // setSearchParams(searchParams);
  }

  let filterValue = searchParams.get('filter') || options.at(0).value;
  return (
<div className="flex space-x-2 items-center  font-medium capitalize">
  <h3 className="text-[var(--color-primary)]">category: </h3>
  <select className="bg-[var(--bg-secondary)] border-1 px-2 py-1 w-max rounded-sm" onChange={handleClick}  value={filterValue} // Set the value here
>
  {options.map(option=><option key={option?.value} value={option.value}>{option.label}</option>)}
  </select>
</div>
    )
}

export default Filter