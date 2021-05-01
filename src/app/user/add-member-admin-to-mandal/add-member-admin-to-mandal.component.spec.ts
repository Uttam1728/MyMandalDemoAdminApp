import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberAdminToMandalComponent } from './add-member-admin-to-mandal.component';

describe('AddMemberAdminToMandalComponent', () => {
  let component: AddMemberAdminToMandalComponent;
  let fixture: ComponentFixture<AddMemberAdminToMandalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberAdminToMandalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberAdminToMandalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
