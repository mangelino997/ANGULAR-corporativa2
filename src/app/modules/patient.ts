import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
//Define la entidad de la base de datos
@Injectable()
export class Patient {
    //Define un formulario
    public form: FormGroup;
    //Constructor
    constructor() {
        //Crea el formulario con los campos correspondientes
        this.form = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            name: new FormControl(),
            documentNumber: new FormControl('', Validators.required),
            age: new FormControl('', Validators.required),
            birthdate: new FormControl('', Validators.required),
            placeBirth: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            city: new FormControl(),
            state: new FormControl(),
            country: new FormControl(),
            email: new FormControl('', Validators.required),
            isActive: new FormControl(),
            startDate: new FormControl(),
            sex: new FormControl(),
            image: new FormControl(),
            user: new FormControl(),
            male: new FormControl(),
            female: new FormControl()
        })
    }
}