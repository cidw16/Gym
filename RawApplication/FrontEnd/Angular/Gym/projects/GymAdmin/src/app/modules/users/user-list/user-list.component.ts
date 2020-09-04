import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UsersService} from '../../../core/data-services/users/users.service';
import {User} from '../../../shared/models/users.model';
import {MatDialog} from '@angular/material/dialog';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {CONFIG} from '../../../config';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

export interface DialogData {
  userId: number;
  userData: User;
}

@Component({
  selector: 'gym-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userId: string;
  name: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  userList: User[];
  displayedColumns: string[] = ['id', 'userName', 'firstName', 'lastName', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>(this.userList);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private readonly userService: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUsersList();
    this.dataSource.paginator = this.paginator;
  }

  private deleteUser(userId): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsersList();

      this.snackBar.open('User deleted', 'close', {
        duration: CONFIG.snackBarDuration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }

  private getUsersList(): void {
    this.userService.getUsers().subscribe(
      (result: User[]) => {
        this.userList = result;
        this.dataSource.data = this.userList;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editUser(userId: number): void {
    const userQ = this.userList.filter(function (us) {
      return us.id == userId;
    });
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { userId: userId, userData: userQ[0] }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsersList();

      this.snackBar.open('User updated', 'close', {
        duration: CONFIG.snackBarDuration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { userId: -1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsersList();

      this.snackBar.open('User added', 'close', {
        duration: CONFIG.snackBarDuration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }
}

