import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonApi } from 'src/app/models/pokemonAPI.model';



@Injectable({
  providedIn: 'root'
})
export class PokedexService
{

  private url: string = environment.urlApi

  pokemonApi: PokemonApi = { count: 0, results: [] }
  pokemonList: Pokemon[] = []
  currentPokemon: Pokemon = { name: '' }

  constructor(
    private _client: HttpClient,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  getPokemons(): Observable<PokemonApi>
  {
    return this._client.get<PokemonApi>(this.url + "pokemon?offset=0&limit=1118")
  }

  getPokemonByName(pokemonName: string): Observable<Pokemon>
  {
    return this._client.get<Pokemon>(this.url + "pokemon/" + pokemonName)
  }
}
