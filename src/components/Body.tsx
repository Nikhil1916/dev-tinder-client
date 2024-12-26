import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { Provider } from 'react-redux';
import appStore from "../utils/appStore";

const Body = () => {
  return (
    <Provider store={appStore}>
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
    </Provider>
  )
}

export default Body