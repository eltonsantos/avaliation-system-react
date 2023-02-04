import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import { Rating } from "../pages/Rating";

export function TokenRoutes() {
  const { token } = useToken();

  let { token } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  // This function will be called whenever localhost:5173/avaliacao=a57078f588ethe text input changes
  const searchHandler = (event) => {
    let search;
    if (event.target.value) {
      search = {
        keyword: event.target.value,
      };
    } else {
      search = undefined;
    }

    setSearchParams(search, { replace: true });
  };

  // const urlToken = window.location.href.split("=")[1];

  const xxx = window.location.host + "/avaliacao=" + token;
  console.log(searchParams);

  return token != "undefined" ? (
    <Routes>
      <Route element={<Rating />} path="/" />
    </Routes>
  ) : (
    <Navigate to="/notfound" />
  );
}
