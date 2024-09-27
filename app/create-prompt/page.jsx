'use client'

import { useState } from "react"; // This will allow us to use state in our component
import { useSession } from "next-auth/react"; // This will tell us what user is logged in
import { useRouter } from "next/navigation"; // This will allow us to redirect the user

import Form from '@components/Form'; 

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        e.preventDefault(); // This will prevent the default form submission behavior
        setSubmitting(true); 

        try {
            const response = await fetch('/api/prompt/new',
        {
            method: 'POST',
            body: JSON.stringify({
                prompt: post.prompt,
                userId: session?.user.id,
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
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt