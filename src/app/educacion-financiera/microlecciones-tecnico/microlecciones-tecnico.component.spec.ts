import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroleccionesTecnicoComponent } from './microlecciones-tecnico.component';

describe('MicroleccionesTecnicoComponent', () => {
  let component: MicroleccionesTecnicoComponent;
  let fixture: ComponentFixture<MicroleccionesTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicroleccionesTecnicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroleccionesTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
