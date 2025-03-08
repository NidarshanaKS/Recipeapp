import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function RecipeItems() {
  const recipes = useLoaderData();
  const [allRecipes, setAllRecipes] = useState([]);
  const [favItems, setFavItems] = useState(
    JSON.parse(localStorage.getItem("fav")) ?? []
  );
  const navigate = useNavigate();

  useEffect(() => {
    setAllRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    // Update localStorage when favItems changes
    localStorage.setItem("fav", JSON.stringify(favItems));
  }, [favItems]);

  const onDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/recipe/${id}`)
      .then((res) => console.log(res));
    setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
    setFavItems(favItems.filter((recipe) => recipe._id !== id));
  };

  const favRecipe = (item) => {
    const isAlreadyFav = favItems.some((recipe) => recipe._id === item._id);
    if (isAlreadyFav) {
      // Remove from favorites
      setFavItems(favItems.filter((recipe) => recipe._id !== item._id));
    } else {
      // Add to favorites
      setFavItems([...favItems, item]);
    }
  };

  return (
    <div className="card-container">
      {allRecipes?.map((item, index) => {
        const isFav = favItems.some((favItem) => favItem._id === item._id); // Check if item is a favorite

        return (
          <div
            key={index}
            className="card"
            onDoubleClick={() => navigate(`/recipe/${item._id}`)}
          >
            <img
              src={`http://localhost:5000/images/${item.coverImage}`}
              width="120px"
              height="100px"
              alt={item.title}
            />
            <div className="card-body">
              <div className="title">{item.title}</div>
              <div className="icons">
                <div className="timer" style={{ color: "black" }}>
                  <BsStopwatchFill />
                  {item.time}
                </div>
                {!window.location.pathname.includes("/myRecipe") ? (
                  <FaHeart
                    onClick={() => favRecipe(item)}
                    style={{
                      color: isFav ? "red" : "black", // Dynamically change the color based on whether it's a favorite
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <div className="action">
                    <Link to={`/editRecipe/${item._id}`} className="editIcon">
                      <FaEdit />
                    </Link>
                    <MdDelete
                      onClick={() => onDelete(item._id)}
                      className="deleteIcon"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
