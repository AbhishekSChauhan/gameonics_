import React,{useMemo,useRef} from 'react'
import Input from '../Input'
import Button from '../Button'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import ReactQuill,{Quill} from "react-quill";
import ImageResize from 'quill-image-resize-module-react';
import ImageUploadModal from '../ProfilePage/ImageUploadModal'
import toast from 'react-hot-toast'

Quill.register('modules/imageResize', ImageResize);

export default function CreateForm(
    {
    type="create",
    loading,handleSubmit,setImage,handleTitleChange,
    handleBodyChange,body,title,handleCheckFileSize,imageSelected
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

    const handleImageError = () => {
        toast.error('Image not selected')
    }


    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto mt-10">
                <div className="relative max-w-4xl mx-auto items-center justify-between">
                    <div className="flex flex-col ">
                        <div className="w-full ">
                            <form className="max-w-full" onSubmit={imageSelected ? handleSubmit : handleImageError}>
                                <ReactQuill 
                                    theme="bubble"
                                    placeholder="Your amazing title" 
                                    modules={titlemodules}
                                    formats={titleformats}
                                    forwardedRef={editorRef}
                                    onChange={handleTitleChange}
                                    value={title}        
                                />

                                <div className="flex items-center justify-center py-1 overflow-hidden">

                                    <div className="mt-2">                    
                                        <input
                                            type="file"
                                            id="bannerImage"
                                            name="banner_image"
                                            accept="image/png, image/jpeg, image/jpg"
                                            onChange={handleCheckFileSize}
                                        />                    
                                    </div>
                                </div>

                            
                                <ReactQuill 
                                    theme="bubble"
                                    placeholder="Write your story" 
                                    modules={modules}
                                    formats={formats}
                                    forwardedRef={editorRef}
                                    onChange={handleBodyChange}
                                    value={body}        
                                />

                                <Button
                                    type={imageSelected ? "submit" : 'botton' }
                                    buttonText={type === "create" ? "Preview and Save as Draft" : "Update Blog"}
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
