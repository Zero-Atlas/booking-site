import "./Register.css";
import RegisterForm from "./RegisterForm";
const Register = function () {
  return (
    <article id="register">
      <div className="container">
        <h1>Save time, save money!</h1>
        <p>Sign up and we'll send the best deals for you</p>
        <RegisterForm />
      </div>
    </article>
  );
};
export default Register;
