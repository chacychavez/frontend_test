import Select, { SingleValue } from "react-select";
import { User } from "./types/user";

export type SortField = keyof Pick<User, "name" | "company" | "email">
export type SortDirection = 'ascending' | 'descending'
export type SelectItem = {
  label: string;
  value: string;
}

type ControlsProps  = {
  onSortFieldChange: (item: SingleValue<SelectItem>) => void;
  onSortDirectionChange: (item: SingleValue<SelectItem>) => void;
} 
const Controls = ({onSortFieldChange, onSortDirectionChange}: ControlsProps) => {
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select options={fieldOptions} inputId="sort-field" className="input" onChange={onSortFieldChange}/>
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          onChange={onSortDirectionChange}
        />
      </div>
    </div>
  );
};

export default Controls;
