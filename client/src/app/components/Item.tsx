import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { VscEdit } from "react-icons/vsc";
import IconButton from "./IconButton";
import "./Item.css";
import ToolTip from "./ToolTip";

interface ItemProps {
  item: {
    _id: number;
    name: string;
    quantity: string;
    measurement: string;
  };
  onDeleteClick: React.MouseEventHandler<HTMLButtonElement>;
  onEditClick: () => void;
}

function Item({ item, onDeleteClick, onEditClick }: ItemProps) {
  return (
    <div className="item-container">
      <div className="title-container">
        <div className="text-container">
          <h5 className="item-name">{item.name}</h5>
          {item.quantity && (
            <span className="item-quantity">
              {item.quantity} {item.measurement}
            </span>
          )}
        </div>
        <div className="button-container">
          <ToolTip text={"Edit item"}>
            <IconButton onClick={onEditClick} disabled={false}>
              <VscEdit />
            </IconButton>
          </ToolTip>
          <ToolTip text={"Delete item"}>
            <IconButton onClick={onDeleteClick} disabled={false}>
              <AiOutlineMinusCircle></AiOutlineMinusCircle>
            </IconButton>
          </ToolTip>
        </div>
      </div>
    </div>
  );
}

export default Item;
