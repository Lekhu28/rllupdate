import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInvoicesComponent } from './report-invoices.component';

describe('ReportInvoicesComponent', () => {
  let component: ReportInvoicesComponent;
  let fixture: ComponentFixture<ReportInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
