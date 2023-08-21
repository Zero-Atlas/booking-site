import SearchListItem from "./SearchListItem";
import "./SearchList.css";

const SearchList = function (props) {
  const searchListData = props.data;
  return (
    <ul className="search-list">
      {searchListData.map((data,i) => (
        <li key={i}>
          <SearchListItem result={data} />
        </li>
      ))}
    </ul>
  );
};
export default SearchList;
