import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from './patient';
import { Injectable } from '@angular/core';
//Define la entidad de la base de datos
@Injectable()
export class Analysis {
    //Define un formulario
    public form: FormGroup;
    //Constructor
    constructor(private patient: Patient) {
        //Crea el formulario con los campos correspondientes
        this.form = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            patient: patient.form,
            diagnostic: new FormControl('', Validators.required),
            typeRehabilitation: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            user: new FormControl(),
            conclusion: new FormControl(),
            prothesisCode: new FormControl(),
            date: new FormControl(),
            nameUser: new FormControl(),
            enrollmentUser: new FormControl()
        })
    }
}