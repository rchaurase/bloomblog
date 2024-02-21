import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  // const navigate = useNavigate()
  const authStatus = useSelector(state=>state.auth.status)
  console.log(authStatus)
  const navItem=[
    {
      name:'Home',
      slug:'/',
      active:true
    },
    {
      name:'Signup',
      slug:'/signup',
      active:!authStatus
    },
    {
      name:'Login',
      slug:'/login',
      active:!authStatus
    },
    {
      name:'Add Post',
      slug:'/add-post',
      active:authStatus
    },
    {
      name:'All Post',
      slug:'/all-post',
      active:authStatus
    },
  
  ]
  // console.log(`are you here for what `)
  
  return (
    <div>
      <header>
      
          {
            navItem.map(item=>(
              <div key={item.name}>
                <Link> {item.name} </Link>
              </div>
            ))
          }
      </header>
    </div>
  )
}

export default Header
