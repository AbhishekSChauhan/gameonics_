import React, { Component } from 'react'
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';
import axios from 'axios';
import toast from "react-hot-toast";
import Button from '../Button';
import Input from '../Input';

export default class Editor extends Component {
    constructor(props) {
		super(props);

		this.modules = {
			toolbar: [
		      [{ 'font': [] }],
		      [{ 'size': ['small', false, 'large', 'huge'] }],
		      ['bold', 'italic', 'underline'],
		      [{'list': 'ordered'}, {'list': 'bullet'}],
		      [{ 'align': [] }],
		      [{ 'color': [] }, { 'background': [] }],
              ['link', 'image', 'video'],
		      ['clean']
		    ]
		};

		this.formats = [
		    'font',
		    'size',
		    'bold', 'italic', 'underline',
		    'list', 'bullet',
		    'align',
            'link','image','video',
		    'color', 'background'
	  	];

        this.state={
            title:'',
            body: '',
            // loading:false,
        }

		this.rteChange = this.rteChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.titleChange = this.titleChange.bind(this);
	}

	rteChange = (content, delta, source, editor) => {
        this.setState({
            body:editor.getHTML()
        })
		console.log("Richh text",editor.getHTML()); // rich text
		console.log("get contents = ",editor.getContents()); // plain text
		console.log("length",editor.getLength()); // number of characters
	}

    handleSubmit=async(event)=>{
        event.preventDefault();
        const variables ={
            title: this.state.title,
            body: this.state.body
        }
        try{
            const response = await axios.post("/blogs",variables)
            // this.setState({
            //     loading:false
            // })
            if(response){
                response.success = response.status === 200;
                if(response.data.notice){
                    toast.success(response.data.notice)
                }
            }
            this.props.history.push('/blogs')
        }catch(error){
            // this.setState({
            //     loading:false
            // })
            if(error){
                toast.error(
                    error.response?.data?.notice ||
                    error.response?.data?.error ||
                    error.message ||
                    error.notice ||
                    "Something went wrong!"
                )
            }
        }
    }

    titleChange = (e) => {
        this.setState({
            title:e.target.value
        })
		console.log(this.state.title)
	}

    
    render() {
        return (
            <div>
                <form className="max-w-full" onSubmit={this.handleSubmit}>
                    <Input
                        label="Title"
                        placeholder="Blog Title (Max 50 Characters Allowed)"
                        onChange={this.titleChange}
                    />
                    <ReactQuill theme="snow"  modules={this.modules}
                        formats={this.formats} onChange={this.rteChange}
                        value={this.state.body || ''}/>                     
                   

                    <button type="submit">Submit</button>
                </form>               
            </div>
        )
    }
}
