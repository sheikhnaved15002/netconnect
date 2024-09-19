import { setMessages } from '@/redux/chatSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const getAllMessage = () => {
    const {selectedUser} = useSelector(store=>store.auth)
    const dispatch = useDispatch();
  useEffect(()=>{
    
        const fetchAllMessage = async()=>{
          try {
              const res = await axios.get(`${import.meta.env.VITE_APP}/api/v1/message/all/${selectedUser?._id}`,{withCredentials:true})
              if(res.data.success){
                  dispatch(setMessages(res.data.messages))
                //   console.log(res.data.messages)
              }
          } catch (error) {
            console.log(error)
          }
        }
        fetchAllMessage();
    },[selectedUser])
}

export default getAllMessage