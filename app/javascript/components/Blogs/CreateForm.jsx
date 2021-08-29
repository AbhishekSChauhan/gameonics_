import Trix from "trix";
import React,{useMemo,useRef} from 'react'
import Input from '../Input'
import Button from '../Button'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import ReactQuill,{Quill} from "react-quill";
import ImageResize from 'quill-image-resize-module-react';
import Editor from "./Editor";

Quill.register('modules/imageResize', ImageResize);

export default function CreateForm(
    {
    type="create",
    setTitle,setBody,loading,handleSubmit,setImage,
    handleChange,body
    }) {

    const editorRef = useRef(null);

    const modules = useMemo(()=>({
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize', 'Toolbar']
        },
        toolbar:{
            container: [  
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean']  
              ],

              handlers: {
                  image: imageHandler,
              },
              clipboard: {
                matchVisual: false,
              }
        }
    }));

    const formats= [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]
    
    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
            const file = input.files[0];

            // file type is only image.
            if (/^image\//.test(file.type)) {
                console.log("image file type",file)
                saveToServer(file);
            } else {
                console.warn("You could only upload images.");
            }
        };
    };

    function saveToServer(file) {
        const fd = new FormData();
        fd.append("upload", file);  
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/blogs", true);

        xhr.upload.onprogress = function(event){
            const progress =event.loaded / event.total * 100;

        }

        xhr.onload = () => {
            if (xhr.status === 201) {
                // this is callback data: url
                const data = JSON.parse(xhr.responseText);
                const url = data.url
                console.log("Image url",url)
                setImage(url)
                insertToEditor(url);
            }
        };
        xhr.send(fd);
        console.log("formdata",fd)
    }

    function insertToEditor(url) {
        editorRef.current.getEditor().insertEmbed(null, "image", url);
    }

    return (
        <form className="max-w-full prose" onSubmit={handleSubmit}>
            <Input
                label="Title"
                placeholder="Blog Title (Max 50 Characters Allowed)"
                onChange={e => setTitle(e.target.value)}
            />
        
            <ReactQuill 
                theme="bubble"
                placeholder="Write your story" 
                modules={modules}
                formats={formats}
                forwardedRef={editorRef}
                onChange={handleChange}
                value={body}        
            />

            {/* <Editor body={body} /> */}

            <Button
                type="submit"
                buttonText={type === "create" ? "Create Blog" : "Update Blog"}
                loading={loading}
            />
        </form>
    )
}
