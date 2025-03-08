import React, { useEffect, useState } from "react"
import homepage from "../assets/homepage.jpg"
import RecipeItems from "../components/RecipeItems"
import { useNavigate } from "react-router-dom"
import Modal from "../components/Modal"
import InputForm from "../components/InputForm"

export default function Home() {

  const navigate=useNavigate()
  const [isOpen,setIsOpen]=useState(false)

  const addRecipe=()=>{
    let token=localStorage.getItem("token")
    if(token){
       navigate("/addRecipe")
    }
    else{
      setIsOpen(true)
    }
     
  }


  useEffect(() => {
    document.body.style.overflowX = "hidden" 
    return () => {
      document.body.style.overflowX = "auto"
    }
  }, [])

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${homepage})`,
          width: "100vw",
          height: "100vh", 
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          textAlign: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <h1 style={{ fontSize: "30px", marginBottom: "20px" ,color:"black"}}>
          Unlock the chef in you!
        </h1>
        <button onClick={addRecipe}
          style={{
            padding: "10px 20px",
            fontSize: "15px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Share Your Recipe
        </button>
      </section>
      {isOpen && (
              <Modal onClose={() => setIsOpen(false)}>
                <InputForm setIsOpen={() => setIsOpen(false)} />
              </Modal>
            )}
      <div className="recipe" style={{ padding: "20px" }}>
        <RecipeItems />
      </div>
    </>
  );
}
