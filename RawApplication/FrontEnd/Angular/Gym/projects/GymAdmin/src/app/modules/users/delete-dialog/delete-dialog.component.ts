import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserListComponent} from '../user-list/user-list.component';
import {UsersService} from '../../../core/data-services/users/users.service';
import {DialogData} from '../user-list/user-list.component';

@Component({
  selector: 'gym-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly userService: UsersService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteUser(): void {
    this.userService
      .deleteUser(this.data.userId).subscribe(
      () => {
        this.dialogRef.close();
      });
  }
  ngOnInit(): void {
    ;
  }

}
