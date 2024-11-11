import React, { useState, useEffect } from "react";
import IconButton from "./IconButton";
import { CgAdd } from "react-icons/cg";
import ToolTip from "./ToolTip";
import "./AdditionalInput.css";
import measurements from "./../../assets/measurements.json";

interface AdditionalInputProps {
  quantity: string;
  measurement: string;
  onQuantityChange: React.ChangeEventHandler<HTMLInputElement>;
  onMeasurementChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleAddQuantityClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AdditionalInput = ({
  quantity,
  measurement,
  onQuantityChange,
  onMeasurementChange,
  handleAddQuantityClick,
}: AdditionalInputProps) => {
  return (
    <div className="expanded-container">
      <p>Input your item's quantity for improved recipes ideas!</p>
      <div className="input-select-container">
        <input
          type="number"
          placeholder={quantity}
          value={quantity}
          onChange={onQuantityChange}
        />
        <select value={measurement} onChange={onMeasurementChange}>
          {measurements.measurements.map((measurement) => (
            <option key={measurement.value} value={measurement.value}>
              {measurement.label}
            </option>
          ))}
        </select>
        <ToolTip text="Add quantity">
          <IconButton onClick={handleAddQuantityClick} disabled={!quantity}>
            <CgAdd />
          </IconButton>
        </ToolTip>
      </div>
    </div>
  );
};

export default AdditionalInput;
