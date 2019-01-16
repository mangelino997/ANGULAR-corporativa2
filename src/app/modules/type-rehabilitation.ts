import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos
export class TypeRehabilitation {
    //Define un formulario
    public form: FormGroup;
    //Constructor
    constructor() {
        //Crea el formulario con los campos correspondientes
        this.form = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            name: new FormControl()
        })
    }
}