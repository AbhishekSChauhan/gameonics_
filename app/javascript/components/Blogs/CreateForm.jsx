import React,{useState} from 'react'
import Input from '../Input'
import Button from '../Button'
import ReactQuill from 'react-quill'

export default function CreateForm({type="create",setTitle,setBody,loading,handleSubmit}) {
    const [value, setValue] = useState('');

    return (
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <Input
            label="Title"
            placeholder="Blog Title (Max 50 Characters Allowed)"
            onChange={e => setTitle(e.target.value.slice(0, 50))}
        />
        <Input
            label="Body"
            placeholder="Blog Body (Max Upto your imagination)"
            onChange={e => setBody(e.target.value)}
        />
        <ReactQuill theme="snow" value={value} onChange={setValue}/>
        <Button
            type="submit"
            buttonText={type === "create" ? "Create Blog" : "Update Blog"}
            loading={loading}
        />
    </form>
    )
}
