
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-more-pokemon-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './more-pokemon-page.component.html',
  styleUrls: ['./more-pokemon-page.component.scss']
})
export class MorePokemonPageComponent {
  baseUrl: string = "https://pokeapi.co/api/v2/pokemon/";
  allpokemon: any[] = [];
  filteredPokemon: any[] = [];
  nextUrl: string = '';
  searchText: string = '';

 constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadPokemons(this.baseUrl);
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

  // Function to open the dialog
  openDialog(pokemon: any): void {
    const dialogRef = this.dialog.open(MorePokemonPageComponent, {
      data: { pokemon }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onNoClick(event: any, pokemon: any): void {
    event.stopPropagation();
    this.openDialog(pokemon);
  }
}























/* 

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-more-pokemon-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more-pokemon-page.component.html',
  styleUrls: ['./more-pokemon-page.component.scss']
})
export class MorePokemonPageComponent {
  constructor(
    public dialogRef: MatDialogRef<MorePokemonPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
*/