import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import CustomInput from "../components/CustomInput";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Réponse : ", response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return token ? (
    <div style={{ backgroundColor: "#EBECEE", paddingTop: "30px" }}>
      <div className="container-publish">
        <p className="vends">Vends ton article</p>
        <form onSubmit={handleSubmit}>
          {picture ? (
            <img src={URL.createObjectURL(picture)} alt="" />
          ) : (
            <div className="publish1">
              <label htmlFor="picture"></label>
              <input
                className="file-input"
                id="picture"
                type="file"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                }}
              />
            </div>
          )}
          <div className="publish2">
            <CustomInput
              classname="Publish-title"
              title={"Titre"}
              state={title}
              setState={setTitle}
            />
            <div>
              <label htmlFor="description">Décris ton article</label>
            </div>
            <textarea
              id="description"
              cols="100"
              rows="10"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
          </div>
          <div className="publish3">
            <CustomInput
              className="publish-title"
              title={"Marque"}
              state={brand}
              setState={setBrand}
            />
            <CustomInput title={"Taille"} state={size} setState={setSize} />
            <CustomInput title={"Couleur"} state={color} setState={setColor} />
            <CustomInput
              title={"État"}
              state={condition}
              setState={setCondition}
            />
            <CustomInput title={"Lieu"} state={city} setState={setCity} />
          </div>
          <div className="publish4">
            <CustomInput
              title={"Prix"}
              state={price}
              setState={setPrice}
              type={"number"}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
