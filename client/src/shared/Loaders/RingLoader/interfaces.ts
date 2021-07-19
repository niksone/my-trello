export interface LengthObject {
    value: number;
    unit: string;
  }
  
  export interface CommonProps {
    color?: string;
    loading?: boolean;
    css?: string;
    speedMultiplier?: number
  }
  
  export type LengthType = number | string;
  
  export interface LoaderSizeProps extends CommonProps {
    size: LengthType;
  }
  