import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { toastHelper } from "../utils/toast";
import { toastEnum } from "../utils/enums";

const UserCard = ({ user, isFeed = true }: { user: any; isFeed: boolean }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status: string, userId: string) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err:any) {
      toastHelper(err?.response?.data, toastEnum.ERROR);
    }
  };
  const { firstName, lastName, photoUrl, age, gender, about, _id } = user;
  return (
    <div
      className={"card bg-base-300 w-96 shadow-xl" + (isFeed ? "" : " pt-4")}
    >
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {isFeed && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserCard;
