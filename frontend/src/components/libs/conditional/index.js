import React from 'react';

const Conditional = ({ isTrue, children, whenFalse = null }) => {
  return isTrue ? <>{children}</> : <>{whenFalse}</>;
};

export default Conditional;
