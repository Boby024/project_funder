import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectOverviewComponent } from './list-project-overview.component';

describe('ListProjectOverviewComponent', () => {
  let component: ListProjectOverviewComponent;
  let fixture: ComponentFixture<ListProjectOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjectOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
