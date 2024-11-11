import React, { useEffect, useState, useContext } from "react";
import { fetchItems } from "../utils/fetchItems";
import { fetchRecipes } from "../utils/fetchRecipes";
import { AuthContext } from "./../app/contexts/authContext";
import { getSortedItemsFromLocalStorage } from "../utils/localStorageHelpers";
import { syncItemsFromLocalStorageWithDB } from "../utils/syncLocalStorageToDB";
import RecipeModal from "../app/components/RecipesModal";
import Compartment from "../app/components/Compartment";
import Button from "../app/components/Button";
import LoadingSpinner from "../app/components/LoadingSpinner";
import Error from "../app/components/Error";
import "./home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState(null);
  const [recipesOutput, setRecipesOutput] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState({
    cupboardItems: [],
    fridgeItems: [],
    freezerItems: [],
  });
  const { isLoggedIn, userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllItemsFromDB = async () => {
      console.log("fetching...");
      try {
        const cupboardItems = await fetchItems("cupboard", userId);
        const fridgeItems = await fetchItems("fridge", userId);
        const freezerItems = await fetchItems("freezer", userId);
        if (cupboardItems && fridgeItems && freezerItems) {
          setItems({ cupboardItems, fridgeItems, freezerItems });
        }
      } catch (err) {
        setError(error);
        setIsModalOpen(false);
      } finally {
        setLoading(false);
      }
    };

    const syncItemsWithDB = async () => {
      console.log("syncing..");
      await syncItemsFromLocalStorageWithDB(userId);
    };

    if (isLoggedIn) {
      //sync local storage with DB
      if (userId != null) {
        syncItemsWithDB();
        fetchAllItemsFromDB();
      }
    } else {
      fetchAllItemsFromLocalStorage();
    }
  }, [error, userId, isLoggedIn]);

  const fetchAllItemsFromLocalStorage = () => {
    const { cupboardItems, fridgeItems, freezerItems } =
      getSortedItemsFromLocalStorage();
    setItems({ cupboardItems, fridgeItems, freezerItems });
    setLoading(false);
  };

  const handleGenerateRecipes = async () => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    setLoading(true);
    setLoadingText("Fetching recipes");
    await fetchRecipes(items, setRecipesOutput, setError);
    setLoading(false);
    setLoadingText("");
    setIsModalOpen(true);
  };

  if (loading) return <LoadingSpinner text={loadingText}></LoadingSpinner>;

  if (error) {
    return (
      <Error
        errorText={error!}
        onClose={() => {
          setIsModalOpen(false);
          setError(null);
        }}
      ></Error>
    );
  }

  return (
    <div className="app">
      <h1> AI Recipe Generator</h1>
      <div className="button-wrapper">
        <Button
          onClick={handleGenerateRecipes}
          text={"Generate Recipes"}
          bgColour="purple"
        />
      </div>
      <div className="flex-container">
        <div className="first-wrapper">
          <Compartment
            title="Cupboard"
            compartmentClassName="first-compartment"
            initialItems={items.cupboardItems}
          />
        </div>
        <div className="second-third-wrapper">
          <Compartment
            title="Fridge"
            compartmentClassName="second-compartment"
            initialItems={items.fridgeItems}
          />
          <Compartment
            title="Freezer"
            compartmentClassName="third-compartment"
            initialItems={items.freezerItems}
          />
        </div>
      </div>
      <RecipeModal
        isOpen={isModalOpen}
        recipes={recipesOutput}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
