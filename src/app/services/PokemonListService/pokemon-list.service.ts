import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, first } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokemonList } from 'src/app/models/PokemonList';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  private API: string = 'https://pokeapi.co/api/v2/pokemon/'
  private APIGroup: string = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
  private APIDescription: string = 'https://pokeapi.co/api/v2/pokemon-species/'
  public httpOptions: {
    headers: HttpHeaders,
  };  

  constructor(private http: HttpClient) { 
    this.httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })};
  }

  listPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.API + name.toLocaleLowerCase(), this.httpOptions).pipe(
      first()
    );
  }

  listPokemons(nextUrl?: string): any {
    if (nextUrl) this.APIGroup = nextUrl;

    return this.http.get<PokemonList>(this.APIGroup, this.httpOptions).pipe(
      map((res: any) => <PokemonList>{
        anterior: res.previous,
        proximo: res.next,
        resultados: res.results.map((result: any) => ({
          nome: result.name,
          url: result.url
        })),
      })
    )
  }

  getData(name : string) {
    return this.listPokemon(name.toLocaleLowerCase()).pipe(
      map(
        (data: any) => <Pokemon>{
          nome: data.name,
          codigo: data.id,
          altura: data.height * 10, // Decimetro para Centimetro
          peso: data.weight / 10, // Hectograma para Kg
          vida: data.stats[0].base_stat,
          defesa: data.stats[2].base_stat,
          velocidade: data.stats[5].base_stat,
          ataque: data.stats[1].base_stat,
          tipos: data.types.map((type: any) => type.type.name),
          descricao: '',
          foto: data.sprites.front_default
        }
      ),
    )
  }

  getDescription(id: string | number): Observable<Object> {
    if (typeof id === "string") id.toLocaleLowerCase()
    return this.http.get(this.APIDescription + id, this.httpOptions).pipe(
      first()
    );
  }

}
