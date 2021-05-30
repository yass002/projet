import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStructureComponent } from './add-edit-structure.component';

describe('AddEditStructureComponent', () => {
  let component: AddEditStructureComponent;
  let fixture: ComponentFixture<AddEditStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
