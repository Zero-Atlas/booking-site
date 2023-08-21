import { redirect } from "react-router-dom";

export default function loader() {
  localStorage.removeItem("loginAdmin");
  return redirect("/?action=login");
}
