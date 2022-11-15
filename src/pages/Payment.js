import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Payment = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, price } = location.state;
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = 0.4 + 0.8 + price;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: totalPrice,
        }
      );
      if (response.data.status === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
        navigate("/");
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      style={{
        fontSize: "14px",
        backgroundColor: "#eaedee",
        height: "100vw",
        padding: "40px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          width: "400px",
          height: "460px",
          margin: "auto",
          padding: "20px",
          paddingTop: "10px",
          fontFamily: "arial",
        }}
      >
        <p style={{ fontSize: "12px", marginBottom: "30px" }}>
          Résumé de la commande
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Commande</p>
          <p>{price} €</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Frais de protection acheteur</p>
          <p>0,40 €</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Frais de port</p>
          <p>0,80 €</p>
        </div>
        <div
          style={{
            borderBottom: "1px solid #eaedee",
            marginTop: "40px",
            marginBottom: "25px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <p>Total</p>
          <p>{totalPrice.toFixed(2).toString().replace(".", ",")} €</p>
        </div>
        <div>
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <span style={{ fontWeight: "bold" }}>{title}</span>. Vous allez payer{" "}
          <span style={{ fontWeight: "bold" }}>
            {`${totalPrice.toFixed(2).toString().replace(".", ",")} €`}
          </span>{" "}
          (frais de protection et frais de port inclus).
        </div>
        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            paddingTop: "20px",
            paddingBottom: "10px",
            borderTop: "1px solid #eaedee",
            borderBottom: "1px solid #eaedee",
          }}
        >
          <CardElement />
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : completed ? (
          <p>Paiement effectué</p>
        ) : (
          <button
            type="submit"
            style={{
              cursor: "pointer",
              width: "100%",
              padding: "12px",
              borderRadius: "3px",
              border: "none",
              color: "white",
              backgroundColor: "#26BF6D",
            }}
          >
            Pay
          </button>
        )}
      </form>
    </div>
  );
};

export default Payment;
