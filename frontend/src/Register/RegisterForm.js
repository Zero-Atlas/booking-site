import "./RegisterForm.css";
const RegisterForm = function () {
  return (
    <form className="form-register">
      <input type="email" placeholder="Your Email" />
      <button type="submit" className="btn btn-submit-register">
        Subcribe
      </button>
    </form>
  );
};
export default RegisterForm;
