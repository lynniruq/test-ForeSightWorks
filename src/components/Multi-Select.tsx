import React, { useState } from "react";
import '../style/dropdown.css';


type Item = {
  label: string;
  value: string | number;
};

type Props = {
  options: Item[];
  multiple?: boolean;
  placeholder?: string;
  onChange: (selected: Item[] | Item | null) => void;
  value?:Item[]
};

const Select: React.FC<Props> = ({ options, multiple = false, placeholder = "Please Select..", onChange,value }) => {
  let [selected, setSelected] = useState<Item[]>([]);
  let [isDropDownOpen, setIsDropDownOpen] = useState(false);
  let [search, setSearch] = useState("");
  let toggleSelect = () => setIsDropDownOpen(!isDropDownOpen);

  const handleSelect = (item: Item) => {
    if (multiple) {
      let exists = selected.some((selectedItem) => selectedItem.value === item.value);
      let newSelection = exists
        ? selected.filter((selectedItem) => selectedItem.value !== item.value)
        : [...selected, item]; 
      setSelected(newSelection);
      onChange(newSelection);
    } else {
      setSelected([item]);
      onChange(item);
      setIsDropDownOpen(false); 
    }
  };
  

  const handleSelectAll = () => {
    if (selected.length === options.length) {
      setSelected([]);
      onChange([]);
    } else {
      setSelected(options);
      onChange(options);
    }
  };

  const filteredOptions = options.filter((item) => item.label.replace(/\s+/g, '').toLowerCase().includes(search.replace(/\s+/g, '').toLowerCase()));

  return (
    <div className="select-container" style={{width: "200px" }}>
      <div className="select-box" onClick={toggleSelect}>
        {selected.length ? selected.map((s) => s.label).join(", ") : placeholder}
      </div>
      {isDropDownOpen && (
        <div className="select-dropdown" >
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
          />
          {multiple && (
            <div>
              <input type="checkbox" checked={selected.length === options.length} onChange={handleSelectAll} /> Select All
            </div>
          )}
          {filteredOptions.map((item) => (
            <div key={item.value} onClick={() => handleSelect(item)} style={{ cursor: "pointer" }}>
              {multiple && <input type="checkbox" checked={selected.some((s) => s.value === item.value)} readOnly />} {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;