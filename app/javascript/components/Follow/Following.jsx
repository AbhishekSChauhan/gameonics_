import React, { useState, useEffect,Fragment } from 'react'
import { useParams, Link, useHistory,useLocation } from 'react-router-dom'
import axios from "axios";
import Follow from './Follow';
import { FaUser } from 'react-icons/fa'
import usersApi from '../apis/users';
import PageLoader from '../PageLoader';

const Following = ({user}) => {
    // let history = useHistory()
    const location = useLocation();
    const {username} = useParams()

    // const {user,selectedUser,receiveFollows} = location.state
    

    const [loading, setLoading] = useState(false)
    const [selectedUserFollowing, setSelectedUserFollowing] = useState([])
    const [currentUserFollowings, setCurrentUserFollowings] = useState([])
    const [receivedFollows, setReceivedFollows] = useState([])
    const [currentUserGivenFollows, setCurrentUserGivenFollows] = useState([])
    const [selectedUser, setSelectedUser] = useState()
    const [fromFollowingsPage, setFromFollowingsPage] = useState(false)

    const getFollowings = async() => {        
        try{
            setLoading(true)
            const response = await axios.get(`/users/${username}/following`)
            console.log('Followings',response)
            setSelectedUserFollowing(response.data.user_followings)
            setReceivedFollows(response.data.received_follows)
            // setSelectedUser(response.data.selected_user)
            setLoading(false)
        } catch(error){
            console.log(error)
        }       
    }

    const getCurrentUserFollowings = async() => {        
        try{
            setLoading(true)
            const response = await axios.get(`/users/${user.username}/following`)
            console.log('getCurrentUserFollowings',response)
            setCurrentUserFollowings(response.data.user_followings)
            setCurrentUserGivenFollows(response.data.given_follows)
            setFromFollowingsPage(true)
            // setSelectedUser(response.data.selected_user)
            setLoading(false)
        } catch(error){
            console.log(error)
        } 
    }

    // if(loading){
    //     return <PageLoader />
    // }

    useEffect(() => {
        getFollowings()
        getCurrentUserFollowings()
    }, [])

    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto mt-10">
            <div className="relative max-w-4xl mx-auto items-center justify-between">
            <div className="relative max-w-sm mx-auto items-center flex flex-col">
                <h1>{username}'s Followings</h1>
            {selectedUserFollowing.map((Following)=>(
            <div className="relative flex items-center w-full justify-between h-16">
                <div className="mx-5">
                    {!Following.profile_image && (
                        <FaUser className="block rounded-full shadow-xl text-gray-500 h-10 w-10 bg-cover bg-center" />
                    )}
                    {Following.profile_image && (
                        <img className="block rounded-full shadow-xl h-10 w-10 bg-cover bg-center"
                        src={Following.profile_image} />

                    )}
                    {/* <div className="pt-4">
                        <svg width={1} height={40} viewBox="0 0 1 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0.5" y1="2.18557e-08" x2="0.499998" y2={47} stroke="#D1D5DB" strokeDasharray="2 2" />
                        </svg>
                    </div> */}
                </div>
                <div className="mx-auto ml-4 w-12">
                    <p className="text-sm font-semibold leading-normal text-gray-800">{Following.username}</p>
                </div>
                <div className="mx-auto ml-20">
                    <Follow
                    user={user}
                    username={Following.username}
                    selectedUser={Following} 
                    receivedFollows={currentUserGivenFollows}
                    setReceivedFollows={setCurrentUserGivenFollows}
                    fromFollowersPage={fromFollowingsPage}
                    />                
                </div>
            </div>
            ))}            
        </div>
    </div>
    </div>
    </div>        
    )
}

export default Following
