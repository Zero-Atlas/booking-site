import "./FooterColumn.css";
const FooterColumn = function (props) {
  return (
    <ul className="footer-col" key={props.col["col_number"]}>
      {props.col["col_values"].map((data) => (
        <li className="footer-item" key={data}>
          <a href="/">{data}</a>
        </li>
      ))}
    </ul>
  );
};
export default FooterColumn;
