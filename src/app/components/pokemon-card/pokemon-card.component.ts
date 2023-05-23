import { Component, OnInit , HostListener} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonListService } from 'src/app/services/PokemonListService/pokemon-list.service';
import { Pokemon } from '../../models/Pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit{
  protected pokemonName: string = '';
  protected pokemonData: Pokemon = {} as Pokemon;
  protected random = Math.floor(Math.random() * (50));
  protected isMobile : boolean = this.detectMobile();

  constructor(private service: PokemonListService, private route: ActivatedRoute,
    private router: Router) {
  }

  onLoad(pokemonName: string = this.pokemonName, pokemonService: PokemonListService = this.service,
    route: ActivatedRoute = this.route): void {
    pokemonName = route.snapshot.params['name'];
    this.service.getData(pokemonName).subscribe(
      (data: any) => {this.pokemonData = data}, 
      (error) => {
        alert("O pokémon não foi encontrado, por favor tente novamente :/"),
        this.router.navigate(([``])).then(() => {
          window.location.reload();
        });
      }
    )
    this.service.getDescription(pokemonName.toLocaleLowerCase()).subscribe(
      (data: any) => this.pokemonData.descricao = data.flavor_text_entries[
        this.random // índice máximo das descrições
      ].flavor_text
    )
  }

  @HostListener('window:resize', ['$event']) onResize(event : any) {
    this.isMobile = this.detectMobile(event.target.innerWidth, event.target.innerHeight);
  }

  detectMobile(width : number = window.innerWidth, height : number = window.innerHeight) {
    return ( ( width <= 1000 ) && ( height <= 950 ) );
  }

  onArrow(type: string): void | null {
    if (Number(this.pokemonData.codigo) != 0) {
      switch (type) {
        case ('left'):
          let code1 = String(Number(this.pokemonData.codigo) - 1);
          this.router.navigate(([`${code1}`])).then(() => {
            window.location.reload();
          });
          break;
        case ('right'):
          let code2 = String(Number(this.pokemonData.codigo) + 1);
          this.router.navigate(([`${code2}`])).then(() => {
            window.location.reload();
          });
          break;
      }
    }else {
      return null
    }
  }

  onHome(): void {
    this.router.navigate(([``])).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.onLoad(this.pokemonName, this.service, this.route);
  }

}