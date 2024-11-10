import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnackbarComponent } from './create-snackbar.component';

describe('CreateSnackbarComponent', () => {
  let component: CreateSnackbarComponent;
  let fixture: ComponentFixture<CreateSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
