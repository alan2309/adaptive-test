import React from 'react'
import { useNavigate } from "react-router";

function Error() {
    const navigate = useNavigate()
    return (
        <div>
            <h3> Error cannot open multiple instances</h3>
           <h5>Test is open on another tab</h5> 
           <button onClick={()=>navigate('/logout')}>Log In Again</button>
        </div>
    )
}

export default Error
