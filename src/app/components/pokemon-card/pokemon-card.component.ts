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
    this.service.listPokemon(pokemonName.toLocaleLowerCase()).subscribe(
      (data: any) => this.pokemonData = <Pokemon>{
        nome: data.name,
        codigo: data.id,
        altura: data.height * 2.54, // inches para cm
        peso: data.weight / 10, // lbs para kg
        vida: data.stats[0].base_stat,
        defesa: data.stats[2].base_stat,
        velocidade: data.stats[5].base_stat,
        ataque: data.stats[1].base_stat,
        tipos: data.types.map((type: any) => type.type.name),
        descricao: '',
        foto: data.sprites.front_default
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
    if (Number(this.pokemonData.codigo) != 1) {
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
    }
    else {
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