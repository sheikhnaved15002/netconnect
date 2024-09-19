import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [load, setLoad] = useState(false);

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    try {
      setLoad(true);
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_APP}/api/v1/user/register`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data.success) {
        toast.success(res?.data.message);
        setInput({ username: "", email: "", password: "" });
        navigate("/login");
      } else {
        toast.error(res?.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoad(false);
    }
  };
  const {user} = useSelector(store=>store.auth);
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])
  return (
    <div className="h-screen  w-screen flex justify-center items-center bg-gray-50 overflow-hidden">
      <div className="w-full max-w-md shadow-xl hover:shadow-2xl p-8 flex flex-col gap-5 m-5">
        <form onSubmit={handleSignupSubmit} className="">
          <div className="my-4 text-center">
            <img src="/netconnect.png" className="mx-auto"/>
            <p className="text-md font-bold">Sign Up</p>
          </div>
          <div>
            <div>
              <Label>Username</Label>
              <Input
                className="my-1 focus-visible:ring-transparent"
                type="text"
                placeholder="Enter username"
                autoFocus
                name="username"
                value={input.username}
                onChange={onChangeHandler}
                required
              />
            </div>
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
              />
            </div>
            <div className="">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  value={input.password}
                  onChange={onChangeHandler}
                  className="my-1 w-full pr-10 focus-visible:ring-transparent" // Add padding to the right for the icon
                  type={eye ? "text" : "password"} // Toggle between password and text
                  placeholder="Enter password"
                  required
                />
                <span
                  onClick={() => setEye(!eye)}
                  className="absolute right-0 inset-y-0 pr-3 flex items-center cursor-pointer"
                >
                  {eye ? <Eye /> : <EyeOff />}
                </span>
              </div>
            </div>
            <Button className="w-full mt-5" variant="">
              {load ? <LoaderCircle onLoad={() => setLoad(true)} /> : "Signup"}
            </Button>
          </div>
        </form>
        <span className="text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
