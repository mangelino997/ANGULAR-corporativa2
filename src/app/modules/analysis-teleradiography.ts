import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
//Define la entidad de la base de datos
@Injectable()
export class AnalysisTeleradiography {
    //Define un formulario
    public form: FormGroup;
    //Constructor
    constructor() {
        //Crea el formulario con los campos correspondientes
        this.form = new FormGroup({
            imageAT: new FormControl('', Validators.required)
        })
    }
}