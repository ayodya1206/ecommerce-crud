import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmComponent } from './edit-confirm.component';

describe('EditConfirmComponent', () => {
  let component: EditConfirmComponent;
  let fixture: ComponentFixture<EditConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
