import { useEffect, useRef, useState } from "react";
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
  const firstName = useRef<HTMLInputElement | null>(null);
  const lastName = useRef<HTMLInputElement | null>(null);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
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

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  }

  const handleSignUp = async() => {
    try {
      const user = await axios.post(BASE_URL+"/auth/signup",{
        emailId: emailRef?.current?.value,
        password: passwordRef?.current?.value,
        firstName: firstName?.current?.value,
        lastName: lastName?.current?.value
      },
      { withCredentials: true });
      console.log(user);
      toastHelper(user?.data?.user?.firstName+" "+user?.data?.user?.lastName+ " Signed in");
      dispatch(addUser(user?.data?.user));
      navigate("/");
    } catch(e:any) {
      toastHelper(e?.response?.data?.err, toastEnum.ERROR);
    }
  }

  return (
    <div className="flex justify-center mt-[8rem]">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {!isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  ref={firstName}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  ref={lastName}
                />
              </label>
            </>
          )}
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
              type="password"
              className="input input-bordered w-full max-w-xs"
              ref={passwordRef}
            />
          </label>
        {
          isLoginForm ? (
            <button className="btn btn-primary my-2" onClick={handleLogin}>
            Login
          </button>
          ) : (
            <button className="btn btn-primary my-2" onClick={handleSignUp}>
            Sign Up
          </button>
          )
        }
          <div>
            {isLoginForm ? (
              <p onClick={toggleForm} className="text-center cursor-pointer">
                New User? Signup here!
              </p>
            ) : (
              <p onClick={toggleForm} className="text-center cursor-pointer">
                Old User? login here!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
