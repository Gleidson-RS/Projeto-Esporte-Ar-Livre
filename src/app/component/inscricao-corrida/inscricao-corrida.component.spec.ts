import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscricaoCorridaComponent } from './inscricao-corrida.component';

describe('InscricaoCorridaComponent', () => {
  let component: InscricaoCorridaComponent;
  let fixture: ComponentFixture<InscricaoCorridaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscricaoCorridaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscricaoCorridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
