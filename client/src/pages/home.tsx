import React, { useEffect, useState, useContext } from "react";
import { fetchItems } from "../utils/fetchItems";
import { fetchRecipes } from "../utils/fetchRecipes";
import { AuthContext } from "../app/contexts/authContext";
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
  const [error, setError] = useState("");
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
      try {
        setLoading(true);
        setError(""); // Clear any previous errors

        const [cupboardItems, fridgeItems, freezerItems] = await Promise.allSettled([
          fetchItems("cupboard", userId),
          fetchItems("fridge", userId),
          fetchItems("freezer", userId)
        ]);

        // Extract successful results, use empty array for failed ones
        const itemsData = {
          cupboardItems: cupboardItems.status === 'fulfilled' ? cupboardItems.value || [] : [],
          fridgeItems: fridgeItems.status === 'fulfilled' ? fridgeItems.value || [] : [],
          freezerItems: freezerItems.status === 'fulfilled' ? freezerItems.value || [] : []
        };

        setItems(itemsData);

        // Check for any failures and warn user
        const failedFetches = [cupboardItems, fridgeItems, freezerItems]
          .filter(result => result.status === 'rejected');

        if (failedFetches.length > 0) {
          console.warn('Some items could not be loaded from server');
          setError('Some items could not be loaded. Please refresh to try again.');
        }
      } catch (err) {
        console.error('Error fetching items from database:', err);
        setError('Failed to load items from server');
        // Fall back to local storage
        fetchAllItemsFromLocalStorage();
      } finally {
        setLoading(false);
      }
    };

    const syncItemsWithDB = async () => {
      try {
        await syncItemsFromLocalStorageWithDB(userId);
      } catch (err) {
        console.error("Error syncing items with Database:", err);
      }
    };

    if (isLoggedIn) {
      if (userId != null) {
        syncItemsWithDB()
          .then(() => fetchAllItemsFromDB())
          .catch((err) => {
            console.error("Failed to sync items with database:", err);
            // Fall back to fetching from local storage on sync failure
            fetchAllItemsFromLocalStorage();
            setError("Failed to sync data with server. Using offline data.");
          });
      }
    } else {
      fetchAllItemsFromLocalStorage();
    }
  }, [userId, isLoggedIn]);

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
          setError("");
        }}
      ></Error>
    );
  }

  return (
    <div className="app">
      <h1> Recipe Generator</h1>
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
