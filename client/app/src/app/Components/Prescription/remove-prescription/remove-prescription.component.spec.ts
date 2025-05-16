import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RemovePrescriptionComponent} from './remove-prescription.component';

describe('RemovePrescriptionComponent', () => {
  let component: RemovePrescriptionComponent;
  let fixture: ComponentFixture<RemovePrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemovePrescriptionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
