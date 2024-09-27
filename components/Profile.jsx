import PromptCard from './PromptCard'
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <Alert>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle className="text-lg">No quotes found.</AlertTitle>
      <AlertDescription>
        Please create your first quote! 📝
      </AlertDescription>
    </Alert>
  )
}

const Profile = ({ name, desc, data, handleEdit, handleDelete}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>


      {data.length === 0 ? (
       <div className="mt-10">
         <AlertDemo  />
       </div>
      ) : (
          <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard 
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit (post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
          </div>
      )}

    </section>
  )
}

export default Profile