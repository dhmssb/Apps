import React,{useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'


const SignIn = () => {
    const history = useHistory()
    const[name,setName] = useState('')
    const[password,setPassword] = useState('')
    const[email,setEmail] = useState('')
    const [image,setImage] = useState('')
    const [url,setUrl] = useState(undefined)
    
    useEffect(()=> {
        if(url){
            uploadFields()
        }
    }, [url])

    const uploadPic =() => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset','instapp-dhms')
        data.append('cloud_name','project-redv')

        fetch('https://api.cloudinary.com/v1_1/project-redv/image/upload',{
            method:'post',
            body:data
        })
        .then(res=> res.json())
        .then(data=> {
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const uploadFields = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:'Invalid email', classes:'#c62828 red darken-3'})
             return
         }
         fetch('http://localhost:5000/signup',{
             method: 'post',
             headers:{
                 'Content-Type' : 'application/json' 
             },
             body:JSON.stringify({
                 name,
                 password,
                 email,
                 pic:url
             })
         }).then(res => res.json())
         .then(data =>{
             console.log(data)
             if(data.message === 'success signup'){
                 M.toast({html: data.message, classes:'#9ccc65 light-green lighten-1'})
                 history.push('/signin')
             }else{
                 M.toast({html: data.message, classes:'#c62828 red darken-3'})
                 
             }
         })
         .catch(err=> {
             console.log(err)
         })
 

    }

    const PostData =()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
        
    }

    return(
        <div className='mycard'>
            <div className="card auth-card input-fields">
                <h2>InstApp</h2>
                <input 
                type='text'
                placeholder='username'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input 
                type='text'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
               <input 
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #0d47a1 blue darken-2">
                        <span>Upload Pict</span>
                        <input type="file" onChange= {(e) => setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
                <button className="btn waves-effect waves-light #039be5 #0d47a1 blue darken-2"
                onClick={() => PostData()}
                >
                    Signup
                </button>
                <h6>
                    <Link to='/signin'>Already have an account</Link>
                </h6>
            </div>
        </div>
    )

}

export default SignIn