import "./Header.css";
import HeaderForm from "./HeaderForm";
const Header = function () {
  return (
    <header>
      <div className="container">
        <h1>A lifetime of discounts? It's Genius.</h1>
        <p>
          Get rewarded for your travels - unlock distance savings of 10% or more
          with a free account
        </p>
        <button className="btn cta-btn">Sign in / Register</button>
        <HeaderForm />
      </div>
    </header>
  );
};
export default Header;
