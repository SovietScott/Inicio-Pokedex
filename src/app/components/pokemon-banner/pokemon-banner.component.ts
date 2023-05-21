import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonListService } from 'src/app/services/PokemonListService/pokemon-list.service';

@Component({
  selector: 'app-pokemon-banner',
  templateUrl: './pokemon-banner.component.html',
  styleUrls: ['./pokemon-banner.component.css']
})
export class PokemonBannerComponent {

  constructor(private service : PokemonListService, private route: ActivatedRoute,
  private router: Router){}

  onDetail(value : string){
    this.router.navigate(([`/${value}`])).then(() => {
      window.location.reload();
    });
  }
}
