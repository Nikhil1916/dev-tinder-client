import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { toastHelper } from "../utils/toast";
import { toastEnum } from "../utils/enums";
const Connections = () => {
  const [connections, setConnections] = useState([]);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
     setConnections(res?.data?.data);
    } catch (err:any) {
      // Handle Error Case
      toastHelper(err?.message, toastEnum.ERROR);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="mt-2">
        <h1 className="text-center"> No Connections Found</h1>
      </div>
    )
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections?.map((connection:any) => {
        const { firstName, lastName, photoUrl, age, gender, about ,_id} =
          connection;

        return (
          <div key={_id} className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
          </div>
        );
      })}
    </div>
  );
};
export default Connections;