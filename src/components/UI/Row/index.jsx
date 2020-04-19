import React from 'react';

import './styles.scss';

const Row = ({ children, ratio, className }) => {
  const slotQuantity = React.Children.count(children);
  const slotWidthSet = ratio ? ratio : Array(slotQuantity).fill(100 / slotQuantity);
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        style: { flex: `0 0 ${slotWidthSet[index]}%` }
      })
    });
  };
  
  return (
    <div className={`form-row ${className}`}>
      { renderChildren() }
    </div>
  )
};

export default Row;

