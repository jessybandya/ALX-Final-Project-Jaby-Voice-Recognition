'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Admin from "./Admin"
import Account from "./Account"


function Profile() {
    const history = useRouter()
    const authId = useSelector((state)=> state.authId)

    useEffect(() => {
        if(!authId){
            history.push('/login')
        }
    }, [authId])
    
  return (
    <div>
    {authId === "b5VPV1CztKOPpkONwwsgdRwIaBp1" ?(
        <Admin />
    ):(
        <Account />
    )}
    </div>
  )
}

export default Profile