
import { useState } from "react";

import { CommonProps, LengthObject, LengthType, LoaderSizeProps } from "./interfaces";
import { SpinnerRing, SpinnerWrapper } from "./RingLoaderElements";

const commonValues: Required<CommonProps> = {
  loading: true,
  color: "#000000",
  css: "",
  speedMultiplier: 1
};

export function sizeDefaults(sizeValue: number): Required<LoaderSizeProps> {
  return Object.assign({}, commonValues, { size: sizeValue });
}

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


// class Loader extends React.PureComponent<Required<LoaderSizeProps>> {
//   public static defaultProps = sizeDefaults(60);

//   public getSize = (): LengthType => {
//     return this.props.size;
//   };

//   public style = (i: number): any => {
//     const { color, speedMultiplier } = this.props;
//     const { value, unit } = parseLengthAndUnit(this.getSize());

  //   return css`
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: ${`${value}${unit}`};
  //     height: ${`${value}${unit}`};
  //     border: ${`${value / 10}${unit}`} solid ${color};
  //     opacity: 0.4;
  //     border-radius: 100%;
  //     animation-fill-mode: forwards;
  //     perspective: 800px;
  //     animation: ${i === 1 ? right : left} ${2 / speedMultiplier}s 0s infinite linear;
  //   `;
  // };

  // public wrapper = (): any => {
  //   return css`
  //     width: ${cssValue(this.getSize())};
  //     height: ${cssValue(this.getSize())};
  //     position: relative;
  //   `;
  // };

//   public render(): JSX.Element | null {
//     const { loading, css } = this.props;

//     return loading ? (
//       <span style={`${this.wrapper()} ${css}`}>
//         <span style={this.style(1)} />
//         <span style={this.style(2)} />
//       </span>
//     ) : null;
//   }
// }

const Loader = ({size}: LoaderSizeProps) => {
  const [{loading, color, css, speedMultiplier}, setLoader] = useState({
    loading: true,
    color: "var(--color-primary)",
    css: "",
    speedMultiplier: 1
  })

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

export default Loader;