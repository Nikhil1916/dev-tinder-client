import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store:any)=>store?.feed);
  const dispatch = useDispatch();
  const getFeed = async() => {
    if(feed) return;
    const res = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    console.log(res);
    dispatch(addFeed(res?.data?.data));
  }

  useEffect(()=>{
    getFeed();
  },[]);

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
  ));
}

export default Feed