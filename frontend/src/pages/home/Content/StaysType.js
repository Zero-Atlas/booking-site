import "./StaysType.css";

const StaysType = function (props) {
  const typeList = props.data
  return (
    <section className="stays-type">
      <h2 className="section-title">Browse by property type</h2>
      <div className="types">
        {typeList.map((t) => (
          <div key={t.name} className="type-container">
            <div
              className="type-img"
              style={{ backgroundImage: `url(${t.image})` }}
            ></div>
            <h3>{t.name}</h3>
            <p>{t.count} hotels</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default StaysType;