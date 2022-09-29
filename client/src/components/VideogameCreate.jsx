import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postVideogames, getGenders, getVideogames } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { platformsList } from "../utils/arrayPlatforms";
import NavBar from "./NavBar";
import "../stylesheets/VideogameCreate.css";

function VideoGameCreate() {
  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Please complete the input name";
    } else if (
      allVideogames.find(
        (item) =>
          item.name.replace(/\s+/g, "").toLowerCase() ===
          input.name.replace(/\s+/g, "").toLowerCase()
      )
    ) {
      errors.name = "the game exists!!";
    } else if (!input.description) {
      errors.description = "Please complete the input description";
    } else if (!input.platforms.length) {
      errors.platforms = "requires placing at least one platform";
    } else if (!input.background_image) {
      errors.background_image = "Please complete the input image";
    }
    return errors;
  }

  const dispatch = useDispatch();
  const history = useHistory(); // redirige a la ruta que se le indique
  const allVideogames = useSelector((state) => state.videogames);
  const allGenders = useSelector((state) => state.genders);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genders: [],
    background_image: "",
    createdInDb: true,
  });

  const allPlatforms = platformsList.map((item) => ({ name: item }));

  useEffect(() => {
    dispatch(getGenders());
    dispatch(getVideogames());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectGenders = (e) => {
    if (!input.genders.includes(e.target.value))
      if (e.target.value !== "All")
        setInput({
          ...input,
          genders: [...input.genders, e.target.value],
        });
    console.log(input.genders[0]);
  };

  const functionId = (data) => {
    return data.split(",").shift();
  };

  const handleSelectPlatforms = (e) => {
    if (!input.platforms.includes(e.target.value))
      if (e.target.value !== "All")
        if (!input.platforms.includes(e.target.value))
          setInput({
            ...input,
            platforms: [...input.platforms, e.target.value],
          });
  };

  const handleDeleteGenders = (e) => {
    setInput({
      ...input,
      genders: input.genders.filter((gend) => gend !== e),
    });
  };

  const handleDeletePlatforms = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== e),
    });
  };

  console.log(input);

  const handleSubmit = (e) => {
    console.log(input);
    e.preventDefault();

    const submitFunction = () => {
      const selectId = input.genders.map((e) => functionId(e));
      console.log(selectId);
      const submit = input;
      submit.genders = selectId;
      dispatch(postVideogames(submit));
      console.log(submit);
    };
    submitFunction();

    // Presenta problemas al limpiar el formulario
    alert("Persona Creado");
    setInput({
      name: "",
      background_image: "",
      description: "",
      released: "",
      rating: "",
      gender: [],
      platforms: [],
    });
    history.push("/home");
  };

  const handleReset = (e) => {
    e.preventDefault(e);
    setInput({
      name: "",
      background_image: "",
      description: "",
      released: "",
      rating: "",
      gender: [],
      platforms: [],
    });
  };

  // useEffect(() => {

  // }, []);

  return (
    <div>
      <NavBar />
      <div className="create__container">
        <form
          className="create__form_container"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="create__title">
            <h2>
              Create <span>Videogame</span>
            </h2>
          </div>

          {/* Error input empty */}
          <aside className="create__error_container">
            {errors.name && (
              <p className="create__error_inputs">{errors.name}</p>
            )}
            {errors.description && (
              <p className="create__error_inputs">{errors.description}</p>
            )}
            {!input.platforms.length
              ? errors.platforms && (
                  <p className="create__error_inputs">{errors.platforms}</p>
                )
              : " "}
            {errors.background_image && (
              <p className="create__error_inputs">{errors.background_image}</p>
            )}
          </aside>

          {/* Inputs and Selects */}
          <div className="create__inputs">
            <div className="create__inputs_name-img">
              <label htmlFor="name"> Name </label>

              <input
                name="name"
                type="text"
                value={input.name}
                placeholder="Enter Name"
                className="input__name_form"
                id="name"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="create__inputs_name-img">
              <label htmlFor="image">Image </label>
              <input
                name="background_image"
                type="text"
                value={input.background_image}
                placeholder="Enter Image"
                className="input__image_form"
                id="image"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="create__inputs">
            <div className="create__inputs_rating-released create__input_rating">
              <label htmlFor="rating">Rating </label>

              <input
                name="rating"
                type="number"
                placeholder="Enter Rating"
                className="input__rating_form"
                min="1"
                max="5"
                step="0.01"
                id="rating"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="create__inputs_rating-released">
              <label htmlFor="date">Release Date</label>

              <input
                name="released"
                type="date"
                className="input__date_form"
                min="1900-04-01"
                max="2022-08-30"
                id="date"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="create__inputs_message">
            <label htmlFor="description">Description </label>
            <textarea
              name="description"
              placeholder="Enter Description"
              value={input.description}
              className="input__description_form"
              id="description"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="create__selects">
            <div className="create__inputs_selects">
              <label htmlFor="">Genders</label>
              <select
                name="gender"
                className="input__gender_form"
                onChange={(e) => handleSelectGenders(e)}
              >
                <option value="All">All</option>
                {allGenders?.map((el) => (
                  <option value={`${el._id},${el.name}`} key={el._id}>
                    {el.name}
                  </option>
                ))}
              </select>

              <div className="create__render_content">
                {input.genders &&
                  input.genders.map((e, index) => (
                    <div key={index} className="create__render_button">
                      <span
                        className="render__btn"
                        onClick={() => handleDeleteGenders(e)}
                        key={index}
                      >
                        {e.split(",").pop()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="create__inputs_selects">
              <label htmlFor="">Types of Platforms </label>
              <select
                name="platforms"
                className="input__platform_form"
                onChange={(e) => handleSelectPlatforms(e)}
              >
                <option value="All">All</option>
                {allPlatforms?.map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>

              <div className="create__render_content">
                {input.platforms.map((e, index) => (
                  <div key={index} className="create__render_button">
                    <span
                      className="render__btn"
                      onClick={() => handleDeletePlatforms(e)}
                    >
                      {e}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="create__btn">
            <button
              type="reset"
              className="btn__form_reset"
              onClick={(e) => handleReset(e)}
            >
              RESET
            </button>
            <button
              type="submit"
              className="btn__form_submit"
              onClick={(e) => handleSubmit(e)}
              disabled={Object.keys(errors).length === 0 ? "" : true}
            >
              Create videogames
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VideoGameCreate;
