import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'


const Profile = () => {

    const [userProfile,setProfile] = useState(null)
    const [showFollow, setShowFollow] = useState(true)
    const {state, dispatch} = useContext(UserContext)
    const {userId} = useParams()
    useEffect(() => {
        fetch(`http://localhost:5000/user/${userId}`,{
            method:'get',
            headers: {
                'Authorization':'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
           
           setProfile(result)
        })

    }, [])

    const followUser = () => {
        fetch('http://localhost:5000/user/follow',{
            method:'put',
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userId
            })
        }).then(res => res.json())
        .then(data => {
            //console.log(data)
            dispatch({type: 'UPDATE', 
            payload: {
                following: data.following,
                followers: data.followers
            }
        })
            localStorage.setItem('user', JSON.stringify(data))
            setProfile((prevState) =>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
     })
    }

    const unfollowUser = () => {
        fetch('http://localhost:5000/user/unfollow',{
            method:'put',
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userId
            })
        }).then(res => res.json())
        .then(data => {
            //console.log(data)
            dispatch({type: 'UPDATE', 
            payload: {
                following: data.following,
                followers: data.followers
            }
        })
            localStorage.setItem('user', JSON.stringify(data))

            setProfile((prevState) =>{
                const newFollower = prevState.user.followers.filter(item=> item!== data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowFollow(true)
     })
    }

    return(
        <>
        {userProfile?
        <div style={{maxWidth:'550px', margin:'0px auto'}}>
            <div style = {{
                display:'flex',
                justifyContent:'space-around',
                margin:'18 px 0px',
                borderBottom:'1px solid grey'
            }}>
                <div>
                    <img style ={{width:'160px',height:'160px',borderRadius:'80px'}}
                    src="https://images.unsplash.com/photo-1599140781162-68659a79e313?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                    <div style = {{display:'flex', justifyContent:'space-between', width:'105%'}}>
                        <h6>{userProfile.posts.length} posts</h6>
                        <h6>{userProfile.user.followers.length} followers</h6>
                        <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    {showFollow?
                
                    <button style={{
                        margin: '10px'
                    }} className="btn waves-effect waves-light #039be5 #0d47a1 blue darken-2"
                        onClick= {() => followUser()}
                        >
                            Follow
                    </button>
                    :
                    <button style={{
                        margin: '10px'
                    }}className="btn waves-effect waves-light #039be5 #0d47a1 blue darken-2"
                        onClick= {() => unfollowUser()}
                        >
                            unFollow
                    </button>
                }
                    
                </div>
            </div>
       
            <div className='gallery'>
                {
                    userProfile.posts.map(item => {
                        return(
                            <img key={item._id} className='item' src={item.photo} alt={item.title}/>
                        )
                    })
                }
                
                
            </div>
        </div>
        
        :<h2>loading..!</h2>}
        
        </>
    )

}

export default Profile