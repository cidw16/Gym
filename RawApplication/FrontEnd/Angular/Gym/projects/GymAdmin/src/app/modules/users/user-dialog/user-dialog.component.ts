import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData, UserListComponent} from '../user-list/user-list.component';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UsersService} from '../../../core/data-services/users/users.service';
import {User} from '../../../shared/models/users.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'gym-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  public user: User = new User();
  public isUpdate = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  idFormControl =  new FormControl('', [
    Validators.required,
    Validators.pattern("^(0|[1-9][0-9]*)$")
  ]);
  userNameFormControl = new FormControl('', [
    Validators.required
  ]);
  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<UserListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly userService: UsersService,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public addUser(form): void {
    if (!form.valid) {
      return;
    }
    if (this.isUpdate) {
      this.userService
        .editUser(this.user).subscribe(
        () => {
          this.dialogRef.close();
        });
    } else {
      this.userService
        .addUser(this.user).subscribe(
        () => {
          this.dialogRef.close();
        });
    }
  }
  ngOnInit(): void {
    if (this.data.userId > 0)
    {
      this.isUpdate = true;
      this.user = this.data.userData;
      this.idFormControl = new FormControl({value: '', disabled: true});
    }
  }
}
