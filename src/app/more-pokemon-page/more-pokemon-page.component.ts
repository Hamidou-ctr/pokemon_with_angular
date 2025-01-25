import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-more-pokemon-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more-pokemon-page.component.html',
  styleUrl: './more-pokemon-page.component.scss'
})
export class MorePokemonPageComponent implements OnInit {
  pokemons: any[] = [];
  baseUrl: string = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(this.baseUrl).subscribe(data => {
      this.pokemons = data.results;
    });
  }
}
