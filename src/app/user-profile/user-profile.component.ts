import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Employe} from "../models/Employe";
import {MatDialog} from "@angular/material/dialog";
import {SuccessDialogComponent} from "../service/shared/dialogs/success-dialog/success-dialog.component";
import {Location} from "@angular/common";
import {EmployeService} from "../service/employe.service";
import {RegistryService} from "../service/registry.service";
import {Admin} from "../models/Admin";
import {Personne} from "../models/Personne";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
