import { Pokemon } from "./pokemon.model";

export class PokemonApi
{
  count: number = 0;
  next?: string;
  previous?: string;
  results: Pokemon[] = []
}