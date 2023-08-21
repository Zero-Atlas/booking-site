
import "./City.css";
const City = function (props) {
  const cityList = props.data
  return (
    <section className="cities">
      {cityList.map((c) => (
        <div
          className="city-container"
          key={c.name}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)) ,url(${c.image})`,
          }}
        >
          <div className="city-text-box">
            <h2>{c.name}</h2>
            <p>{c.subText}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
export default City;
