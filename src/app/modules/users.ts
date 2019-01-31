import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
//Define la entidad de la base de datos
@Injectable()
export class Users {
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
            enrollment: new FormControl('', Validators.required),
            birthdate: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            rol: new FormControl(),
            registrationDate: new FormControl(),
            lowDate: new FormControl(),
            userImage: new FormControl(),
            isActive: new FormControl(),
            isOnline: new FormControl()
        })
    }
}