import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSnackbarComponent } from './delete-snackbar.component';

describe('DeleteSnackbarComponent', () => {
  let component: DeleteSnackbarComponent;
  let fixture: ComponentFixture<DeleteSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
