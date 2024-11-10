import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterErrorSnackbarComponent } from './unregister-error-snackbar.component';

describe('UnregisterErrorSnackbarComponent', () => {
  let component: UnregisterErrorSnackbarComponent;
  let fixture: ComponentFixture<UnregisterErrorSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnregisterErrorSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisterErrorSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
