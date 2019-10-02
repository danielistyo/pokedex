import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import DropdownType from "../DropdownType/DropdownType";

function Header({ onFilterChange, page }) {
  const { PUBLIC_URL } = process.env;
  return (
    <div className="c-header">
      <div className="c-header__image-wrapper">
        <Link to={{ pathname: `/` }}>
          <img
            className="c-header__image"
            src={`${PUBLIC_URL}/logo.png`}
            alt="logo"
          />
        </Link>
      </div>
      {page !== "detail" && (
        <div className="c-header__filter">
          <DropdownType onChange={onFilterChange} />
        </div>
      )}
    </div>
  );
}

export default Header;
