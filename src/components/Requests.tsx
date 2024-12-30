import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import Schimmer from "./Schimmer";
import { toastHelper } from "../utils/toast";
import { toastEnum } from "../utils/enums";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchRequests = async () => {
    try {
      setLoader(true);
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      setRequests(res?.data?.data);
      setLoader(false);
    } catch (err) {
      setLoader(false);
        console.log(err);
    }
  };

  
  const reviewRequest = async (status:string, _id:string) => {
    try {
      setLoader(true);
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      fetchRequests();
    } catch (err:any) {
      toastHelper(err?.response?.data?.error, toastEnum.ERROR);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if(loader) {
    return (
      [1,2,3,4,5]?.map((_)=><Schimmer key={_} />)
    )
  }

  if (!requests) return;

  if (requests.length === 0) return <h1 className="text-center"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests?.map((request:any) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2"
              onClick={() => reviewRequest("rejected", request._id)}
              >Reject</button>
              <button className="btn btn-secondary mx-2"
              onClick={() => reviewRequest("accepted", request._id)}
              >Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;