import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingUdpateOverviewComponent } from './setting-udpate-overview.component';

describe('SettingUdpateOverviewComponent', () => {
  let component: SettingUdpateOverviewComponent;
  let fixture: ComponentFixture<SettingUdpateOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingUdpateOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingUdpateOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
