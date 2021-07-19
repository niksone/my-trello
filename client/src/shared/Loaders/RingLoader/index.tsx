
import { COLORS } from "../../constants";

import { LengthObject, LoaderSizeProps } from "./interfaces";
import { SpinnerRing, SpinnerWrapper } from "./RingLoaderElements";

const cssUnit: { [unit: string]: boolean } = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  "%": true
};

/**
 * If size is a number, append px to the value as default unit.
 * If size is a string, validate against list of valid units.
 * If unit is valid, return size as is.
 * If unit is invalid, console warn issue, replace with px as the unit.
 *
 * @param {(number | string)} size
 * @return {LengthObject} LengthObject
 */
export function parseLengthAndUnit(size: number | string): LengthObject {
  if (typeof size === "number") {
    return {
      value: size,
      unit: "px"
    };
  }
  let value: number;
  const valueString: string = (size.match(/^[0-9.]*/) || "").toString();
  if (valueString.includes(".")) {
    value = parseFloat(valueString);
  } else {
    value = parseInt(valueString, 10);
  }

  const unit: string = (size.match(/[^0-9]*$/) || "").toString();

  if (cssUnit[unit]) {
    return {
      value,
      unit
    };
  }

  console.warn(`React Spinners: ${size} is not a valid css value. Defaulting to ${value}px.`);

  return {
    value,
    unit: "px"
  };
}

export function cssValue(value: number | string): string {
  const lengthWithunit: LengthObject = parseLengthAndUnit(value);

  return `${lengthWithunit.value}${lengthWithunit.unit}`;
}

const RingLoader = ({size, loading = true, color = COLORS.primary, css='', speedMultiplier = 1}: LoaderSizeProps) => {

  const {value, unit} = {...parseLengthAndUnit(size)}

  return (
    loading
     ? 
     <SpinnerWrapper size={cssValue(size)}>
       <SpinnerRing value={value} unit={unit} color={color} speedMultiplier={speedMultiplier} i={1} />
       <SpinnerRing value={value} unit={unit} color={color} speedMultiplier={speedMultiplier} i={2} />
     </SpinnerWrapper>
     : null
  )
}

export default RingLoader;