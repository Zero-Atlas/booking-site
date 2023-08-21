import { Form, redirect } from "react-router-dom";
import classes from "./Login.module.css";
import { useState } from "react";
import process from "process";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  let formValid;
  if (username && password) {
    formValid = true;
  } else {
    formValid = false;
  }

  return (
    <div className={classes.container}>
      <h1>Login</h1>
      <Form method="post" className={classes.form}>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={usernameChangeHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        <button disabled={!formValid} type="submit">
          Login
        </button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const sendData = { username: username, password: password };

  const response = await fetch(`${process.env.REACT_APP_SERVER}/admin/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendData),
  });
  const data = await response.json();
  if (response.status === 401) {
    alert(data);
    return redirect('/');
  }

  const loginAdmin = data.id;
  localStorage.setItem("loginAdmin", JSON.stringify(loginAdmin));

  return redirect("/dashboard");
}
