import React from "react";
import "./Compartment.css";
import ItemList from "./ItemList";

interface CompartmentProps {
  title: string;
  compartmentClassName: string;
  initialItems: {
    _id: number;
    name: string;
    quantity: string;
    measurement: string;
  }[];
}

function Compartment({
  title,
  compartmentClassName,
  initialItems,
}: CompartmentProps) {
  return (
    <div className={`compartment-container ${compartmentClassName}`}>
      <div className="content-wrapper">
        <h3 className="compartment-title">{title}</h3>
        <div className="items-container">
          <ItemList
            initialItems={initialItems}
            collection={title.toLowerCase()}
          ></ItemList>
        </div>
      </div>
    </div>
  );
}

export default Compartment;
