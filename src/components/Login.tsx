import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { toastHelper } from "../utils/toast";
import { toastEnum } from "../utils/enums";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
      //add error handling via zod or validator 
      //to do add a common package for test payloads
      const user = await axios.post(BASE_URL+"/auth/login",{
        emailId: emailRef?.current?.value,
        password: passwordRef?.current?.value
      },
      { withCredentials: true });
      toastHelper(user?.data?.user?.firstName+" "+user?.data?.user?.lastName+ " logged in", toastEnum.SUCCESS);
      dispatch(addUser(user?.data?.user));
      navigate("/");
    } catch(e) {

      console.error(e);
    }
  }

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.value = "nik@gmail.com";
    }
    if (passwordRef.current) {
      passwordRef.current.value = "nikhiL1234!";
    }
  }, []);
  return (
    <div className="flex justify-center mt-[8rem]">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              ref={emailRef}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              ref={passwordRef}
            />
          </label>
          <button className="btn btn-primary my-2" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
