import React from 'react'


const Profile = () => {
    return(
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
                    <h4>red dhmssb</h4>
                    <div style = {{display:'flex', justifyContent:'space-between', width:'105%'}}>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>
       
            <div className='gallery'>
                <img className='item' src='https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>
                <img className='item' src='https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>
                <img className='item' src='https://images.unsplash.com/photo-1536590158209-e9d615d525e4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>
                <img className='item' src='https://images.unsplash.com/photo-1536590158209-e9d615d525e4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>
                <img className='item' src='https://images.unsplash.com/photo-1536590158209-e9d615d525e4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>
                <img className='item' src='https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>
            </div>
        </div>
    )

}

export default Profile