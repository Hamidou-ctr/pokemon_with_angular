import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePokemonPageComponent } from './one-pokemon-page.component';

describe('OnePokemonPageComponent', () => {
  let component: OnePokemonPageComponent;
  let fixture: ComponentFixture<OnePokemonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnePokemonPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnePokemonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
