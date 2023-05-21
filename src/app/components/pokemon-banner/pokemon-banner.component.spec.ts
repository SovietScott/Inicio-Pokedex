import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonBannerComponent } from './pokemon-banner.component';

describe('PokemonBannerComponent', () => {
  let component: PokemonBannerComponent;
  let fixture: ComponentFixture<PokemonBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
