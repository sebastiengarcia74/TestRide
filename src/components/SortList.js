import React from "react";

const SortList = ({ handleSort }) => {
  return (
    <div>
      <select
        name="sort"
        id="sort"
        defaultValue="" // Set the initial selected option using defaultValue
        onChange={(e) => handleSort(e.target.value)}
        className="select select-bordered"
      >
        <option disabled value="">
          Sort by
        </option>
        <option value="abv">ABV</option>
        <option value="name">Name</option>
        <option value="first_brewed">First Brewed</option>
      </select>
    </div>
  );
};

export default SortList;
