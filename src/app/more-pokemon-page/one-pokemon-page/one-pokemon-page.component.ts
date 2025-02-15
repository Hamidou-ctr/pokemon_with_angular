import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-one-pokemon-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './one-pokemon-page.component.html',
  styleUrl: './one-pokemon-page.component.scss'
})
export class OnePokemonPageComponent {

  constructor(
    public dialogRef: MatDialogRef<OnePokemonPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
