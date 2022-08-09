import { useState } from "react";
import { useRef } from "react";
import { MovieSelection } from "./MovieSelection";

export function Login() {
    const inputReference = useRef();
    const [movieSelected, setMoview] = useState(false);
    const [credentials, setCredentials] = useState({
        userName: '',
        password:''
    });

    function updateCredentials (event){
        setCredentials({...credentials, [event.target.name]: event.target.value});

    }

    function submit() {
        console.log('Submit');
        const UserObejct = {
            name: credentials.userName,
            password: credentials.password
        }
        if(UserObejct.name.length && UserObejct.password.length>0){
            console.log(UserObejct);
            fetch('http://localhost:3000/api/login',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(UserObejct)
            })
            .then(res => {
                console.log()
                if(res.status === 200){
                    setMoview(true);
                    console.log('Valid User');
                }
                else{
                    setMoview(false);
                }
            });
        }
        else{
            alert('Please check if you have missed any value!');
        }

    }
    return(
    <div className="movie-login">
        {movieSelected?
            <MovieSelection />
        :
        <div className="login">
            <input ref={inputReference} name="userName" placeholder="User Name" onChange={updateCredentials}></input>
            <input ref={inputReference} name= "password" type="password" placeholder="Password" onChange={updateCredentials}></input>
            <button onClick={submit}>Login</button>
        </div>
        }

    </div>);
}