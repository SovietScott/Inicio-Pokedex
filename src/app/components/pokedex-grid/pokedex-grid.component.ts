import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokemonList } from 'src/app/models/PokemonList';
import { PokemonListService } from 'src/app/services/PokemonListService/pokemon-list.service';

@Component({
  selector: 'app-pokedex-grid',
  templateUrl: './pokedex-grid.component.html',
  styleUrls: ['./pokedex-grid.component.css']
})
export class PokedexGridComponent implements OnInit {
  protected pokemonList: PokemonList = {} as PokemonList;
  protected pokemonData: Pokemon[] = [];

  constructor(private service: PokemonListService, private route: ActivatedRoute,
    private router: Router) {
  }

  loadList(url?: string) {
    if (url) {
      this.service.listPokemons(url).subscribe((data: any) => {
        this.pokemonList = data;
        this.pokemonList.resultados.forEach((e) => {
          this.service.getData(e.nome).subscribe((res) => {
            e.info = res;
          });
        });
      });
    } else {
      this.service.listPokemons().subscribe((data: any) => {
        this.pokemonList = data;
        this.pokemonList.resultados.forEach((e) => {
          this.service.getData(e.nome).subscribe((res) => {
            e.info = res;
          });
        });
      });
    }
  }

  redirectToPokemon(name: string) {
    this.router.navigate(([`${name}`])).then(() => {
      window.location.reload();
    });
  }

  onRefresh(type: string): void {
    let url = [this.pokemonList.anterior , this.pokemonList.proximo ]
    this.pokemonList = {} as PokemonList;
    switch (type) {
      case "left":
        this.loadList(url[0])
        break;
      case ('right'):
        this.loadList(url[1])
        break;
    }
  }

  ngOnInit(): void {
    this.loadList();
  }
}
