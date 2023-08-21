import "./Description.css";

const Description = function (props) {
  return (
    <div className="detail-description">
      <h2 className="title">{props.title}</h2>
      <p className="desc">{props.desc}</p>
    </div>
  );
};

export default Description;
