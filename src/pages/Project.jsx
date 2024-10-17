import React from 'react'
import { useParams } from 'react-router-dom'
import ProjectUI from '../UI/ProjectUI';

function Project() {

  const {projectId} = useParams();
  return (
    <ProjectUI/>
  )
}

export default Project