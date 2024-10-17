import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SortBy({options}) {

const [searchParams, setSearchParams] = useSearchParams();

const sortBy = searchParams.get('sortBy') || options[0].value;
function handleChange(e){
searchParams.set('sortBy', e.target.value);
setSearchParams(searchParams);
}

  return (
<select onChange={handleChange} className='bg-[var(--bg-secondary)] border-1 px-2 py-1 w-max rounded-sm' value={sortBy}>
{options.map(option=><option value={option.value} key={option.value} className='text-sm rounded-none'>{option.label}</option>)}

</select>

  )
}

export default SortBy