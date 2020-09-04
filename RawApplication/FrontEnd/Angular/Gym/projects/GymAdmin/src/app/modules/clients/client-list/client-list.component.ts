import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientsService} from '../../../core/data-services/clients/clients.service';
import {Client} from '../../../shared/models/clients.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ClientEditDialogComponent} from '../client-edit-dialog/client-edit-dialog.component';
import {ClientDeleteDialogComponent} from '../client-delete-dialog/client-delete-dialog.component';
import {Router, ActivatedRoute} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {CONFIG} from '../../../config';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

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

  clientId: string;
  name: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  clientList: Client[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource = new MatTableDataSource<Client>(this.clientList);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private readonly clientService: ClientsService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getClientsList();
    this.dataSource.paginator = this.paginator;
  }

  private deleteClient(clientId): void {
    const dialogRef = this.dialog.open(ClientDeleteDialogComponent, {
      width: '250px',
      data: { clientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientsList();

      this.snackBar.open('Client deleted', 'close', {
        duration: CONFIG.snackBarDuration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
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
    const dialogRef = this.dialog.open(ClientEditDialogComponent, {
      width: '400px',
      data: { clientId: clientId, clientData: clientQ[0] }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientsList();

      this.snackBar.open('Client updated', 'close', {
        duration: CONFIG.snackBarDuration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientEditDialogComponent, {
      width: '400px',
      data: { clientId: -1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientsList();
      this.snackBar.open('Client added', 'close', {
        duration: CONFIG.snackBarDuration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }

  openClientDetails(clientName: string): void {
    this.router.navigate(['/clients/clientDetails'], { queryParams: { clientName: clientName } });
  }
  openChartDialog(clientName: string): void {
    this.router.navigate(['/clients/clientCharts'], { queryParams: { clientName: clientName } });
  }
}
