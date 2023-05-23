import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonListService } from 'src/app/services/PokemonListService/pokemon-list.service';

@Component({
  selector: 'app-pokemon-banner',
  templateUrl: './pokemon-banner.component.html',
  styleUrls: ['./pokemon-banner.component.css']
})
export class PokemonBannerComponent {
  protected isMobile: boolean = this.detectMobile();

  constructor(private service: PokemonListService, private route: ActivatedRoute,
    private router: Router) { }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.isMobile = this.detectMobile(event.target.innerWidth, event.target.innerHeight);
  }

  detectMobile(width: number = window.innerWidth, height: number = window.innerHeight) {
    return ((width <= 800) && (height <= 950));
  }

  onDetail(value: string) {
    if (value.charAt(0) === '#') {
      value = value.slice(1)
    }
    this.router.navigate(([`/${value}`])).then(() => {
      window.location.reload();
    });
  }
}
