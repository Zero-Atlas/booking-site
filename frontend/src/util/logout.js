import { redirect } from "react-router-dom";

export default function loader() {
  localStorage.removeItem("loginUser");
  return redirect("/login?action=login");
}
