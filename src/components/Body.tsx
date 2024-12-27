import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { toastHelper } from '../utils/toast';
import { toastEnum } from '../utils/enums';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store:any) => store?.user);
  const isUserLoggedIn = async() => {
    try {
      const user = await axios.get(BASE_URL+"/profile/view",{
        withCredentials: true
      });
      console.log(user);
      dispatch(addUser(user?.data));
    } catch(e:any) {
      navigate("/login");
      toastHelper(e?.response?.data, toastEnum.ERROR);
    }
  }

  useEffect(()=>{
    isUserLoggedIn();
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