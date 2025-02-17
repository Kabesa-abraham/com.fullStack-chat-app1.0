import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Link } from 'react-router-dom'
import { LogOut, Podcast, Settings, User } from 'lucide-react'

const Navbar = () => {

  const {authUser,logout} = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
    <div className="container mx-auto px-4 h-16">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-9 rounded-lg bg-success/10 flex items-center justify-center">
              <Podcast className="w-5 h-5 text-blue-800" />
            </div>
            <h1 className="text-lg font-bold">RD-Chat</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link to={"/setting"} className={`btn btn-sm gap-2 transition-colors`}>
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Parametres</span>
          </Link>

          {authUser && (
            <>
              <Link to={"/profile"} className={``}>
                <img src={authUser?.profilePic || '/avatar.png'} alt="" className='w-8 h-8 md:w-11 md:h-11 object-cover rounded-full' />
              </Link>

              <button className="flex gap-2 items-center" onClick={logout}>
                <LogOut className="size-6 text-pink-700 ml-4 " />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </header>
  )
}

export default Navbar
