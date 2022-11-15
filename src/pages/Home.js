import { Link } from "react-router-dom";
import OfferCard from "../components/OfferCard";

const Home = ({ isLoading, data }) => {
  return isLoading ? (
    <p> Loading...</p>
  ) : (
    <>
      <div className="WhiteBox">
        <div className="textBox">Prêts à faire du tri dans vos placards ?</div>
        <Link to="/Publish">
          <button className="vendsmaintenant"> Vends maintenant</button>
        </Link>
        <button className="decouvre"> Découvrir comment ça marche</button>
      </div>

      <div className="photoaccueil">
        <img
          className="imageaccueil"
          src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
          alt=""
        />
      </div>

      <div className="home-container">
        {data.offers.map((offer, index) => {
          return <OfferCard key={index} offerInfos={offer} />;
        })}
      </div>
    </>
  );
};

export default Home;
