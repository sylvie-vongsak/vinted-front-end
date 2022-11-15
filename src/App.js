import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer.js";
import Login from "./pages/Login.js";
import SignUp from "./pages/Signup.js";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

//Components
import Header from "./components/Header.js";
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);
const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState("");

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUrlWithParams = new URL(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        sort && myUrlWithParams.searchParams.append("sort", sort);
        priceMin && myUrlWithParams.searchParams.append("priceMin", priceMin);
        priceMax && myUrlWithParams.searchParams.append("priceMax", priceMax);
        title && myUrlWithParams.searchParams.append("title", title);

        console.log(myUrlWithParams.href);
        const response = await axios.get(myUrlWithParams.href);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [sort, priceMin, priceMax, title]);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Header
          token={token}
          handleToken={handleToken}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          setSort={setSort}
          setTitle={setTitle}
        />
        <Routes>
          <Route
            path="/"
            element={<Home isLoading={isLoading} data={data} />}
          />
          <Route path="/Offer/:id" element={<Offer />} />
          <Route
            path="/login"
            element={<Login handleToken={handleToken} setUserId={setUserId} />}
          />
          <Route
            path="/signup"
            element={<SignUp handleToken={handleToken} />}
          />
          <Route path="/Publish" element={<Publish token={token} />} />
          <Route path="/Payment" element={<Payment userId={userId} />} />
        </Routes>
      </Router>
    </Elements>
  );
};

export default App;
