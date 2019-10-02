import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { isEqual } from "lodash";
import makeAnimated from "react-select/animated";
import api from "../../api";
import "./DropdownType.scss";

const animatedComponents = makeAnimated();
const MAX_SELECTED = 3;

function disableOption(options, isDisabled) {
  return options.map(option => ({ ...option, isDisabled }));
}

export default function DropdownType({ onChange }) {
  const [option, setOption] = useState([]);
  const prevOption = useRef(); // for comparing newOption

  useEffect(() => {
    // skip effect when option
    if (isEqual(prevOption.current, option)) {
      return;
    }
    api.getPokemonType().then(async res => {
      const { results } = await res.json();
      const newOption = results.map(({ name, url }) => ({
        url,
        label: name,
        value: name,
        isDisabled: false
      }));
      prevOption.current = newOption;
      setOption(newOption);
    });
  });

  function handleOnChange(selected) {
    onChange(selected ? selected : []);
    if (selected && selected.length >= 2) {
      // set max selected option
      const newOption = disableOption(option, selected.length === MAX_SELECTED);
      prevOption.current = newOption;
      setOption(newOption);
    }
  }

  return (
    <Select
      isMulti
      placeholder="Select Pokemon Type. Max 3 types."
      components={animatedComponents}
      options={option}
      onChange={handleOnChange}
    />
  );
}
