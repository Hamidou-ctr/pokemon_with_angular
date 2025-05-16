import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OnePokemonPageComponent } from './one-pokemon-page/one-pokemon-page.component';

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonSprites {
  other: {
    dream_world: {
      front_default: string;
    };
  };
}

interface PokemonDetails {
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
}

interface Pokemon {
  name: string;
  url: string;
  imageUrl?: string;
  types?: PokemonType[];
  id?: number; 

}

interface PokemonApiResponse {
  results: Pokemon[];
  next: string;
}


@Component({
  selector: 'app-more-pokemon-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './more-pokemon-page.component.html',
  styleUrls: ['./more-pokemon-page.component.scss']
})
export class MorePokemonPageComponent implements OnInit {
  baseUrl: string = "https://pokeapi.co/api/v2/pokemon/";
  allPokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  nextUrl: string = '';
  searchText: string = '';

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadPokemons(this.baseUrl);
  }

  loadPokemons(url: string): void {
    this.http.get<PokemonApiResponse>(url).subscribe(data => {
      this.allPokemon = [...this.allPokemon, ...data.results];
      this.filteredPokemon = [...this.allPokemon];
      this.nextUrl = data.next;

      this.allPokemon.forEach(pokemon => {
        const id = pokemon.url.split('/')[6];
        pokemon.id = parseInt(id, 10);
        pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        console.log(pokemon.name);
        console.log(pokemon.id);
      });
      this.allPokemon.sort((a, b) => (a.id || 0) - (b.id || 0));
      console.log(this.allPokemon);

      data.results.forEach(pokemon => {
        this.http.get<PokemonDetails>(pokemon.url).subscribe(details => {
          pokemon.imageUrl = details.sprites.other?.dream_world?.front_default || '';
          pokemon.types = details.types;
        });
      });
    });
  }

  loadMore(): void {
    if (this.nextUrl) {
      this.loadPokemons(this.nextUrl);
    }
  }

  filterPokemon(): void {
    if (!this.searchText) {
      this.filteredPokemon = [...this.allPokemon];
      return;
    }
    
    const searchTerm = this.searchText.toLowerCase();
    this.filteredPokemon = this.allPokemon.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm)
    );
  }

  openDialog(pokemon: Pokemon): void {
    this.dialog.open(OnePokemonPageComponent, {
      data: { pokemon },
    });
  }

  onNoClick(event: Event, pokemon: Pokemon): void {
    event.stopPropagation();
    this.openDialog(pokemon);
  }
}




/* 

interface Pokemon {
  name: string;
  url: string;
  imageUrl?: string;
  types?: PokemonType[];
  id?: number; 
  sprites?: PokemonSprites;
  abilities?: { ability: { name: string } }[];
  stats?: { base_stat: number; stat: { name: string } }[];
  height?: number;
  weight?: number;
  base_experience?: number;
  moves?: { move: { name: string } }[];
  species?: { name: string };
  habitat?: { name: string };
  color?: { name: string };
  shape?: { name: string };
  flavor_text_entries?: { flavor_text: string; language: { name: string } }[];

}



  TypesPokémon:  [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
    'unknown',
    'shadow'
  ]
*/