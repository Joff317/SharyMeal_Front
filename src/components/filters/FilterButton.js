import React from "react";
import Button from "../actions/Button";
import "./filter.css";
import Filter from "../../icons/Filter";

const FilterButton = ({ setVisibleFilter, visibleFilter }) => {
  return (
    <button
      className="filter-button hover:bg-grey-border"
      onClick={() => setVisibleFilter(!visibleFilter)}
    >
      <Filter /> <span>Filtre</span>
    </button>
  );
};

export default FilterButton;
