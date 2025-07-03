import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaRecursosComponent } from './biblioteca-recursos.component';

describe('BibliotecaRecursosComponent', () => {
  let component: BibliotecaRecursosComponent;
  let fixture: ComponentFixture<BibliotecaRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecaRecursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotecaRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
