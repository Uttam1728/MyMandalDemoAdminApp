import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMandalComponent } from './search-mandal.component';

describe('SearchMandalComponent', () => {
  let component: SearchMandalComponent;
  let fixture: ComponentFixture<SearchMandalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMandalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMandalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
