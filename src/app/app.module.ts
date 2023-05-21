import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PokemonBannerComponent } from './components/pokemon-banner/pokemon-banner.component';
import { PokedexGridComponent } from './components/pokedex-grid/pokedex-grid.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { PokedexIndexComponent } from './components/pokedex-index/pokedex-index.component';
import { StatPipe } from './shared/StatPipe/stat.pipe';

const routes: Routes = [
  {path: '' , component: PokedexIndexComponent },
  {path: ':name' , component: PokemonCardComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonBannerComponent,
    PokedexGridComponent,
    PokemonCardComponent,
    PokedexIndexComponent,
    StatPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
