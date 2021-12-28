import React,{useState} from 'react'

export default function CommentsForm({handleSubmit,setNewComment}) {
    const [comment, setComment] = useState("")

    return (
        <div className="bg-white rounded shadow-sm">
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        maxLength="200"
                        type="text"
                        name="comment"
                        className="bg-grey-lighter h-16 py-2 px-3 border border-gray-800
                        relative flex justify-center w-full px-4 py-2
                        leading-5 text-gray-800 transition duration-150
                        ease-in-out rounded-md"
                        value={comment}
                        onChange={(e)=>{
                            setComment(e.target.value)
                            setNewComment(e.target.value)
                        }}
                    >
                        Add a comment
                    </textarea>
                </div>

                <button type="submit"
                    className="border border-blue-700 mt-4 right-0 bg-blue-500 
                    text-white hover:bg-blue-900 py-2 px-4 rounded tracking-wide mr-1"
                    onClick={()=>setComment("")}>
                    Confirm
                </button>

            </form>
        </div>
      
        
    )
}
