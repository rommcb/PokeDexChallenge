import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokedexService } from 'src/app/shared/services/pokedex.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit
{

  pokemonName: string = '';
  pokemon: Pokemon = { name: this.pokemonName }

  constructor(
    private _ps: PokedexService,
    private _router: Router,
    private _ar: ActivatedRoute
  ) { }

  ngOnInit(): void
  {
    this.pokemonName = this._ar.snapshot.paramMap.get('name') ?? ''
    this.getPokemon()
  }

  getPokemon()
  {
    this._ps.getPokemonByName(this.pokemonName).subscribe((value: Pokemon) =>
    {
      console.log(value)
      this.pokemon = value
    }),
      (error: any) => console.log(error.message)
  }


}
