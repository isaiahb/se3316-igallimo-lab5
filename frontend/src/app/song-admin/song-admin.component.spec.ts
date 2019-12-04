import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongAdminComponent } from './song-admin.component';

describe('SongAdminComponent', () => {
  let component: SongAdminComponent;
  let fixture: ComponentFixture<SongAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
