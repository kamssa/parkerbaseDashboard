import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Manager} from "../../models/Manager";
import {Departement} from "../../models/Departement";
import {ManagerService} from "../../service/manager.service";
import {MatDialog} from "@angular/material/dialog";
import {AddManagerComponent} from "../add-manager/add-manager.component";

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit {

  displayedColumns: string[] = ['entreprise', 'representant', 'telephone', 'suspendre', 'update', 'delete'];
  dataSource: MatTableDataSource<Manager>;
  managers: Manager[];
  manager: Manager;
  receptacle: any = [];
  departement: Departement;

  constructor(private managerServive: ManagerService,
              public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.managerServive.getAllManager().subscribe(data => {
      this.managers = data.body;
      console.log('managers', this.managers);
      this.managers.forEach(value => {
        let opp : Manager = value;

        this.receptacle.push(opp);
      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Manager>(this.receptacle);
    });
  }

  removeColumn() {

  }

  shuffle() {
    console.log('');
  }

  applyFilter($event: KeyboardEvent) {

  }

  redirectToUpdate(id: any) {

  }
  redirectToDelete(id: any) {

  }
  redirectToFormation(id: number) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddManagerComponent, {
      width: '650px',
      data: this.departement
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.departement = result;
    });
  }
}
