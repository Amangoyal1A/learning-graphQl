import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CREATE_USER } from "../Graphqloperations/Mutation";
import { useMutation } from "@apollo/client";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [signupUser, { loading, error, data }] = useMutation(CREATE_USER);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userNew:formData
      },
    });
  };

  return (
    <div className="container my-container">
      {loading && <h1>loading..</h1>}

      {error && <div className="red card-panel"> {error.message}</div>}

      {data && data.createUser && (
        <div className="green card-panel">
          {data.createUser.fname} is Signed up | you can login now
        </div>
      )}

      <h5>Signup!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="fname"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lname"
          onChange={handleChange}
          required
        />
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
        <Link to="/login">
          <p>Already have an account?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}