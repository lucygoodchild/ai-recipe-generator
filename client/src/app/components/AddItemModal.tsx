import React, { useState, useEffect } from "react";
import "./AddItemModal.css";

const measurements = {
  measurements: [
    { value: "", label: "Select measurement" },
    { value: "g", label: "Grams (g)" },
    { value: "kg", label: "Kilograms (kg)" },
    { value: "ml", label: "Milliliters (ml)" },
    { value: "l", label: "Liters (l)" },
    { value: "cup", label: "Cup" },
    { value: "tbsp", label: "Tablespoon" },
    { value: "tsp", label: "Teaspoon" },
    { value: "oz", label: "Ounces (oz)" },
    { value: "lb", label: "Pounds (lb)" },
    { value: "pieces", label: "Pieces" },
  ],
};

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: {
    name: string;
    quantity: string;
    measurement: string;
  }) => void;
  editingItem?: {
    _id: number;
    name: string;
    quantity: string;
    measurement: string;
  } | null;
}

const AddItemModal = ({
  isOpen,
  onClose,
  onAddItem,
  editingItem,
}: AddItemModalProps) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measurement, setMeasurement] = useState("");

  useEffect(() => {
    if (editingItem) {
      setItemName(editingItem.name);
      setQuantity(editingItem.quantity || "");
      setMeasurement(editingItem.measurement || "");
    } else {
      setItemName("");
      setQuantity("");
      setMeasurement("");
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAddItem({
        name: itemName.toLowerCase().trim(),
        quantity,
        measurement,
      });
      // Reset form
      setItemName("");
      setQuantity("");
      setMeasurement("");
      onClose();
    }
  };

  const handleCancel = () => {
    setItemName("");
    setQuantity("");
    setMeasurement("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={handleCancel}>
          ×
        </button>

        <h2 className="modal-title">
          {editingItem ? "Edit Item" : "Add New Item"}
        </h2>
        <p className="modal-description">
          Enter item details and optionally add quantity for improved recipe
          ideas
        </p>

        <div>
          <div className="form-group">
            <label className="form-label">Item Name *</label>
            <input
              type="text"
              className="form-input"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              placeholder="e.g., tomatoes, chicken breast..."
              autoFocus
              disabled={!!editingItem}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Quantity (Optional)</label>
            <div className="quantity-container">
              <input
                type="number"
                className="form-input quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                placeholder="Amount"
              />
              <select
                className="form-select"
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
              >
                {measurements.measurements.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="btn btn-submit"
              onClick={handleSubmit}
              disabled={!itemName.trim()}
            >
              {editingItem ? "Update Item" : "Add Item"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
