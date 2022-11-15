import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage("");
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMessage("Veuillez utiliser un email non déjà utilisé :)");
      }
      if (error.response?.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    }
  };

  return (
    <div className="SignUpcontainer">
      <form className="signup-form" onSubmit={handleSubmit}>
        <p className="sinscrire">S'inscrire</p>
        <input
          className="inputform"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className="inputform"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="inputform"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div>
          <input
            className="inputform"
            type="checkbox"
            checked={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <span className="compte1">S'inscrire à notre newsletter</span>
          <p className="conditionUtilisateur">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18ans.
          </p>
        </div>
        <input className="ButtonSignUp" type="submit" value="S'inscrire" />
        <Link to="/login" className="compte2">
          Tu as déjà un compte ? Connecte-toi !
        </Link>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </form>
    </div>
  );
};

export default SignUp;
