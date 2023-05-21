import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexGridComponent } from './pokedex-grid.component';

describe('PokedexGridComponent', () => {
  let component: PokedexGridComponent;
  let fixture: ComponentFixture<PokedexGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
