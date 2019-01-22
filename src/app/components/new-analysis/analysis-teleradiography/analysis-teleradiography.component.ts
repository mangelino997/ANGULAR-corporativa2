import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-analysis-teleradiography',
  templateUrl: './analysis-teleradiography.component.html',
  styleUrls: ['./analysis-teleradiography.component.scss']
})
export class AnalysisTeleradiographyComponent implements OnInit {
  //Define el formulario
  public atForm:FormGroup;
  //Constructor
  constructor() { }
  //Al inicializarse el componente
  ngOnInit() {
    //Establece el formulario
    this.atForm = new FormGroup({});
  }

}
