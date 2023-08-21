import SearchList from "./Content/SearchList";
import SearchPopup from "./Content/SearchPopup";
import { json, useActionData } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const data = useActionData();
  return (
    <article id="search">
      <div className="container">
        <SearchPopup />
        {data && <SearchList data={data} />}
      </div>
    </article>
  );
};

export default Search;

export async function action({ request }) {
  const receive = await request.formData();
  const dateString = receive.get("date");
  const date = dateString.split(" to ").map((d) => new Date(d));
  // data receive from form
  const inputData = {
    city: receive.get("city"),
    startDate: date[0],
    endDate: date[1],
    people: Number(receive.get("adult")) + Number(receive.get("children")),
    rooms: Number(receive.get("rooms")),
  };

  const response = await fetch("http://localhost:5000/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputData),
  });

  if (!response.ok) {
    throw json({ message: "fail to fetch", status: 500 });
  }
  const data = await response.json();

  return data;
}
