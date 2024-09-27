import Link from "next/link"; // This will allow us to link to other pages

const Form = ({ type, post, setPost, submitting, handleSubmit } ) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left"><span className="blue_gradient">{type} Quote</span></h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing quotes with the world.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your Quote</span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your quote here"
            required
            className="form_textarea"  
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Tag {` `}
            <span className="font-normal">(#life, #business, #inspiration)</span>

          </span>
         
         

         <div className="flex flex-center gap-2">
          <p className="background-white font-medium pt-2">#</p>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="tag"
            required
            className="form_input"  
          />
          </div>
        </label>
       

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          
          <button
          type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}

          </button>
        </div>

      </form>

    </section>
  )
}

export default Form