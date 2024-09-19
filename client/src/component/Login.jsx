import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const [eye, setEye] = useState(false);
  // console.log(location.state);
  const [input, setInput] = useState({ password: "", email: "" });
  const [load, setLoad] = useState(false);
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleSigninSubmit = async (e) => {
    try {
      setLoad(true);
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_APP}/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data.success) {
        // console.log(res.data);
        dispatch(setAuthUser(res.data.user));
        toast.success(res?.data.message);
        setInput({ email: "", password: "" });

        navigate("/");
      }
      // setLoad(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
      // setLoad(false);
    } finally {
      setLoad(false);
    }
  };
  const{user} = useSelector(store=>store.auth)
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user,navigate])
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
      <div className=" w-full max-w-md shadow-xl hover:shadow-2xl p-8 flex flex-col gap-5 m-5">
        <form onSubmit={handleSigninSubmit} className="">
          <div className="my-4 text-center">
            <img className="mx-auto " src="/netconnect.png" />
            <p className="text-md font-bold">Login </p>
          </div>
          <div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                value={input.email}
                onChange={onChangeHandler}
                className="my-1 focus-visible:ring-transparent"
                type="email"
                placeholder="Enter email"
                required
                autoFocus
              />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  value={input.password}  
                  onChange={onChangeHandler}
                  className="my-1 focus-visible:ring-transparent"
                  type={eye ? "text" : "password"}
                  placeholder="Enter password"
                  required
                />
                <span
                  onClick={() => setEye(!eye)}
                  className="absolute right-0 inset-y-0 pr-3 items-center flex cursor-pointer"
                >
                  {eye ? <Eye /> : <EyeOff />}
                </span>
              </div>
            </div>
            <Button className="w-full mt-5" variant="">
              {load ? <LoaderCircle className="animate-spin" /> : "Login"}
            </Button>
          </div>
        </form>
        <span className="text-center ">
          Doesn't have an account?{" "}
          <Link to={"/signup"} className="text-blue-600">
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
