import { Form, redirect, useSearchParams } from "react-router-dom";
import classes from "./Login.module.css";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchParam] = useSearchParams();

  const action = searchParam.get("action");
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
      <h1>{action === "login" ? "Login" : "Sign up"}</h1>
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
        <input type="hidden" value={action} name="action" />
        <button disabled={!formValid} type="submit">
          {action === "login" ? "Login" : "Create Account"}
        </button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");
  const username = formData.get("username");
  const password = formData.get("password");
  const sendData = { username: username, password: password };

  const response = await fetch(`${process.env.REACT_APP_SERVER}/user/${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendData),
  });
  const data = await response.json();
  if (response.status === 401) {
    alert(data);
    return redirect(`/login?action=${action}`);
  }
  if (action === "login") {
    const loginUser = data.id;
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
  }else{
    return redirect('/login?action=login')
  }
  return redirect("/");
}
