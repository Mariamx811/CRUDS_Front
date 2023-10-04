import React, { useDebugValue } from 'react'
import './UserPop.css'
import IUser from '../Iuser'
interface Props {
    flag: boolean,
    user: IUser | undefined,
    stat:(user:IUser|undefined) => void
}

function UserPop(props:Props) {
    console.log(props)    
  return ( props.user ?
    <div className='popup'>
        <div className='pop-inner'>
            <h1 className='title'>{props.user.name}'s Details</h1>
            <div className='info'>
                <p>
                    Name: {props.user.name}
                    <br/>
                    UserName: {props.user.user}
                    <br/>
                    Email: {props.user.mail}
                    <br/>
                    Gender: {props.user.gender}
                    <br/>
                    Activation: {props.user.active === 1? "Active":"InActive"}
                </p>
            </div>
          <button className='close-btn' onClick={()=> props.stat(undefined) }>Close</button>
        </div>
    </div>
    : null)
}

export default UserPop;