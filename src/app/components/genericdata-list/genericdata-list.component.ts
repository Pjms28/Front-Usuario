import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GenericData } from 'src/app/modelos/GenericData.model';
import { GenericDataService } from 'src/app/services/generic-data.service';
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DatoGenericoComponent } from '../dato-generico/dato-generico.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-genericdata',
  templateUrl: './genericdata-list.component.html',
  styleUrls: ['./genericdata-list.component.css']
})
export class GenericdatalistComponent implements OnInit {
  dialogRef: any;
  [x: string]: any;
  datos: GenericData[];
  dataTable: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','key','value','descripcion','actions'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  searchKey:string;

  constructor(private authSerice:AuthService, private genericDataService:GenericDataService,private chRef: ChangeDetectorRef, private matDialog:MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    
    this.dialogRef = this.matDialog.open(DatoGenericoComponent);
      this.dialogRef.afterClosed().subscribe((result) => {
        this.loadData();

      });
  }
  

  loadData(){
    this.genericDataService.getAllGenericData().subscribe(res =>{
      this.datos = res;

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


    }, err =>{
      console.log(err);
    });
  }
  onEdit(row){
    this.populateForm(row);
  }


  onDelete(id){
    this.genericDataService.deleteGenericData(id).subscribe(res => {
      console.log('res :', res);
     this.loadData();
    });
  }
  populateForm(data){
    this.genericDataService.pupulateForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    this.dialogRef = this.matDialog.open(DatoGenericoComponent);
      this.dialogRef.afterClosed().subscribe((result) => {
        this.loadData();

      });
  }

  canDelete(){
    let user =  this.authSerice.getCurrentUser();
  
    console.log(user);
    
    return user['roleId'] == '1' ? true: false;
  }
}
