import React,{useMemo,useRef} from 'react'
import Input from '../Input'
import Button from '../Button'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import ReactQuill,{Quill} from "react-quill";
import ImageResize from 'quill-image-resize-module-react';
import toast from 'react-hot-toast'
import Tags from '../Tags/Tags'

Quill.register('modules/imageResize', ImageResize);

export default function CreateForm(
    {
    type="create",loading,handleSubmit,setImage,tags,setTags,
    handleTitleChange,handleBodyChange,body,title,setTitle,input,setInput,setIsKeyReleased,isKeyReleased
    }) {

    const editorRef = useRef(null);

    const titlemodules = useMemo(()=>({
        toolbar:{
            container: [  
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
              ]
        }
    }));

    const modules = useMemo(()=>({
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize', 'Toolbar']
        },
        toolbar:{
            container: [  
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                // [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                // ['clean']  
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

    const titleformats= [
        'header', 'font'
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
        xhr.open("POST", "/blog", true);

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
        <div className="bg-white">
            <div className="max-w-6xl mx-auto mt-10">
                <div className="relative max-w-4xl mx-auto items-center justify-between">
                    <div className="flex flex-col ">
                        <div className="w-full ">
                            <form className="max-w-full" onSubmit={handleSubmit}>
                                {/* <ReactQuill 
                                    theme="bubble"
                                    placeholder="Your amazing title" 
                                    modules={titlemodules}
                                    formats={titleformats}
                                    forwardedRef={editorRef}
                                    onChange={handleTitleChange}
                                    value={title}        
                                /> */}

                                <input
                                    required={true}
                                    value={title}
                                    // onKeyDown={onKeyDown}
                                    // onKeyUp={onKeyUp}
                                    onChange={(e) => setTitle(e.target.value)}
                                    // onChange={(e) => setInput(e.target.value)}
                                    placeholder="Enter Title"
                                    className="block w-full px-3 py-2 placeholder-gray-400
                                    transition duration-150 ease-in-out border
                                    border-gray-300 rounded-md appearance-none
                                    focus:outline-none focus:shadow-outline-blue
                                    focus:border-blue-300 sm:text-sm sm:leading-5"
                                />
                            
                                <ReactQuill 
                                    theme="bubble"
                                    placeholder="Write your story" 
                                    modules={modules}
                                    formats={formats}
                                    forwardedRef={editorRef}
                                    onChange={handleBodyChange}
                                    value={body}        
                                />

                                <Tags 
                                    tags={tags}
                                    setTags={setTags}
                                    isKeyReleased={isKeyReleased}
                                    setIsKeyReleased={setIsKeyReleased}
                                    input={input}
                                    setInput={setInput}
                                />

                                <Button
                                    type="submit" disabled={loading}
                                    buttonText={type === "create" ? "Preview and Save as Draft" : "Update and Preview"}
                                    loading={loading}
                                />
                                
                            </form>          
                        </div>  
                    </div>
                </div>
            </div>
        </div>

        
    )
}
