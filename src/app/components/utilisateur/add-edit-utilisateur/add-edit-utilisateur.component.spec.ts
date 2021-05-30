import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUtilisateurComponent } from './add-edit-utilisateur.component';

describe('AddEditUtilisateurComponent', () => {
  let component: AddEditUtilisateurComponent;
  let fixture: ComponentFixture<AddEditUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
