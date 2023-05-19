import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTravelLogComponent } from './view-travel-log.component';

describe('ViewTravelLogComponent', () => {
  let component: ViewTravelLogComponent;
  let fixture: ComponentFixture<ViewTravelLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTravelLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTravelLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
