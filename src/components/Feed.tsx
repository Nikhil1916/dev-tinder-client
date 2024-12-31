import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store:any)=>store?.feed);
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const getFeed = async() => {
    if(feed) return;
    const res = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    console.log(res);
    setLoading(false);
    dispatch(addFeed(res?.data?.data));
  }

  useEffect(()=>{
    getFeed();
  },[]);

  if(!feed || feed.length == 0) {
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
  }

  if(loading) {
    return (
      <div className="flex justify-center mt-4">
        <div className="w-80 p-4 bg-gray-800 rounded-lg shadow-md">
          {/* Image placeholder */}
          <div className="w-full h-48 bg-gray-700 rounded-md shimmer"></div>

          {/* Text placeholder */}
          <div className="mt-4">
            <div className="h-4 bg-gray-700 rounded-md w-2/3 shimmer"></div>
            <div className="h-4 bg-gray-700 rounded-md w-1/4 mt-2 shimmer"></div>
          </div>

          {/* Button placeholders */}
          <div className="flex justify-between mt-6">
            <div className="w-24 h-10 bg-gray-700 rounded-md shimmer"></div>
            <div className="w-24 h-10 bg-gray-700 rounded-md shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} isFeed={true} />
      </div>
  ));
}

export default Feed