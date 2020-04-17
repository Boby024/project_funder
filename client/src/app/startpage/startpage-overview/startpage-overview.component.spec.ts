import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartpageOverviewComponent } from './startpage-overview.component';

describe('StartpageOverviewComponent', () => {
  let component: StartpageOverviewComponent;
  let fixture: ComponentFixture<StartpageOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartpageOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartpageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
