import { Link } from "react-router-dom";

const Header = ({
  token,
  handleToken,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  setSort,
  setTitle,
}) => {
  return (
    <>
      <header>
        <div>
          <Link to="/">
            <img
              className="logo"
              src="https://uploads-ssl.webflow.com/6001d11b755363279c9adf03/60094c4138284a381c1d543c_logo-vinted.png"
              alt="Logo Vinted"
            />
          </Link>
        </div>
        <div className="header-main">
          <input
            className="search-bar"
            type="search"
            placeholder=" 🔍   Rechercher des articles"
            name="Vinted"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <div className="container">
            {token ? (
              <button
                className="ButtonHeader3"
                onClick={() => {
                  handleToken(null);
                }}
              >
                Deconnexion
              </button>
            ) : (
              <>
                <Link to="/Signup">
                  <button className="ButtonHeader1">S'inscrire</button>
                </Link>
                <Link to="/login">
                  <button className="ButtonHeader1">Se connecter</button>
                </Link>
              </>
            )}

            <Link to={token ? "/Publish" : "/login"}>
              <button className="ButtonHeader2"> Vends tes articles !</button>
            </Link>
          </div>
        </div>
      </header>
      <div className="bar-nav">
        <button className="ButtonNav">Femmes</button>
        <button className="ButtonNav">Hommes</button>
        <button className="ButtonNav">Enfants</button>
        <button className="ButtonNav">Maison</button>
        <button className="ButtonNav">Divertissement</button>
        <button className="ButtonNav">Animaux</button>
        <button className="ButtonNav">À propos</button>
        <button className="ButtonNav">Notre plateforme</button>
      </div>

      <div>
        <button
          className="prixplus"
          onClick={() => {
            setSort("price-asc");
          }}
        >
          Prix ⇡
        </button>
        <button
          className="prixmoins"
          onClick={() => {
            setSort("price-desc");
          }}
        >
          Prix ⇣
        </button>
        <input
          className="priceMin"
          type="number"
          placeholder="Prix mini"
          value={priceMin}
          onChange={(event) => {
            setPriceMin(event.target.value);
          }}
        />
        <input
          className="priceMax"
          type="number"
          placeholder="Prix Max"
          value={priceMax}
          onChange={(event) => {
            setPriceMax(event.target.value);
          }}
        />
      </div>
    </>
  );
};
export default Header;
