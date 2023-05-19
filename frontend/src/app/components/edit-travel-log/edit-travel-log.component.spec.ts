import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTravelLogComponent } from './edit-travel-log.component';

describe('EditTravelLogComponent', () => {
  let component: EditTravelLogComponent;
  let fixture: ComponentFixture<EditTravelLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTravelLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTravelLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
