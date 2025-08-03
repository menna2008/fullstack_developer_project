import React, { useState } from 'react';
import './Register.css'
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const gohome = () => {
        window.location.href = window.location.origin
    }

    const register = async(e) => {
        e.preventDefault()
        const register_url = window.location.origin + '/djangoapp/register'
        const res = await fetch(register_url, {
            method : 'POST',
            headers: {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify({
                'userName' : userName,
                'password' : password,
                'firstName' : firstName,
                'lastName' : lastName,
                'email' : email
            })
        })

        const json = await res.json()
        if (json.status) {
            sessionStorage.setItem('username', json.userName)
            window.location.href = window.location.origin
        } else if (json.error) {
            alert(json.error)
            window.location.href = window.location.origin
        }
    }

    return (
        <div className="register_container" style={{width: "50%"}}>
            <div className="header" style={{display: "flex",flexDirection: "row", justifyContent: "space-between"}}>
                <span className="text" style={{flexGrow:"1"}}>SignUp</span> 
                <div style={{display: "flex",flexDirection: "row", justifySelf: "end", alignSelf: "start" }}>
                <a href="/" onClick={()=>{gohome()}} style={{justifyContent: "space-between", alignItems:"flex-end"}}>
                <img style={{width:"1cm"}} src={close_icon} alt="X"/>
                </a>
                </div>
                <hr/>
            </div>
            <form onSubmit={register}>
                <div className='inputs'>
                    <div className='input'>
                        <img src={user_icon} className='img_icon' alt="Username"></img>
                        <input type='text' name='username' placeholder="username" className="input_field" onChange={(e) => setUserName(e.target.value)}></input>
                    </div>
                    <div className='input'>
                        <img src={user_icon} className='img_icon' alt="First Name"></img>
                        <input type='text' name='first_name' placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)}></input>
                    </div>
                    <div className='input'>
                        <img src={user_icon} className='img_icon' alt="Last Name"></img>
                        <input type='text' name='last_name' placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)}></input>
                    </div>
                    <div className='input'>
                        <img src={email_icon} className='img_icon' alt="Email"></img>
                        <input type='text' name='email' placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className='input'>
                        <img src={password_icon} className='img_icon' alt="Password"></img>
                        <input type='text' name='password' placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                </div>
                <div className='submit_panel'>
                    <input type='submit' className='submit' value='Register'></input>
                </div>
            </form>
        </div>
    )
}

export default Register;