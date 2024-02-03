import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentqrcodeComponent } from './paymentqrcode.component';

describe('PaymentqrcodeComponent', () => {
  let component: PaymentqrcodeComponent;
  let fixture: ComponentFixture<PaymentqrcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentqrcodeComponent]
    });
    fixture = TestBed.createComponent(PaymentqrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
