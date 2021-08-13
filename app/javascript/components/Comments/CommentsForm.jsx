import React,{useState} from 'react'

export default function CommentsForm({handleSubmit,setNewComment}) {
    const [comment, setComment] = useState("")

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Write a comment</p>
                </div>

                <div>
                    <textarea
                        maxLength="200"
                        type="text"
                        name="comment"
                        className=""
                        value={comment}
                        onChange={(e)=>{
                            setComment(e.target.value)
                            setNewComment(e.target.value)
                        }}
                    >
                        Enter text here...
                    </textarea>
                </div>

                <button type="submit" onClick={()=>setComment("")}>
                    Confirm
                </button>

            </form>
            
        </div>
    )
}
