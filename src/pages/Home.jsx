import React,{useEffect,useState} from 'react'
import service from '../appwrite/db_service'

function Home() {
  const [posts,setPosts] = useState([])

  useEffect(()=>{
    service.getPost().then()
  },[])
  return (
    <div>
      
    </div>
  )
}

export default Home

