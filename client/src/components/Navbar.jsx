import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'
import userImg from '../img/user.png'
const Navbar = () => {
  const [user,setUser]=useState()
  useEffect(()=>{
    // console.log(localStorage.getItem("userID"))
    setUser(localStorage.getItem("userID"));
  }, [])
  console.log("NavbarL",user)
  return (
    <nav className="flex items-center justify-between p-3 backdrop-blur-xl text-white bg-gray-900">
      <div>
        <a href="/" className="">
          <span className="font-bold md:text-2xl text-yellow-500">Adapt</span>
          <span className="font-thin md:text-2xl">Ed</span>
        </a>
      </div>
      <div className="flex items-center gap-5 md:text-xl">
        <Link to={`/profile/${user}`} className="mx-2">
          <img
            src={userImg}
            alt="Profile"
            className="rounded-full w-10 h-10 border-4 border-yellow-400"
            width={500}
            height={300}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
