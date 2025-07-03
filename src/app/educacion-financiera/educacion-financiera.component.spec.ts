import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducacionFinancieraComponent } from './educacion-financiera.component';

describe('EducacionFinancieraComponent', () => {
  let component: EducacionFinancieraComponent;
  let fixture: ComponentFixture<EducacionFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducacionFinancieraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducacionFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
