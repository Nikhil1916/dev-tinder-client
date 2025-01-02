import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { toastHelper } from '../utils/toast';
import { toastEnum } from '../utils/enums';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useLocation } from 'react-router-dom';

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isUserLoggedIn = async() => {
    try {
      // console.log(document.cookie);
      const user = await axios.get(BASE_URL+"/profile/view",{
        withCredentials: true
      });
      dispatch(addUser(user?.data));
      if(location.pathname == "/login") {
        navigate("/");
      }
    } catch(e:any) {
      navigate("/login");
      toastHelper(e?.response?.data, toastEnum.ERROR);
    }
  }

  useEffect(()=>{
    const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
    if(cookieString) isUserLoggedIn();
  },[])

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body