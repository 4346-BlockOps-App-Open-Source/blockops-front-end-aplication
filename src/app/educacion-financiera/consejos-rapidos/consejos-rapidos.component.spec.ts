import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejosRapidosComponent } from './consejos-rapidos.component';

describe('ConsejosRapidosComponent', () => {
  let component: ConsejosRapidosComponent;
  let fixture: ComponentFixture<ConsejosRapidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsejosRapidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsejosRapidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
