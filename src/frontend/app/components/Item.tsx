import React, { useEffect, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { VscEdit } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
import IconButton from "./IconButton";
import AdditionalInput from "./AdditionalInput";
import "./Item.css";
import ToolTip from "./ToolTip";

interface ItemProps {
  itemName: string;
  initialQuantity: string;
  initialMeasurement: string;
  onDeleteClick: React.MouseEventHandler<HTMLButtonElement>;
  onAddQuantityClick: (quantity: string, measurement: string) => void;
  expandInput: Boolean;
}

function Item({
  itemName,
  initialQuantity,
  initialMeasurement,
  onDeleteClick,
  onAddQuantityClick,
  expandInput,
}: ItemProps) {
  const [isExpanded, setIsExpanded] = useState(expandInput);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [measurement, setMeasurement] = useState(initialMeasurement || "Grams");

  useEffect(() => {
    if (!initialMeasurement) {
      setMeasurement("Grams");
    }
  }, [initialMeasurement]);

  const handleEditClick = () => {
    setIsExpanded(true);
  };

  const handleAddQuantityClick = () => {
    onAddQuantityClick(quantity, measurement);
    setIsExpanded(false);
  };

  return (
    <div className="item-container">
      <div className="title-container">
        <div className="text-container">
          <h5 className="item-name">{itemName}</h5>
        </div>
        <div className="button-container">
          {!isExpanded && (
            <ToolTip text={"Edit item"}>
              <IconButton onClick={handleEditClick} disabled={false}>
                <VscEdit />
              </IconButton>
            </ToolTip>
          )}
          {isExpanded && (
            <ToolTip text={"Close"}>
              <IconButton
                onClick={() => setIsExpanded(!isExpanded)}
                disabled={false}
              >
                <IoIosArrowDown></IoIosArrowDown>
              </IconButton>
            </ToolTip>
          )}
          <ToolTip text={"Delete item"}>
            <IconButton onClick={onDeleteClick} disabled={false}>
              <AiOutlineMinusCircle></AiOutlineMinusCircle>
            </IconButton>
          </ToolTip>
        </div>
      </div>
      {isExpanded && (
        <AdditionalInput
          quantity={quantity}
          measurement={measurement}
          onQuantityChange={(e) => setQuantity(e.target.value)}
          onMeasurementChange={(e) => setMeasurement(e.target.value)}
          handleAddQuantityClick={handleAddQuantityClick}
        ></AdditionalInput>
      )}
    </div>
  );
}

export default Item;
