import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInteractivoComponent } from './quiz-interactivo.component';

describe('QuizInteractivoComponent', () => {
  let component: QuizInteractivoComponent;
  let fixture: ComponentFixture<QuizInteractivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizInteractivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizInteractivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
