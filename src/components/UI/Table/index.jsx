import React, {useMemo} from "react";
import './style.scss';

const Table = ({ children, heads }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead><tr>{ heads.map(h => <th key={h}>{ h }</th>) }</tr></thead>
        <tbody>
          { children }
        </tbody>
      </table>
    </div>
  )
};


export default Table;
