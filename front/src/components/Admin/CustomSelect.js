import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";

const options = [
  { value: "Question 1", label: "Question 1"},
  { value: "Question 2", label: "Question 2" },
  { value: "Question 3", label: "Question 3"}
];

const formatOptionLabel = ({ value, label, customAbbreviation }) => (
  <div style={{ display: "flex" }}>
    <div>{label}</div>
    <div style={{ marginLeft: "10px", color: "#ccc" }}>
      {customAbbreviation}
    </div>
  </div>
);



function CustomSelect() {
    return (
        <Select
    defaultValue={options[0]}
    formatOptionLabel={formatOptionLabel}
    options={options}
  />
    )
}

export default CustomSelect
