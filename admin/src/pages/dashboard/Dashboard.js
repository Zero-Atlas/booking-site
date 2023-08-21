import { useLoaderData } from "react-router-dom";

import Summary from "./Summary/Summary";
import Transaction from "../transaction/Transaction";

export default function Dashboard() {
  const loaderData = useLoaderData();
  return (
    <>
      <Summary />
      <Transaction title="Latest Transaction" data={loaderData} />
    </>
  );
}
