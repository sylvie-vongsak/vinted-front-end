import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="produit">
      <img
        className="photoProduit"
        src={data.product_image.secure_url}
        alt=""
      />
      <div className="detailsProduit">
        <p className="Price23">{data.product_price} €</p>
        {data.product_details.map((detail, index) => {
          const objectKey = Object.keys(detail)[0];
          return (
            <div key={index}>
              <span className="categoryProduct">{objectKey} : </span>
              <span className="resultProduct">{detail[objectKey]}</span>
            </div>
          );
        })}
        <div className="separateur"></div>
        <div className="product_name">{data.product_name}</div>
        <div className="product_info">{data.product_description}</div>
        <div className="infoUser">
          <img
            src={data.owner.account.avatar.url}
            alt="avatar"
            className="offer-avatar"
          />
          <div className="username">{data.owner.account.username}</div>
        </div>
        <Link
          to="/Payment"
          state={{ title: data.product_name, price: data.product_price }}
        >
          <button className="acheter">Acheter</button>
        </Link>
      </div>
    </div>
  );
};

export default Offer;
