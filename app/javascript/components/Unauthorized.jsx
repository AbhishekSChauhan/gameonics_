import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto mt-10">
                <div className="relative max-w-4xl mx-auto items-center justify-between">
                    <div className="w-full">
                        <div className="flex flex-row items-center justify-center py-1 overflow-hidden">
                        <img className="block rounded-full shadow-xl mx-auto h-60 w-60 bg-cover bg-center" 
                            src="https://i.pinimg.com/originals/00/6c/c6/006cc632063816c8eace82eca3be7c59.jpg"
                        />
                        <div class="message">
                                <h1>403 - You Shall Not Pass</h1>
                                <p>Uh oh, Gandalf is blocking the way!<br />Maybe you have a typo in the url? Or you meant to go to a different location? Like...Hobbiton?</p>
                        </div>
                        <p><Link to='/'>Back to Home</Link></p>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Unauthorized
