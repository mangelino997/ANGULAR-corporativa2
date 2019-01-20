import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { AfImageGifService } from 'src/app/services/af-image-gif.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-analysis-photography',
  templateUrl: './analysis-photography.component.html',
  styleUrls: ['./analysis-photography.component.scss']
})
export class AnalysisPhotographyComponent implements OnInit {
  //Define el formulario
  public apForm:FormGroup;
  //Define el elemento canvas html
  public canvasEl: HTMLCanvasElement;
  //Define el ancho del canvas
  @Input() public width = 300;
  //Define la altura del canvas
  @Input() public height = 300;
  //Define el elemento canvas
  @ViewChild('canvas') public canvas: ElementRef;
  //Define cx
  private cx: CanvasRenderingContext2D;
  //Difine la lista de puntos que se van marcando
  private points: Array<any> = [];
  //Define un contador que se incrementara en 1
  public count: number = 0;
  //Define una lista que determina las lineas a marcar segun el analisis que se procesa
  public lines: Array<any> = [];
  //Define la cantidad de puntos segun el analisis que se procesa
  public totalCount: number = 0;
  //Define la imagen gif indicativa
  public indicativeImage:any = {};
  //Constructor
  constructor(private appService: AppService, private afImageGifService: AfImageGifService) { }
  //Al inicializarse el componente
  ngOnInit() {
    //Incializa la imagen gif indicativa
    this.indicativeImage = {
      image: null,
      pointName: null,
      pointDescription: null
    }
    //Establece el formulario
    this.apForm = new FormGroup({});
    //Establece el gif por defecto
    this.afImageGifService.getByPositionAndSex(1, 1).subscribe(res => {
      let data = res.json();
      this.indicativeImage.image = this.appService.getUrlBase() + '/afImageGif/getImageByPositionAndSex/' + data.position + '/' + data.sex.id;
      this.indicativeImage.pointName = data.pointName;
      this.indicativeImage.pointDescription = data.pointDescription;
    });
    //Define los puntos y colores para el analisis fotografico
    this.lines = [{ x: 0, y: 1, stretch: true }, { x: 2, y: 3, stretch: true }, { x: 4, y: 5, stretch: false }, 
      { x: 4, y: 6, stretch: false }, { x: 4, y: 7, stretch: false }];
    this.points = [{cantidad: 2, color: '#FF001D'}, {cantidad: 4, color: '#FEFE47'}, 
      {cantidad: 5, color: '#007F21'}, {cantidad: 6, color: '#007F21'}, {cantidad: 8, color: '#A7D7E4'}]
    this.totalCount = 5;
  }
  // Carga imagenes en los Canvas
  public initCanvas(img) {
    var image = new Image();
    this.canvasEl= this.canvas.nativeElement;
    image.src = img;   
    image.onload = () => {
      this.cx.drawImage(image, 0, 0, this.width, this.height);
    }
    this.cx = this.canvasEl.getContext('2d');
    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;
    this.cx.lineWidth = 1;
    this.cx.lineCap = 'square';
    this.captureEvents(this.canvasEl, this.cx);
  }
  //Captura el evento cuando el usuario hace click en el canvas de Analisis Fotografico
  private captureEvents(canvasEl: HTMLCanvasElement, cx) {
    fromEvent(canvasEl, 'click')
      .subscribe(res => {
        let r = <MouseEvent>res;
        const rect = canvasEl.getBoundingClientRect();
        let point = { x: null, y: null, color: null };
        let x = r.clientX - rect.left;
        let y = r.clientY - rect.top;
        let color = this.points[this.count].color
        point.x = x;
        point.y = y;
        point.color = color;
        //Controla si permite marcar mas puntos, segun si se hizo click en el boton "listo"
        if (this.points.length < this.points[this.count].cantidad) {
          this.points.push(point)
          this.drawOnCanvas(x, y, color, cx);
          console.log("entra");
        } else {
          console.log("Debe presionar Listo para marcar mas puntos");
        }
      });
  }
  //Dibuja un punto en el canvas
  private drawOnCanvas(x: number, y: number, color: string, cx) {
    if (!cx) { return; }
    //Define el color
    cx.fillStyle = color;
    //Inicializa el marcado en Canvas
    cx.beginPath();
    //Dibuja el punto marcado
    cx.arc(x, y, 3, 0, Math.PI * 2, true);
    //Rellena con el color definido el punto marcado
    cx.fill();
  }
  //Captura el evento click en el boton Listo y permite continuar con el marcado de puntos
  public nextPoints() {
    //Aumenta en 1 el contador
    this.count++;
    //Borra los trazos y el fondo
    var image = new Image();
    this.canvasEl= this.canvas.nativeElement;
    image.src = 'assets/mujer_real.jpg';
    this.cx.clearRect(0, 0, this.width, this.height);
    //Carga el fondo
    this.cx.drawImage(image, 0, 0, this.width, this.height);
    //Verifica si ya se marcaron todos los puntos
    if (this.count == this.totalCount) {
      //Dibuja las lineas a partir de los puntos marcados por el usuario
      this.drawPointsWithLines();
    }
  }
  //Limpia el canva completo
  public clearCanva() {
    //Borra los trazos y el fondo
    this.cx.clearRect(0, 0, this.width, this.height);
    var image = new Image();
    image.src = 'assets/mujer_real.jpg'
    //Carga el fondo
    this.cx.drawImage(image, 0, 0, this.width, this.height);
    this.points.splice(0, this.points.length);
    this.count=0;
    // this.stepChange(this.selectedIndex);
  }
  //Traza las lineas con sus colores correspondientes a partir de los puntos marcados
  public drawPointsWithLines() {
    for (let i = 0; i < this.lines.length; i++) {
      //Obtiene el indice de los puntos a unir
      let x = this.lines[i].x;
      let y = this.lines[i].y;
      let stretch = this.lines[i].stretch;
      this.cx.beginPath();
      //Dibuja y pinta el punto
      this.fillPoint(this.points[x]);
      //Verifica si en el plano correspondiente se debe estirar la linea
      if (stretch) {
        //Calcula la pendiente de la recta
        let a = (this.points[y].y - this.points[x].y) / (this.points[y].x - this.points[x].x);
        //Calcula la ordenada al origen del punto 1
        let b = this.points[x].y - a * this.points[x].x;
        //Calcular la ordenada al origen del punto 2
        let b2 = this.points[y].y - a * this.points[y].x;
        //Calcula los nuevos puntos para prolongar la recta
        let x1 = this.points[x].x - 80;
        let y1 = a * x1 + b;
        let x2 = this.points[y].x + 80;
        let y2 = a * x2 + b2;
        //Dibuja la linea a partir de los nuevos puntos
        this.cx.moveTo(x1, y1);
        this.cx.lineTo(x2, y2);
      } else {
        //Dibuja la linea de los puntos marcados por el usuario
        this.cx.moveTo(this.points[x].x, this.points[x].y);
        this.cx.lineTo(this.points[y].x, this.points[y].y);
      }
      this.fillPoint(this.points[y]);
      this.cx.stroke();
      this.cx.closePath();
      //Muestra los trazos en formato de imagen 
      // this.saveCanvas();
    }
  }
  //Dibuja y pinta el punto enviado como parametro
  public fillPoint(p) {
    let color = p.color;
    this.cx.fillStyle = color;
    this.cx.strokeStyle = color;
    //Dibuja los puntos redondos
    this.cx.arc(p.x, p.y, 3, 0, Math.PI * 2, true);
    //Pinta los puntos, los rellena con color
    this.cx.fill();
    this.cx.closePath();
  }
}
