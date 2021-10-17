import { Component, OnInit } from '@angular/core';
import { PokedexService } from './shared/services/pokedex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  title = 'PokeDexChallenge';

  constructor(private _ps: PokedexService) { }

  ngOnInit()
  {
    console.log('AppComponent > ngOnInit() > getAll()')
    this._ps.getPokemons()
  }
}





