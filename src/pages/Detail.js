import React, { useEffect, useState, useRef } from "react";
import { isEqual } from "lodash";
import Header from "../components/Header";
import api from "../api";
import "./Detail.scss";

export default function(props) {
  const { id } = props.location.state;
  const [pokemon, setPokemon] = useState({});
  const prevPokemon = useRef();

  useEffect(() => {
    if (isEqual(prevPokemon.current, pokemon)) {
      return;
    }
    api.getPokemon({ id }).then(async res => {
      const resJson = await res.json();
      setPokemon(resJson);
      prevPokemon.current = resJson;
    });
  });

  const { sprites, name, types, height, weight, stats } = pokemon;
  return (
    <div>
      <Header page="detail" />
      <div className="c-detail-pokemon">
        <h4 className="c-detail-pokemon__name">{name && name.toUpperCase()}</h4>
        <div className="c-detail-pokemon__gallery">
          {sprites &&
            Object.keys(sprites).map(key => {
              if (sprites[key])
                return (
                  <div key={key} className="c-detail-pokemon__img-wrapper">
                    <img
                      className="c-detail-pokemon__img"
                      alt="logo"
                      src={sprites[key]}
                    />
                    <div className="c-detail-pokemon__img-title">
                      {key.toUpperCase()}
                    </div>
                  </div>
                );
            })}
        </div>
        <hr />
        <h4 className="c-detail-pokemon__name">STATUS</h4>
        <div className="c-description__general">
          <h4 className="c-description__name">
            Pokedex ID:&nbsp;
            <span className="c-description__value">{weight}</span>
          </h4>
          <h4 className="c-description__name">
            Type:&nbsp;
            <span className="c-description__value">
              {types && types.map(type => type.type.name).join(", ")}
            </span>
          </h4>
          <h4 className="c-description__name">
            Height:&nbsp;
            <span className="c-description__value">{height}</span>
          </h4>
          <h4 className="c-description__name">
            Weight:&nbsp;
            <span className="c-description__value">{weight}</span>
          </h4>
          {stats &&
            stats.map(status => {
              return (
                <h4 key={status.stat.name} className="c-description__name">
                  {status.stat.name}:&nbsp;
                  <span className="c-description__value">
                    {status.base_stat}
                  </span>
                </h4>
              );
            })}
        </div>
      </div>
    </div>
  );
}
