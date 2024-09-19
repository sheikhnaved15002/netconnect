import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { Button } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { LoaderCircle, LucideChartGantt } from "lucide-react";
import axios from "axios";
import { setAuthUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const [load, setLoad] = useState(false);
  const [imagePreview,setImagePreview] = useState('')
  const dispatch = useDispatch()
  const [input,setInput] = useState({
    profilePic: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender

  })
  // console.log(input)
  const fileChangeHandler = (e)=>{
    const file = e.target.files?.[0];
    if(file){
      const img = URL.createObjectURL(file);
      setImagePreview(img);
      setInput({...input,profilePic:file})
    }
  }
  // console.log(input.bio)
  const selectChangeHandler = (value)=>{
    setInput({...input,gender:value})
  }
  const handleEditProfle = async() => {
    // console.log(input)
    setLoad(true);
    const formData = new FormData();
    formData.append('bio',input.bio);
    formData.append('gender',input.gender)
    if(input.profilePic){
      formData.append('profilePic',input.profilePic)
    }
    // console.log(formData.forEach((ele)=>console.log(ele)))
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP}/api/v1/user/editprofile`,formData,{
        headers:{
          "Content-Type":'multipart/form-data'
        },
        withCredentials:true
      })
      if(res?.data.success){
        const updatedUser = {
          ...user,
          bio: res.data.user?.bio,
          gender: res.data.user?.gender,
          profilePicture: res.data.user?.profilePicture
        }
        dispatch(setAuthUser(updatedUser))
        toast.success(res.data.message);
        setLoad(false)
        navigate(`/profile/${user._id}`)
        // console.log(res.data)
      }
    } catch (error) {
      setLoad(false);
      toast.error(error.response.data.message);
    }
  };
  const navigate = useNavigate()
  const inputImg = useRef();
  return (
    <div className="flex mx-auto max-w-2xl pl-10 border-2 mt-5 hover:shadow-2xl transition-shadow duration-300 p-3">

      <section className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-xl  mt-10">Edit Profile</h1>
        <div className="flex gap-3 items-center bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-gray-200 justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={imagePreview?imagePreview:user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1>{user?.username}</h1>
              <span>{user?.bio}</span>
            </div>
          </div>
          <div>
            <input onChange={fileChangeHandler} accept="image/*" name="profilePic" type="file" className="hidden" ref={inputImg} />
            <Button
              onClick={() => inputImg.current.click()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Change Photo
            </Button>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl uppercase">bio</h1>
          <Textarea
            className="focus-visible:ring-transparent"
            value={input.bio}
            onChange = {(e)=>setInput({...input,bio:e.target.value})}
          />
        </div>{" "}
        <div>
          <h1 className="font-bold text-xl uppercase">gender</h1>
          <Select  defaultValue={input.gender} onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-full  ">
              <SelectValue placeholder={input.gender} />
            </SelectTrigger>
            <SelectContent className="focus-visible:ring-transparent">
              <SelectItem  value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center">
          <Button onClick={handleEditProfle} className="flex w-72 bg-blue-500 hover:bg-blue-600 mb-5">
            {!load ? "Submit" : <LoaderCircle className="animate-spin" />}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
