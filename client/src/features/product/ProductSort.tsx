import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface Sort {
    options: any[];
    selectedValue: string;
    onChange: (event: any) => void;
}

const ProductSort = ({options, selectedValue, onChange}: Sort) => {
  return (
    <FormControl>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={label}
            key={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ProductSort;
