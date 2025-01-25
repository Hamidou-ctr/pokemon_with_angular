import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorePokemonPageComponent } from './more-pokemon-page.component';

describe('MorePokemonPageComponent', () => {
  let component: MorePokemonPageComponent;
  let fixture: ComponentFixture<MorePokemonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MorePokemonPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MorePokemonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
