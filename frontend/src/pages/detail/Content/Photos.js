import "./Photos.css";

const Photos = function (props) {
  return (
    <ul className="detail-photos">
      {props.photos.map((imageUrl, index) => (
        <li className="detail-image" key={index}>
          <img src={imageUrl} alt="" />
        </li>
      ))}
    </ul>
  );
};

export default Photos;
