"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Suspense } from 'react';

import Profile from "@components/Profile"

const UserProfile = () => {
    const [posts, setPosts] = useState([])
    const [userName, setUserName] = useState('')

    const userId = useSearchParams().get('id')

    useEffect(() => {
        const fetchUserPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`)
            const data = await response.json()
            setPosts(data)
            console.log(data)
            setUserName(data[0].creator.username)
        }
        
        if (userId) fetchUserPosts()
        
    }, [userId])
    

    return (
        <Profile
        data={posts}
        desc={`Explore ${userName}'s personalized profile`}
        name={userName}
        />
    )
}

// export default UserProfile;

export default function SearchbarComp() {
    return (
      // You could have a loading skeleton as the `fallback` too
      <Suspense>
        <UserProfile />
      </Suspense>
    )
  }