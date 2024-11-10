import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterSnackbarComponent } from './unregister-snackbar.component';

describe('UnregisterSnackbarComponent', () => {
  let component: UnregisterSnackbarComponent;
  let fixture: ComponentFixture<UnregisterSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnregisterSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisterSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
