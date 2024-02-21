import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import './App.css'
import Header from './components/Header/Header'
import {Footer} from './components/index'
function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])
 // todo highlight
return !loading?(
  <div className='min-h-screen flex flex-wrap content-between bg-[#1b0d2e] text-white'>
    <div className='w-full block'>
    <h1>What is wrong with all this</h1>
      <Header/>
      {/* <main>
        <Outlet/>
      </main> */}
      <Footer/>
    </div>
  </div>
):null
}

export default App
