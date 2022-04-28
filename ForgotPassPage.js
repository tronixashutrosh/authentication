import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Login from "../Components/Animation/Login/Login";
import Swal from "sweetalert2";

function ForgotPassPage() {
  const navigate = useNavigate();
  function changePassword(e) {
    e.preventDefault();
    const currentEmail = document.getElementById("auth_email").value;
    const newPass = document.getElementById("newpass").value;
    let details = {
      email: currentEmail,
      password: newPass,
    };

    // console.log(details);

    fetch(process.env.REACT_APP_URL + "/auth/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then(async (response) => {
        let data = await response.json();
        // console.log(data);
        if (data.status) {
          Swal.fire("Password has changed", "", "success");
          navigate("/launchpad", { replace: true });
        } else {
          Swal.fire("Invalid Email or Password", "", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // if (oldEmail !== currentEmail) {
    //   Swal.fire("Your email doesn't match");
    // } else {
    //   if (newPass === confirmPass) {
    //     navigate("/launchpad", { replace: true });
    //   } else {
    //     Swal.fire("Password doesn't match");
    //   }
    // }
  }
  return (
    <>
      {" "}
      <div
        style={{
          height: "100vh",
          borderRadius: "10px",
          width: "100%",
          justifyContent: "",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <Form onSubmit={changePassword}>
            <div
              style={{
                height: "100%",
                borderRadius: "10px",
                width: "35rem",
              }}
            >
              <div>
                <Login />
                <Heading>Forgot Password</Heading>
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
                  type="password"
                  id="newpass"
                  name="newpass"
                  style={{
                    padding: "2px",
                    borderRadius: 10,
                    margin: 10,
                    width: "80%",
                  }}
                  placeholder="Enter new password"
                />

                <Button
                  type="submit"
                  style={{
                    textDecoration: "none",
                    color: "#daecf8",
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </Form>
          <div>
            <Link
              to="/auth"
              style={{
                textAlign: "center",
                cursor: "pointer",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              Back to Login page!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassPage;

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
