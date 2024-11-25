import React, { useContext, useRef, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { addItem } from "../../utils/addItem";
import { deleteItem } from "../../utils/deleteItem";
import { updateItem } from "../../utils/updateItem";
import { AuthContext } from "../contexts/authContext";
import {
  addItemToLocalStorage,
  deleteItemFromLocalStorage,
  editItemFromLocalStorage,
} from "../../utils/localStorageHelpers.js";
import Item from "./Item";
import Input from "./Input";
import IconButton from "./IconButton";
import ToolTip from "./ToolTip";
import "./ItemList.css";

interface ItemListProps {
  initialItems: {
    _id: number;
    name: string;
    quantity: string;
    measurement: string;
  }[];
  collection: string;
}

const ItemList = ({ initialItems, collection }: ItemListProps) => {
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState<
    { _id: number; name: string; quantity: string; measurement: string }[]
  >([...initialItems]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoggedIn, userId } = useContext(AuthContext);

  const handleAddClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isLoggedIn) {
      try {
        // Add the item to the database and get the response
        const addedItem = await addItem(item, collection, userId);

        if (addedItem instanceof Error) {
          return;
        }

        // Update the state with the database response
        setItemList((prev) => [
          ...prev,
          {
            _id: addedItem.id,
            name: addedItem.name,
            quantity: "",
            measurement: "",
          },
        ]);
      } catch (error) {
        console.error("Failed to add item to the database", error);
      }
    } else {
      // Add item to local storage with a temporary ID
      const localStorageItem = addItemToLocalStorage({
        name: item,
        quantity: "",
        measurement: "",
        type: collection,
      });

      // Update state immediately with the local storage item
      setItemList((prev) => [...prev, localStorageItem]);
    }

    setItem("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleMinusClick = (itemId: number) => {
    return async () => {
      setItemList((prev) => {
        const updatedList = prev.filter((item) => item._id !== itemId);
        return updatedList;
      });

      if (isLoggedIn) {
        await deleteItem(itemId, userId);
      } else {
        deleteItemFromLocalStorage(itemId);
      }
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(event.target.value.toLowerCase());
    // setIsExpanded(true);
  };

  const handleAddItemQuantity = async (
    itemId: number,
    quantity: string,
    measurement: string
  ) => {
    setItemList((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity, measurement } : item
      )
    );

    if (isLoggedIn) {
      await updateItem(itemId, quantity, measurement, userId);
    } else {
      editItemFromLocalStorage(itemId, quantity, measurement);
    }
  };

  return (
    <ul>
      {itemList.map((item) => {
        return (
          <Item
            onDeleteClick={handleMinusClick(item._id)}
            onAddQuantityClick={(quantity, measurement) =>
              handleAddItemQuantity(item._id, quantity, measurement)
            }
            key={item._id}
            itemName={item.name}
            initialQuantity={item.quantity}
            initialMeasurement={item.measurement}
            expandInput={false}
          />
        );
      })}
      <form>
        <Input
          id="item-input"
          type="text"
          ref={inputRef}
          onChange={handleChange}
          placeHolderText="Enter item.."
        />
        <ToolTip text={"Add item"}>
          <IconButton onClick={handleAddClick} disabled={!item}>
            <CgAdd className="add-icon"></CgAdd>
          </IconButton>
        </ToolTip>
      </form>
    </ul>
  );
};

export default ItemList;
