import { useEffect, useRef } from "react";
import axios from "axios";

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async() => {
    try {
      //add error handling via zod or validator 
      //to do add a common package for test payloads
      const user = await axios.post(BASE_URL+"/auth/login",{
        emailId: emailRef?.current?.value,
        password: passwordRef?.current?.value
      },
      { withCredentials: true });
      console.log(user);
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
    <div className="flex justify-center my-10">
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
