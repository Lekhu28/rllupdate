import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RemoveMedicineComponent} from './remove-medicine.component';

describe('RemoveMedicineComponent', () => {
  let component: RemoveMedicineComponent;
  let fixture: ComponentFixture<RemoveMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveMedicineComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
