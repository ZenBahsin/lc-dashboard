import React, { ReactNode } from "react";

interface Props {
  isTrue: boolean;
  children: ReactNode;
  whenFalse?: ReactNode;
}

const Conditional = ({ isTrue, children, whenFalse = null }: Props) => {
  return isTrue ? <>{children}</> : <>{whenFalse}</>;
};

export default Conditional;
