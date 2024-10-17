import React, {useState} from 'react'
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft   } from "react-icons/fa";

import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import { twMerge } from 'tailwind-merge';






function Pagination({count}) {
const [searchParams, setSearchParams] = useSearchParams();

const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get("page"));
const numPages = Math.ceil(count / PAGE_SIZE)
const [translate, setTranslate] = useState(currentPage * -4 + ((currentPage !== 1 && count > 5) ? 12 : 8)  ); // Use a number instead of a string

const nextPage = () => {
  if(currentPage >= 3)setTranslate(prevTranslate => prevTranslate - 4); // Subtract 12 for each next page
  const next = currentPage === numPages ? currentPage : currentPage + 1;
  searchParams.set('page', next);
  setSearchParams(searchParams);
};

const prevPage = () => {
  if(currentPage >= 4)setTranslate(prevTranslate => prevTranslate + 4); // Add 12 for each previous page
  const prev = currentPage === 1 ? currentPage : currentPage - 1;
  searchParams.set('page', prev);
  setSearchParams(searchParams);
};


  return (

 <div className='w-full flex flex-col items-center text-[var(--color-light)]'>
{numPages > 1 &&
  <div className='flex items-center justify-around w-full'>
  <button onClick={prevPage} disabled={currentPage === 1} className='flex items-center cursor-pointer bg-[var(--bg-secondary)] space-x-2  px-2 rounded-md justify-center  pt-1 pb-1.5'>
     <FaRegArrowAltCircleLeft className=' mt-0.5' /> <span>Previous</span> 
    </button>
    <div className={` flex flex-col items-center w-80 overflow-x-hidden`}  
>
<div style={{ transform: `translateX(${translate}rem)` }}  className='flex space-x-4  whitespace-nowrap w-full'>{Array.from({length:numPages}, (item, index)=> <div key={index} className={`border-2 w-12 cursor-pointer aspect-square flex-shrink-0 flex items-center justify-center rounded-full text-[var(--color-dark)] border-[var(--color-primary)] ${currentPage === index+1 && "bg-[var(--bg-secondary)] text-[var(--color-light)]"  } border-[var(--color-primary)]`} onClick={()=>{
searchParams.set('page', index+1);
setSearchParams(searchParams);
}}>{index+1}</div>)}</div>
</div>
    <button onClick={nextPage} disabled={currentPage === numPages} className='flex cursor-pointer items-center  space-x-2 bg-[var(--bg-secondary)]  px-4 rounded-md  justify-center pt-1 pb-1.5'>
    <span>Next</span>  <FaRegArrowAltCircleRight className=' mt-0.5' />
    </button>
  </div>}
 </div>
  )
}

export default Pagination;
