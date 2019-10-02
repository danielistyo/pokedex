import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./List.scss";

const { PUBLIC_URL } = process.env;

function ListItem({ name, id }) {
  const [src, setSrc] = useState(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  );
  function handleError() {
    setSrc(`${PUBLIC_URL}/favicon.ico`);
  }
  return (
    <Link
      to={{ pathname: `/pokemon/${id}`, state: { id, name } }}
      style={{ textDecoration: "none" }}
    >
      <div className="c-list__item">
        <img
          className="c-list__item-img"
          src={src}
          alt="logo"
          onError={handleError}
        />
        <div className="c-list__item-title">{name.toUpperCase()}</div>
      </div>
    </Link>
  );
}

export default function List({ items, onLoadMore }) {
  useEffect(() => {
    function loadMore(e) {
      const html = document.querySelector("html").getBoundingClientRect();
      if (window.innerHeight >= Math.floor(html.bottom)) {
        onLoadMore();
      }
    }
    window.addEventListener("scroll", loadMore);
    return () => {
      window.removeEventListener("scroll", loadMore);
    };
  }, [onLoadMore]);

  return (
    <div className="c-list">
      {items.map(({ name, id }, index) => {
        return <ListItem key={index} id={id} name={name} />;
      })}
    </div>
  );
}
