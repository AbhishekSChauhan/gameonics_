import React,{useState,useEffect} from 'react'

const Tags = ({tags,setTags,input,setInput,isKeyReleased,setIsKeyReleased}) => {
    // const [input, setInput] = useState('')
    // const [isKeyReleased, setIsKeyReleased] = useState(false);

    // useEffect(()=>{
    //     onKeyDown();
    // },[tags])

    const onKeyDown = (e) => {
        const val = e.target.value
        if((e.key === 'Enter' || e.key === ',' || e.key === ' ') && val ){
            if(tags.find(tag => tag.toLowerCase() === val.toLowerCase())){
                return
            }
            e.preventDefault()
            setTags(prevState => [...prevState,val])
            setInput('')
        }   
        if(e.key === 'Backspace' && !val && isKeyReleased){            
            const tagsCopy = [...tags]
            const poppedTag = tagsCopy.pop()
            e.preventDefault()
            setTags(tagsCopy)
            setInput(poppedTag)
        }     
        setIsKeyReleased(false)
    }

    const onKeyUp = () => {
        setIsKeyReleased(true)
    }

    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    return (
        <div>
            {/* {tags.map((tag,index) => (
                <li key={tag}>
                    {tag}
                    <button type="button" 
                        onClick={deleteTag(index)}
                    >Remove</button>
                </li>
            )
            )} */}
            <input
                required={true}
                value={tags}
                // onKeyDown={onKeyDown}
                // onKeyUp={onKeyUp}
                onChange={(e) => setTags(e.target.value)}
                // onChange={(e) => setInput(e.target.value)}
                placeholder="Enter tags"
                className="block w-full px-3 py-2 placeholder-gray-400
                transition duration-150 ease-in-out border
                border-gray-300 rounded-md appearance-none
                focus:outline-none focus:shadow-outline-blue
                focus:border-blue-300 sm:text-sm sm:leading-5"
            />
            
        </div>
    )
}

export default Tags
