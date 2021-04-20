import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMachinesComponent } from './show-machines.component';

describe('ShowMachinesComponent', () => {
  let component: ShowMachinesComponent;
  let fixture: ComponentFixture<ShowMachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMachinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
