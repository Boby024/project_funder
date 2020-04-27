import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFundComponent } from './project-fund.component';

describe('ProjectFundComponent', () => {
  let component: ProjectFundComponent;
  let fixture: ComponentFixture<ProjectFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
