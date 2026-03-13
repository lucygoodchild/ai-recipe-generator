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
  validationError?: string | null;
  sanitizeInput?: (input: string) => string;
  validateInput?: (input: string) => { isValid: boolean; error: string | null };
}

// Default validation function if not provided via props
const defaultValidateItemName = (
  name: string,
): { isValid: boolean; error: string | null } => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return {
      isValid: false,
      error: "Item name cannot be empty",
    };
  }

  if (trimmedName.length > 30) {
    return {
      isValid: false,
      error: "Item name must be 30 characters or less",
    };
  }

  // Only allow letters, spaces, and hyphens
  const validPattern = /^[a-zA-Z\s-]+$/;
  if (!validPattern.test(trimmedName)) {
    return {
      isValid: false,
      error: "Item name can only contain letters, spaces, and hyphens",
    };
  }

  // Must contain at least one letter
  const hasLetter = /[a-zA-Z]/.test(trimmedName);
  if (!hasLetter) {
    return {
      isValid: false,
      error: "Item name must contain at least one letter",
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

// Default sanitize function if not provided via props
const defaultSanitizeItemName = (name: string): string => {
  // Remove any characters that aren't letters, spaces, or hyphens
  return name.replace(/[^a-zA-Z\s-]/g, "");
};

const AddItemModal = ({
  isOpen,
  onClose,
  onAddItem,
  editingItem,
  validationError,
  sanitizeInput = defaultSanitizeItemName,
  validateInput = defaultValidateItemName,
}: AddItemModalProps) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [localValidationError, setLocalValidationError] = useState<
    string | null
  >(null);

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
    // Clear local validation error when modal opens/closes or editing item changes
    setLocalValidationError(null);
  }, [editingItem, isOpen]);

  // Validation function to check if both quantity and measurement are provided together
  const isValidQuantityMeasurement = () => {
    const hasQuantity = quantity.trim() !== "";
    const hasMeasurement = measurement !== "";

    // Both must be provided or both must be empty
    return (hasQuantity && hasMeasurement) || (!hasQuantity && !hasMeasurement);
  };

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Sanitize input to remove invalid characters
    value = sanitizeInput(value);

    setItemName(value);

    // Validate on change
    const validation = validateInput(value);
    setLocalValidationError(validation.error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation before submit
    const validation = validateInput(itemName);
    if (!validation.isValid) {
      setLocalValidationError(validation.error);
      return;
    }

    // Check if item name exists and quantity/measurement validation passes
    if (itemName.trim() && isValidQuantityMeasurement()) {
      onAddItem({
        name: itemName.toLowerCase().trim(),
        quantity,
        measurement,
      });
      // Reset form
      setItemName("");
      setQuantity("");
      setMeasurement("");
      setLocalValidationError(null);
      onClose();
    }
  };

  const handleCancel = () => {
    setItemName("");
    setQuantity("");
    setMeasurement("");
    setLocalValidationError(null);
    onClose();
  };

  // Determine which error to show (prop error takes precedence)
  const errorToShow = validationError || localValidationError;

  // Check if submit button should be disabled
  const isSubmitDisabled = () => {
    const nameValidation = validateInput(itemName);
    return (
      !itemName.trim() ||
      !isValidQuantityMeasurement() ||
      !nameValidation.isValid
    );
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
              className={`form-input ${errorToShow ? "error" : ""}`}
              value={itemName}
              onChange={handleItemNameChange}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              placeholder="e.g., tomatoes, chicken breast..."
              maxLength={30}
              autoFocus
              disabled={!!editingItem}
            />
            {errorToShow && <p className="error-message">{errorToShow}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Quantity (Optional - both quantity and measurement required)
            </label>
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
              disabled={isSubmitDisabled()}
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