import React ,{useState,useEffect}from 'react'
import service from '../appwrite/db_service'
import {PostCard,Container} from '../components/index'
function AllPost() {
  const [posts,setPosts] = useState([])
  useEffect(()=>{},[])
  service.getPost([]).then((posts)=>{
    if(posts){
      setPosts(posts.documents)
    }
  })
  return (
    <div>
      <div>
        <Container>
          <div className='flex flex-wrap'>
            {
            posts.map((post)=>(
              <div key={post.$id} className='p-2 w-1/4'>
                <PostCard post={post}/>
              </div>
            ))
            }
          </div>
        </Container>
      </div>
    </div>
  )
}

export default AllPost
