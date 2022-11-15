import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ handleToken, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="Logincontainer">
      <p className="seconnecter">Se connecter</p>
      <form
        className="signup-form"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/login",
              {
                email,
                password,
              }
            );
            if (response.data.token) {
              handleToken(response.data.token);
              setUserId(response.data._id);
              navigate("/");
            }
          } catch (error) {
            if (error.response?.data.message === "Missing parameters") {
              setErrorMessage("Veuillez remplir tous les champs");
            }
          }
        }}
      >
        <input
          className="inputform1"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Adresse email"
        />
        <input
          className="inputform1"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <input className="ButtonSignUp" type="submit" />
        <Link to="/signup" className="compte2">
          Pas encore de compte ? Inscris-toi
        </Link>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </form>
    </div>
  );
};

export default Login;
