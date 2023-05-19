import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelLogComponent } from './add-travel-log.component';

describe('AddTravelLogComponent', () => {
  let component: AddTravelLogComponent;
  let fixture: ComponentFixture<AddTravelLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTravelLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTravelLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
