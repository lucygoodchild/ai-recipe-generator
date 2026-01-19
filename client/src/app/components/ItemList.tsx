import React, { useState } from "react";
import { CgAdd } from "react-icons/cg";
import { MdPlaylistAdd } from "react-icons/md";
import { addItem } from "../../utils/addItem";
import { deleteItem } from "../../utils/deleteItem";
import { updateItem } from "../../utils/updateItem";
import { useAuth } from "../contexts/authContext";
import {
  addItemToLocalStorage,
  deleteItemFromLocalStorage,
  editItemFromLocalStorage,
} from "../../utils/localStorageHelpers.js";
import Item from "./Item";
import Input from "./Input";
import AddItemModal from "./AddItemModal";
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
  const [itemList, setItemList] = useState<
    { _id: number; name: string; quantity: string; measurement: string }[]
  >([...initialItems]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{
    _id: number;
    name: string;
    quantity: string;
    measurement: string;
  } | null>(null);
  const { isLoggedIn, userId } = useAuth();

  const handleAddItem = async (itemData: {
    name: string;
    quantity: string;
    measurement: string;
  }) => {
    if (editingItem) {
      // Update existing item
      setItemList((prev) =>
        prev.map((item) =>
          item._id === editingItem._id ? { ...item, ...itemData } : item,
        ),
      );

      if (isLoggedIn) {
        await updateItem(
          editingItem._id,
          itemData.quantity,
          itemData.measurement,
          userId,
        );
      } else {
        editItemFromLocalStorage(
          editingItem._id,
          itemData.quantity,
          itemData.measurement,
        );
      }
      setEditingItem(null);
    } else {
      // Add new item
      if (isLoggedIn) {
        try {
          const addedItem = await addItem(itemData.name, collection, userId);

          if (addedItem instanceof Error) {
            return;
          }

          setItemList((prev) => [
            ...prev,
            {
              _id: addedItem.id,
              name: addedItem.name,
              quantity: itemData.quantity,
              measurement: itemData.measurement,
            },
          ]);
        } catch (error) {
          console.error("Failed to add item to the database", error);
        }
      } else {
        const localStorageItem = addItemToLocalStorage({
          name: itemData.name,
          quantity: itemData.quantity,
          measurement: itemData.measurement,
          type: collection,
        });

        setItemList((prev) => [...prev, localStorageItem]);
      }
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

  const handleEditClick = (item: {
    _id: number;
    name: string;
    quantity: string;
    measurement: string;
  }) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleInputFocus = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="item-list-container">
      {itemList.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <MdPlaylistAdd />
          </div>
          <p className="empty-state-text">No items yet</p>
          <p className="empty-state-hint">Click below to add your first item</p>
        </div>
      )}

      <ul>
        {itemList.map((item, index) => {
          return (
            <div
              key={item._id}
              className="item-enter"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Item
                item={item}
                onDeleteClick={handleMinusClick(item._id)}
                onEditClick={() => handleEditClick(item)}
              />
            </div>
          );
        })}
      </ul>

      <form>
        <div style={{ position: "relative" }}>
          <CgAdd className="add-item-icon" />
          <Input
            id="item-input"
            type="text"
            onFocus={handleInputFocus}
            placeHolderText="Click to add new item..."
            readonly
          />
        </div>
      </form>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAddItem={handleAddItem}
        editingItem={editingItem}
      />
    </div>
  );
};

export default ItemList;
