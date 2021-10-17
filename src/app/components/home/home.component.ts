import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonApi } from 'src/app/models/pokemonAPI.model';
import { PokedexService } from 'src/app/shared/services/pokedex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
  // full list from DB
  pokemonList: Pokemon[] = [];


  // Filter properties
  @Input() readonly placeholder: string = 'Search a pokemon';
  @Output() setValue: EventEmitter<string> = new EventEmitter();
  private _searchSubject: Subject<string> = new Subject();
  pokemonFilteredList: Pokemon[] = []


  // Pagination properties
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  pokemonListPage: Pokemon[] = []
  length: number = 0;
  pageSize: number = 10;
  sliceStart: number = 0;
  sliceEnd: number = this.pageSize;
  pageSizeOptions: number[] = [10, 20, 50];


  constructor(
    private _ps: PokedexService,
  )
  {
    this._setSearchSubscription();
  }

  ngOnInit(): void
  {
    this._getPokemons()
  }

  ngOnDestroy()
  {
    this._searchSubject.unsubscribe();
  }

  // public methods

  public updateSearch(event: Event)
  {
    this._searchSubject.next((<HTMLInputElement>event.target).value);
  }

  onPaginationChange(event: PageEvent)
  {
    //event.pageIndex = 0;
    this.pageSize = event.pageSize;
    this.sliceStart = event.pageSize * event.pageIndex;
    this.sliceEnd = this.sliceStart + event.pageSize;

    if (this.sliceEnd > this.length)
    {
      this.sliceEnd = this.length
    }

    if (this.pokemonFilteredList.length == 0)
    {
      this.pokemonListPage = this.pokemonList.slice(this.sliceStart, this.sliceEnd);
    } else
    {
      this.pokemonListPage = this.pokemonFilteredList.slice(this.sliceStart, this.sliceEnd);


    }

  }

  onSearchSubmit(searchInput: string): void
  {

    if (searchInput == null || searchInput == '')
    {
      this.pokemonFilteredList = this.pokemonList
      this.pokemonListPage = this.pokemonList
    } else
    {
      searchInput = searchInput.toLowerCase()
      this.pokemonFilteredList = this.pokemonList.filter(p => p.name.includes(searchInput ?? ''))
      if (this.pokemonFilteredList.length != 0)
      {
        console.log(this.pokemonFilteredList)
        this._hideErrorMessage()
        this._updatePaginationBasedOnList(this.pokemonFilteredList);
      } else
      {
        this._displayErrorMessage();
      }

    }
  }


  // private methods

  private _getPokemons()
  {
    this._ps.getPokemons().subscribe(
      (value: PokemonApi) =>
      {
        this.pokemonList = value.results;
        this._updatePaginationBasedOnList(this.pokemonList);
      }),
      (error: any) => console.log(error.message)
  }

  private _setSearchSubscription()
  {
    this._searchSubject.pipe(
      debounceTime(500)
    ).subscribe((searchValue: string) =>
    {
      this.setValue.emit(searchValue);
      this.onSearchSubmit(searchValue);
    });
  }

  private _updatePaginationBasedOnList(list: Pokemon[])
  {
    this._resetPaginatorIndex();
    this.length = list.length;
    this.pokemonListPage = list.slice(this.sliceStart, this.sliceEnd)
  }

  private _hideErrorMessage()
  {
    document.getElementById('pokemonList')?.setAttribute('style', 'visibility:visible;')
    document.getElementById('errorMsg')?.setAttribute('style', 'visibility:hidden;')
  }

  private _displayErrorMessage()
  {
    document.getElementById('pokemonList')?.setAttribute('style', 'visibility:hidden; height: 5px;')
    document.getElementById('errorMsg')?.setAttribute('style', 'visibility:visible;')
  }

  private _resetPaginatorIndex()
  {

    if (this.paginator)
    {
      this.paginator.firstPage();
    }
  }
}
