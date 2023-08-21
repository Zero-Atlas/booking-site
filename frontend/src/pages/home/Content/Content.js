import { defer, useRouteLoaderData, json, Await } from "react-router-dom";
import City from "./City";
import Hotels from "./Hotels";
import StaysType from "./StaysType";
import process from "process";
import { Suspense } from "react";

const Content = function () {
  const { city, type, topRating } = useRouteLoaderData("home");
  return (
    <article>
      <div className="container">
        <City data={city} />
        <Suspense fallback={"Loading"}>
          <Await resolve={type}>{(type) => <StaysType data={type} />}</Await>
        </Suspense>

        <Hotels data={topRating} />
      </div>
    </article>
  );
};
export default Content;

export const loader = async () => {
  const [city, topRating] = await Promise.all([fetchCity(), fetchTopRating()]);
  return defer({
    city,
    type: fetchType(),
    topRating,
  });
};

async function fetchCity() {
  const response = await fetch(`${process.env.REACT_APP_SERVER}/home/city`);
  if (!response.ok) {
    throw json({ message: "fail to fetch", status: 500 });
  }
  const data = await response.json();
  return data;
}
async function fetchType() {
  const response = await fetch(`${process.env.REACT_APP_SERVER}/home/type`);
  if (!response.ok) {
    throw json({ message: "fail to fetch", status: 500 });
  }
  const data = await response.json();
  return data;
}
async function fetchTopRating() {
  const response = await fetch(`${process.env.REACT_APP_SERVER}/home/top-rating`);
  if (!response.ok) {
    throw json({ message: "fail to fetch", status: 500 });
  }
  const data = await response.json();
  return data;
}
