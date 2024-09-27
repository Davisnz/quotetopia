'use client'

import { useEffect, useState } from "react"; // This will allow us to use state in our component
import { useRouter, useSearchParams } from "next/navigation"; // This will allow us to redirect the user

import Form from '@components/Form'; 

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch (`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        
        if(promptId) getPromptDetails();
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault(); // This will prevent the default form submission behavior
        setSubmitting(true); 

        if(!promptId) return alert('Prompt ID is missing');

        try {
            const response = await fetch(`/api/prompt/${promptId}`,
        {
            method: 'PATCH',
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag
            })
        })

        if (response.ok) {
            router.push('/'); // This will redirect the user to the home page
        }

        } catch (error) {
            console.log(error);
        } finally { // This will run regardless of the try/catch block
            setSubmitting(false);
        }

    }


    return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt