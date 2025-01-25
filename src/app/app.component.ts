import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  baseUrl: string = "https://pokeapi.co/api/v2/pokemon/";
  allpokemon: any[] = [];
  filteredPokemon: any[] = [];
  nextUrl: string = '';
  searchText: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loadPokemons(this.baseUrl);

    setInterval(() => {
      this.loadMore();
    }, 100);
  }

  async loadPokemons(url: string) {
    this.http.get<any>(url).subscribe(data => {
      this.allpokemon = this.allpokemon.concat(data.results);
      this.filteredPokemon = this.allpokemon; // Initialize filteredPokemon with all Pokemon
      this.nextUrl = data.next;

      console.log(this.allpokemon);

      data.results.forEach((pokemon: any) => {
        this.http.get<any>(pokemon.url).subscribe(details => {
          if (details.sprites && details.sprites.other && details.sprites.other.dream_world) {
            pokemon.sprites = details.sprites;
            //console.log(details.sprites.other.dream_world.front_default);
          }
        });
      });
    });
  }

  loadMore() {
    if (this.nextUrl) {
      this.loadPokemons(this.nextUrl);
      console.log(this.nextUrl);
    }
  }

  // Filter function to update the displayed Pokémon based on the search text
  filterPokemon() {
    this.filteredPokemon = this.allpokemon.filter(pokemon => pokemon.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
