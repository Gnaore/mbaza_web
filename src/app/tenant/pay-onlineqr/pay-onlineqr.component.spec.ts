import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayOnlineqrComponent } from './pay-onlineqr.component';

describe('PayOnlineqrComponent', () => {
  let component: PayOnlineqrComponent;
  let fixture: ComponentFixture<PayOnlineqrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayOnlineqrComponent]
    });
    fixture = TestBed.createComponent(PayOnlineqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
