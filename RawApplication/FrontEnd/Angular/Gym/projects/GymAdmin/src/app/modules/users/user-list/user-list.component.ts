import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UsersService} from '../../../core/data-services/users/users.service';
import {User} from '../../../shared/models/users.model';
import {MatDialog} from '@angular/material/dialog';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';

@Component({
  selector: 'gym-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  animal: string;
  name: string;

  userList: User[];
  displayedColumns: string[] = ['id', 'userName', 'firstName', 'lastName', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>(this.userList);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private readonly userService: UsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsersList();
    this.dataSource.paginator = this.paginator;
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
  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '350px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

