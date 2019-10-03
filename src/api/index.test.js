import endpoints from "./index";

global.fetch = jest.fn().mockImplementation(url => {
  return url;
});

it("test endpoints", () => {
  const { getPokemonType, getPokemon } = endpoints;
  expect(getPokemonType(1)).toBe("https://pokeapi.co/api/v2/type/1");
  expect(getPokemon({ id: 1 })).toBe("https://pokeapi.co/api/v2/pokemon/1");
});
