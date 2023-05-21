import { Pokemon } from "./Pokemon";

export interface PokemonList{
  anterior : string;
  proximo : string;
  resultados : [{
    nome: string;
    info : Pokemon;
    url : string;
  }];
}