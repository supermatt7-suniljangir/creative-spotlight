import React from 'react'
import LeaderBoardProjects from '../UI/LeaderBoardProjects';
import { FaTrophy } from "react-icons/fa";


 


function Leaderboard() {

  return (
    <div className='overflow-scroll w-full md:px-4 py-4 h-full'>
      <div className="capitalize  text-center mb-8 flex items-center text-2xl md:text-5xl font-bold justify-center space-x-4 text-[var(--color-primary)]"><h2 className='-mt-2'>🔥 Spotlight : Top Projects 🔥</h2>
</div>
<div><LeaderBoardProjects/>
</div>
   </div>
  )
}

export default Leaderboard;