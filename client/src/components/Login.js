import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../Graphqloperations/Mutation";
import { useMutation } from "@apollo/client";


export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signinUser, { loading, error, data }] = useMutation(LOGIN_USER);


  if(data)
  {
     localStorage.setItem("token",data.signinUser.token)
     navigate('/')
  }


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
signinUser({
    variables:{
        userSignin:formData
    }
})

  };
  return (
    <div className="container my-container">
      {loading && <h1>loading..</h1>}

      {error && <div className="red card-panel"> {error.message}</div>}

      <h5>Login!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <Link to="/signup">
          <p>Dont have an account ?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
