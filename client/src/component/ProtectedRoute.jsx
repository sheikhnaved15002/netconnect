import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

const ProtectedRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            navigate('/login');
            // toast.error('please login')
        }
    },[user,navigate])
  return (
    <>{children}</>
  )
}

export default ProtectedRoute