'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from 'react';


import Form from "@components/Form"


const EditPrompt = () => {
    const router = useRouter();
    const searchParams  = useSearchParams();

    const {data: session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt : '',
        tag: '',
    })

    const promptId = searchParams.get('id')

    useEffect(() => {
      const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)

        const data = await response.json()
        console.log(data)

        setPost({
            prompt: data.prompt,
            tag : data.tag
        })
      }
      if(promptId) getPromptDetails()
    }, [promptId])
    

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert("No promptId")

        try{
            const response = await fetch(`/api/prompt/${promptId}`,
            {
                method :  'PATCH',
                body : JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if(response.ok){
                router.push('/')
            }
        }catch(error){
            console.error(error)
        }finally{
            setSubmitting(false)
        }

    }


  return (
    <Form 
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}

    />
  )
}

export default function EditPromptComp() {
    return (
      // You could have a loading skeleton as the `fallback` too
      <Suspense>
        <EditPrompt />
      </Suspense>
    )
  }