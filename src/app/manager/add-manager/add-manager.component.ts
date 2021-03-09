import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartementService} from "../../service/departement.service";
import {ManagerService} from "../../service/manager.service";
import {Departement} from "../../models/Departement";
import {Adresse} from "../../models/Adresse";
import {Manager} from "../../models/Manager";

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss']
})
export class AddManagerComponent implements OnInit {
  managerForm: FormGroup;
  departements: Departement[];
  departement: Departement;

  constructor(private departementService: DepartementService,
              private  fb: FormBuilder, private managerService: ManagerService) { }

  ngOnInit(): void {
    this.departementService.getAllDepartement().subscribe(data=> {
      this.departements = data.body;
    })
    this.initForm();
  }
  initForm(): void{
    this.managerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
       email :['', Validators.required],
       password : ['', Validators.required],
       fonction : [''],
      entreprise: this.fb.group({
        id: '',
        version: '',
        nom: '',
        description:''

       }),
       adresse : this.fb.group({
         boitePostal: '',
         pays: '',
         ville: '',
         siteWeb: '',
         telephone: ''
       }),
        type: 'MANAGER'

    });
  }

  onSubmit() {
  console.log(this.managerForm.value);
    let formValue = this.managerForm.value;
    let manager: Manager = {
      nom : formValue.nom,
      prenom: formValue.prenom,
      email: formValue.email,
      password: formValue.password,
      entreprise: formValue.entreprise,
      adresse: formValue.adresse,

      type: 'MANAGER'
    };
    console.log('manager', manager);
    this.managerService.ajoutPersonne(manager).subscribe(result =>{
      console.log('Manager enregistrer dans la base', result.body);
    });
  }



}
