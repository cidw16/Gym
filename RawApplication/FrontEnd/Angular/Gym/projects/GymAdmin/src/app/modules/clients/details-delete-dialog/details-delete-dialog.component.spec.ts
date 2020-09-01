import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDeleteDialogComponent } from './details-delete-dialog.component';

describe('DetailsDeleteDialogComponent', () => {
  let component: DetailsDeleteDialogComponent;
  let fixture: ComponentFixture<DetailsDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
