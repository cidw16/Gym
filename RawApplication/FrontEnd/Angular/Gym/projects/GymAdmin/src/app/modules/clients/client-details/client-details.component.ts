import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientMeasures} from '../../../shared/models/clientMeasurements.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientMeasuresService} from '../../../core/data-services/client-measures/client-measures.service';
import {DetailsDeleteDialogComponent} from '../details-delete-dialog/details-delete-dialog.component';
import {DetailsEditDialogComponent} from '../details-edit-dialog/details-edit-dialog.component';

export interface ClientMeasureDialogData {
  measureId: number;
  measureData: ClientMeasures;
}

@Component({
  selector: 'gym-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  clientId: number;
  name: string;

  measureList: ClientMeasures[];
  displayedColumns: string[] = ['id', 'dateAdded', 'weight', 'bicep', 'shoulders',
     'actions'];

  dataSource = new MatTableDataSource<ClientMeasures>(this.measureList);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private readonly measureService: ClientMeasuresService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['clientName'];
      this.getClientMeasuresList();
    });
    this.dataSource.paginator = this.paginator;
  }

  private deleteMeasure(clientId): void {
    const dialogRef = this.dialog.open(DetailsDeleteDialogComponent, {
      width: '250px',
      data: { clientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientMeasuresList();
    });
  }

  private getClientMeasuresList(): void {
    this.measureService.getClientMeasures().subscribe(
      (result: ClientMeasures[]) => {
        this.measureList = result;
        this.dataSource.data = this.measureList;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editClientMeasure(measureId: number): void {
    const measuretQ = this.measureList.filter(function (us) {
      return us.id === measureId;
    });
    const dialogRef = this.dialog.open(DetailsEditDialogComponent, {
      width: '400px',
      data: { measureId: measureId, measureData: measuretQ[0] }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientMeasuresList();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DetailsEditDialogComponent, {
      width: '400px',
      data: { measureId: -1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientMeasuresList();
    });
  }
}
