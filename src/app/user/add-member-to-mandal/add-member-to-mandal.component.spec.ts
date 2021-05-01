import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberToMandalComponent } from './add-member-to-mandal.component';

describe('AddMemberToMandalComponent', () => {
  let component: AddMemberToMandalComponent;
  let fixture: ComponentFixture<AddMemberToMandalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberToMandalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberToMandalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
