import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Login from "../Components/Animation/Login/Login";
import Swal from "sweetalert2";
import PrivateRoute from "../PrivateRoute";

export default function AuthenticationPage() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    let details = {
      email: document.getElementById("auth_email").value,
      password: document.getElementById("auth_pass").value,
    };
    setIsLogged(true);
    fetch(process.env.REACT_APP_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then(async (response) => {
        let data = await response.json();
        if (!data.authentication) {
          setIsLogged(false);
          Swal.fire("Invalid Email or Password", "", "error");
          sessionStorage.setItem("auth", JSON.stringify(false));
        } else {
          setIsLogged(true);
          sessionStorage.setItem("auth", JSON.stringify(true));
          navigate("/launchpad", { replace: true });
        }
      })
      .catch((err) => {
        setIsLogged(false);
        console.log(err);
      });
  }
  return (
    <>
      {isLogged ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
            color: "white",
          }}
        >
          {/* <h1>Loading...</h1> */}
          <Login />
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            borderRadius: "10px",
            width: "100%",
            // justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              flexDirection: "column",
            }}
          >
            <Form onSubmit={login}>
              <div
                style={{
                  height: "100%",
                  borderRadius: "10px",
                  width: "35rem",
                }}
              >
                <div>
                  <Login />
                  <Heading>Admin Login</Heading>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="email"
                    id="auth_email"
                    name="email"
                    style={{
                      padding: "2px",
                      borderRadius: 10,
                      margin: 10,
                      width: "80%",
                    }}
                    placeholder="Enter Email Address"
                  />

                  <input
                    name="password"
                    id="auth_pass"
                    type="password"
                    style={{
                      padding: "2px",
                      borderRadius: 10,
                      margin: 10,
                      width: "80%",
                    }}
                    placeholder="Enter Password"
                  />

                  <Button
                    type="submit"
                    style={{
                      textDecoration: "none",
                      color: "#daecf8",
                    }}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </Form>
            <div>
              <Link
                to="/forgotpass"
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  // marginRight: "66px",
                  // marginTop: "-21px",
                  textDecoration: "none",
                }}
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Form = styled.form`
  display: flex;
  padding: 32px;
  width: 300px;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Heading = styled.h1`
  font-size: 40px;
  color: white;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 10px;
 width:30%
  margin: 20px;
  border: none;
  background-color: #d48635;
  border-radius: 10px;
  display: flex;
`;
// const Wrapper = styled.table`
//   @media (max-width: 530px) {
//   }
// `;
