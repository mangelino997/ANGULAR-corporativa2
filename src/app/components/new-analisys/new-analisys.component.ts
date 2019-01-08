import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-analisys',
  templateUrl: './new-analisys.component.html',
  styleUrls: ['./new-analisys.component.scss']
})
export class NewAnalisysComponent implements OnInit {
  //Constructor
  constructor(private appComponent: AppComponent) { 
    
  }
  //Al inicializarse el componente
  ngOnInit() {
    
  }
}
