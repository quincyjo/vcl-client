import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormStatusComponent } from './form-status.component';

describe('FormStatusComponent', () => {
  let component: FormStatusComponent;
  let fixture: ComponentFixture<FormStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormStatusComponent
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
