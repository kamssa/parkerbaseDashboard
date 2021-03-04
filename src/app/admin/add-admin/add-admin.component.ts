import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Personne} from "../../models/Personne";
import {RegistryService} from "../../service/registry.service";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SuccessDialogComponent} from "../../service/shared/dialogs/success-dialog/success-dialog.component";

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  userForm: FormGroup;
  admin: Personne;
  adminId: number;
  private dialogConfig;

  constructor(public fb: FormBuilder,
              private  registryService: RegistryService,
              private location: Location,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initForm();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    };
  }

  initForm() {
    this.userForm = this.fb.group({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      fonction: new FormControl(''),
      adresse: this.fb.group({
        boitePostal: '',
        mail: '',
        pays: '',
        ville: '',
        siteWeb: '',
        telephone: ''
      })
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
  public createEmploye = (createEmployeFormValue) => {
    if (this.userForm.valid) {
      this.onSubmit(createEmployeFormValue);
    }
  }

  onSubmit(createEmployeFormValue): void {
    let  admin : Personne = {
      nom: createEmployeFormValue.nom,
      prenom: createEmployeFormValue.prenom,
      email: createEmployeFormValue.email,
      password: createEmployeFormValue.password,
      fonction: createEmployeFormValue.fonction,
      adresse: createEmployeFormValue.adresse,
      type:'ADMIN'
    };
    this.registryService.ajoutPersonne(admin).subscribe(data => {
      console.log(data.body);
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
      dialogRef.afterClosed()
        .subscribe(result => {
          // this.router.navigate(['finance']);
        });

    }, error => {
      this.location.back();
    });


  }

}
