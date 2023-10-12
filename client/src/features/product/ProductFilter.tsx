import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Filter {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

const ProductFilter = ({items, checked, onChange}: Filter) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(value: string) {
    const currIndex = checkedItems.findIndex(item => item === value);
    let newCheckedState: string[] = [];

    if(currIndex === -1)  newCheckedState = [...checkedItems, value]; //check item and set it with new state
    else newCheckedState = checkedItems.filter(item => item !== value) // unckeck item and remove it from new state

    setCheckedItems(newCheckedState);
    onChange(newCheckedState);
  }


  return (
    <FormGroup>
    {items.map((item) => (
      <FormControlLabel
        control={<Checkbox checked={checkedItems.indexOf(item) !== -1} onClick={() => handleChecked(item)}/>}
        label={item}
        key={item}
      />
    ))}
  </FormGroup>
  );
};

export default ProductFilter;
