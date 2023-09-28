// import {useContext, useState} from "react";
// import {Navigate} from "react-router-dom";
// import {UserContext} from "../UserContext";

// export default function LoginPage() {
//   const [username,setUsername] = useState('');
//   const [password,setPassword] = useState('');
//   const [redirect,setRedirect] = useState(false);
//   const {setUserInfo} = useContext(UserContext);
//   async function login(ev) {
//     ev.preventDefault();
//     const response = await fetch('http://localhost:4000/login', {
//       method: 'POST',
//       body: JSON.stringify({username, password}),
//       headers: {'Content-Type':'application/json'},
//       credentials: 'include',
//     });
//     if (response.ok) {
//       response.json().then(userInfo => {
//         setUserInfo(userInfo);
//         setRedirect(true);
//       });
//     } else {
//       alert('wrong credentials');
//     }
//   }

//   if (redirect) {
//     return <Navigate to={'/'} />
//   }
//   return (
//     <form className="login" onSubmit={login}>
//       <h1>Login</h1>
//       <input type="text"
//              placeholder="username"
//              value={username}
//              onChange={ev => setUsername(ev.target.value)}/>
//       <input type="password"
//              placeholder="password"
//              value={password}
//              onChange={ev => setPassword(ev.target.value)}/>
//       <button>Login</button>
//     </form>
//   );
// }

import React, { useContext, useState } from "react";
import axiosInstance from "../axiosInstance"; // Import Axios
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate(); // Use useNavigate for navigation

  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await axiosInstance.post('/login', {
        username,
        password,
      }, {
        withCredentials: true, // Send cookies with the request
      });

      if (response.status === 200) {
        const userInfo = response.data;
        setUserInfo(userInfo);
        navigate('/'); // Navigate to the home page
      } else {
        alert('Wrong credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed');
    }
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
