import { Link } from "react-router-dom";

const OfferCard = ({ offerInfos }) => {
  return (
    offerInfos.owner && (
      <Link to={`/offer/${offerInfos._id}`} className="offer-card-container">
        <div>
          {offerInfos.owner.account.avatar && (
            <img
              className="avatar"
              src={offerInfos.owner.account.avatar.secure_url}
              alt="owner"
            />
          )}
          <span className="userName">{offerInfos.owner.account.username}</span>
        </div>
        <img
          src={offerInfos.product_image.secure_url}
          alt="product"
          style={{ height: 330, width: 200, objectFit: "cover" }}
        />
        <div className="infoProduct">
          <p>{offerInfos.product_price} €</p>
          {offerInfos.product_details.map((detail, index) => {
            if (detail.TAILLE) {
              return (
                <p className="infoPriceSize" key={index}>
                  {detail.TAILLE}
                </p>
              );
            } else {
              return null;
            }
          })}
          {offerInfos.product_details.map((detail, index) => {
            if (detail.MARQUE) {
              return (
                <p className="infoPriceSize" key={index}>
                  {detail.MARQUE}
                </p>
              );
            } else {
              return null;
            }
          })}
        </div>
      </Link>
    )
  );
};

export default OfferCard;
