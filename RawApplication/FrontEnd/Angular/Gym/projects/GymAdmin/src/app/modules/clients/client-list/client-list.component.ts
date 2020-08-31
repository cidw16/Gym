import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientsService} from '../../../core/data-services/clients/clients.service';
import {DeleteDialogComponent} from '../../users/delete-dialog/delete-dialog.component';
import {UserDialogComponent} from '../../users/user-dialog/user-dialog.component';
import {Client} from '../../../shared/models/clients.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface ClientDialogData {
  clientId: number;
  clientData: Client;
}

@Component({
  selector: 'gym-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  userId: string;
  name: string;

  clientList: Client[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource = new MatTableDataSource<Client>(this.clientList);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private readonly clientService: ClientsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getClientsList();
    this.dataSource.paginator = this.paginator;
  }

  private deleteClient(clientId): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { clientId: clientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientsList();
    });
  }

  private getClientsList(): void {
    this.clientService.getClients().subscribe(
      (result: Client[]) => {
        this.clientList = result;
        this.dataSource.data = this.clientList;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editClient(clientId: number): void {
    const clientQ = this.clientList.filter(function (us) {
      return us.id === clientId;
    });
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { clientId: clientId, userData: clientQ[0] }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientsList();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { userId: -1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientsList();
    });
  }
}
