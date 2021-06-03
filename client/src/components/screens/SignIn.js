import React from 'react'
import {Link} from 'react-router-dom'

const SignIn = () => {
    return(
        <div className='mycard'>
            <div className="card auth-card input-fields">
                <h2>InstApp</h2>
                <input 
                type='text'
                placeholder='email'
                />
               <input 
                type='text'
                placeholder='password'
                />
                <button className="btn waves-effect waves-light #039be5 #0d47a1 blue darken-2">
                    Login
                </button>
                <h6>
                    <Link to='/signup'>Dont have an account ?</Link>
                </h6>
            </div>
        </div>
    )

}

export default SignIn