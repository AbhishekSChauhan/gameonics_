import Trix from "trix";
import React, { useState } from "react";
import { ReactTrixRTEInput  } from "react-trix-rte";
import Input from '../Input'
import Button from '../Button'
import QuillEditor from './QuillEditor'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateForm(
    {
    type="create",
    setTitle,setBody,loading,handleSubmit,
    // onEditorChange,onFilesChange,
    handleChange,body
    }
    ) {
    const  modules = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],              
                [{ header: '1' }, { header: '2' },{header:[3,4,5,6]}],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link','image','video'],
                // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
              
                // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              
                // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ align: ''},{align:'center'},{align:'right'},{align:'justify'}],
              
                ['clean']                                         // remove formatting button
            ],
          }
    
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'video',
        'code-block',
        'align',
    ]
        

    return (
        <form className="max-w-full" onSubmit={handleSubmit}>
        <Input
            label="Title"
            placeholder="Blog Title (Max 50 Characters Allowed)"
            onChange={e => setTitle(e.target.value)}
        />
        {/* <Input
            label="Body"
            placeholder="Blog Body (Max Upto your imagination)"
            onChange={e => setBody(e.target.value)}
        /> */}
        
        {/* Quill Editor */}

        {/* <QuillEditor 
            placeholder={"Start posting something"}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
        /> */}
        {/* <ReactTrixRTEToolbar 
            toolbarActions = {
                ["bold", "italic", "strike", "link", "heading1", "quote", "code", "bullet", 
                "number", "outdent", "indent", "attachFiles", "undo", "redo"]
        }
        /> */}
        {/* <ReactTrixRTEInput 
            defaultValue="<div>React Trix text editor</div>"
            onChange={handleChange}
            isRailsDirectUpload='true'
        /> */}
        <ReactQuill 
            theme="snow"
            placeholder="Write your story" 
            modules={modules}
            formats={formats}
            onChange={setBody}
            value={body}        
        />




        <Button
            type="submit"
            buttonText={type === "create" ? "Create Blog" : "Update Blog"}
            loading={loading}
        />
    </form>
    )
}
