import { Component, OnInit, Input, ElementRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { AfImageGifService } from 'src/app/services/af-image-gif.service';
import { AppService } from 'src/app/services/app.service';
import { IndicativeImageService } from 'src/app/services/indicative-image.service';

@Component({
  selector: 'app-analysis-photography',
  templateUrl: './analysis-photography.component.html',
  styleUrls: ['./analysis-photography.component.scss']
})
export class AnalysisPhotographyComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<any>();
  //Define un evento escuchador de redimension de pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.clearCanva();
  }
  //Define el formulario Analisis de la fotografia
  public apForm: FormGroup;
  //Define el elemento canvas html
  public canvasEl: HTMLCanvasElement;
  //Define el elemento canvas que se muestra al finalizar los puntos
  public canvaElStart: HTMLCanvasElement;
  //Define si ejecuta el metodo nextPoints
  public passNextPoints: boolean = false;
  //Define el ancho del canvas
  @Input() public width = 300;
  //Define la altura del canvas
  @Input() public height = 300;
  //Define el elemento canvas
  @ViewChild('canvas') public canvas: ElementRef;
  //Define el elemento canvas que se muestra al mostrar los resultados
  @ViewChild('canvaStart') public canvaStart: ElementRef;
  //Define cx
  private cx: CanvasRenderingContext2D;
  //Define cx
  private cx2: CanvasRenderingContext2D;
  //Difine la lista de puntos que se van marcando
  private pointsGlobal: Array<any> = [];
  //Difine la lista de puntos que se van marcando
  private points: Array<any> = [];
  //Define un contador que se incrementara en 1
  public count: number = 0;
  //Define una lista que determina las lineas a marcar segun el analisis que se procesa
  public lines: Array<any> = [];
  //Define la cantidad de puntos segun el analisis que se procesa
  public totalCount: number = 0;
  //Define la imagen gif indicativa
  public indicativeImage: any = {};
  //Define la imagen real del paciente
  public imageReal: any;
  //Define la imagen indicative segun el sexo elegido
  public indicativeImageSex: any;
  // Define un booleano para controlar la visualizacion de boton Listo
  public bandera: boolean= false;
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
    //Establece el formulario Analisis de la Fotografia
    this.apForm = new FormGroup({
      imageAP: new FormControl()
    });
    //Establece el gif por defecto
    this.nextGif();
    //Define los puntos y colores para el analisis fotografico
    this.lines = [{ x: 0, y: 1, stretch: true }, { x: 2, y: 3, stretch: true }, { x: 4, y: 5, stretch: false }, 
      { x: 4, y: 6, stretch: false }, { x: 4, y: 7, stretch: false }];
    this.pointsGlobal = [{cantidad: 2, color: '#FF001D'}, {cantidad: 4, color: '#FEFE47'}, 
      {cantidad: 5, color: '#007F21'}, {cantidad: 6, color: '#007F21'}, {cantidad: 8, color: '#A7D7E4'}]
    this.totalCount = 5;
  }
  //Establece el gif correspondiente
  private nextGif(): void {
    this.afImageGifService.getByPositionAndSex(this.count+1, 1).subscribe(res => {
      let data = res.json();
      this.indicativeImage.image = this.appService.getUrlBase() + '/afImageGif/getImageByPositionAndSex/' + data.position + '/' + data.sex.id;
      this.indicativeImage.pointName = data.pointName;
      this.indicativeImage.pointDescription = data.pointDescription;
    });
  }
  //Establece la imagen indicativa
  public setIndicativeImage(indicativeImage): void {
    this.indicativeImageSex = indicativeImage;
  }
  //Inicializa el Canvas
  public initCanvas(img) {
    this.imageReal = img;
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    this.cx.lineWidth = 1;
    this.cx.lineCap = 'square';
    this.clearCanva();
    this.captureEvents(this.canvasEl);
  }
  //Captura el evento cuando el usuario hace click en el canvas de Analisis Fotografico
  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'click')
      .subscribe(res => {
        let r = <MouseEvent>res;
        const rect = canvasEl.getBoundingClientRect();
        let point = { x: null, y: null, color: null };
        let x = r.clientX - rect.left;
        let y = r.clientY - rect.top;
        let color = this.pointsGlobal[this.count].color
        point.x = x;
        point.y = y;
        point.color = color;
        //Controla si permite marcar mas puntos, segun si se hizo click en el boton "listo"
        if (this.points.length < this.pointsGlobal[this.count].cantidad) {
          this.points.push(point);
          this.drawOnCanvas(x, y, color);
          if (this.points.length == this.pointsGlobal[this.count].cantidad) {
            this.bandera = true;
          }
        }
        else if(this.pointsGlobal.length == this.points[this.count].cantidad){
          console.log("Debe presionar Listo para marcar mas puntos");
        }
        else {
          console.log("Debe marcar todos los puntos");
        }
      });
  }
  //Dibuja un punto en el canvas
  private drawOnCanvas(x: number, y: number, color: string) {
    if (!this.cx) { return; }
    //Define el color
    this.cx.fillStyle = color;
    //Inicializa el marcado en Canvas
    this.cx.beginPath();
    //Dibuja el punto marcado
    this.cx.arc(x, y, 3, 0, Math.PI * 2, true);
    //Rellena con el color definido el punto marcado
    this.cx.fill();
  }
  //Captura el evento click en el boton Listo y permite continuar con el marcado de puntos
  public nextPoints() {
    if (this.bandera == true) {
      this.bandera=false;
      //Aumenta en 1 el contador
      this.count++;
      this.clearCanva();
      //Vuelve a false para controlar en el siguiente grupo de puntos
      this.passNextPoints = false;
      //Verifica si ya se marcaron todos los puntos
      if (this.count == this.totalCount) {
        //Muestra la imagen indicativa por defecto
        this.indicativeImage.image = this.indicativeImageSex;
        this.indicativeImage.pointName = null;
        this.indicativeImage.pointDescription = null;
        //Muestra la imagen final con puntos y lineas
        let card = document.getElementById('idFinalImage');
        card.classList.remove("display-none");
        document.getElementById('imgStartPhoto').classList.add("display-none");
        this.canvaElStart = this.canvaStart.nativeElement;
        this.cx2 = this.canvaElStart.getContext('2d');
        var image = new Image();
        image.src = this.imageReal;
        this.cx2.drawImage(image, 0, 0, this.width, this.height);
        //Dibuja las lineas a partir de los puntos marcados por el usuario
        this.drawPointsWithLines();
      } else {
        this.nextGif();
      }
    } else {
      console.log("Debe marcar todos los puntos solicitados");
    }
  }
  //Limpia el canva completo
  public clearCanva() {
    let canvas = document.getElementById('idCanvas');
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    this.cx.canvas.width = width;
    this.cx.canvas.height = height;
    var image = new Image();
    image.src = this.imageReal;
    this.cx.drawImage(image, 0, 0, width, height);
    //this.points.splice(this.points.length-1, this.points.length);
    //this.count = this.count - 1;
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
      this.fillLines(this.points[x]);
      console.log("pinta primer punto"+this.points[x]);

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
      this.fillLines(this.points[y]);
      this.cx.stroke();
      this.cx.closePath();
      //Muestra los trazos en formato de imagen 
    }
    this.fillPoint();
    this.saveCanvas();
    this.clearCanva();  }
  //Dibuja y pinta los puntos
  public fillPoint(){
    for(let i=0; i<this.points.length; i++){
      this.cx.beginPath();
      this.cx.fillStyle = this.points[i].color;
      //Dibuja el punto (circulo)
      this.cx.arc(this.points[i].x, this.points[i].y, 3, 0, Math.PI * 2, true);
      this.cx.fill();
    }
  }
  //Dibuja y pinta los trazos
  public fillLines(p) {
    this.cx.strokeStyle = p.color;
    this.cx.fillStyle = p.color;
    this.cx.closePath();
  }
  //Muestra los trazos del análisis en formato de imagen
  public saveCanvas() {
    let canvas: HTMLCanvasElement;
    canvas = this.canvas.nativeElement;
    (<HTMLElement>document.getElementById('canvasimgAP')).style.border = "1px solid";
    (<HTMLElement>document.getElementById('canvasimgAP')).style.width = "100%";
    (<HTMLElement>document.getElementById('canvasimgAP')).style.height = "auto";
    var dataURL = canvas.toDataURL();
    (<HTMLImageElement>document.getElementById('canvasimgAP')).src = dataURL;
    (<HTMLElement>document.getElementById('canvasimgAP')).style.display = "inline";
  }
  //Envia el formulario a Nuevo Analisis luego a Resultados
  public sendDataAP(): void {
    console.log("llama");
    let result= (<HTMLImageElement>document.getElementById('canvasimgAP')).src;
    this.apForm.get('imageAP').setValue(result);
    this.dataEvent.emit(this.apForm.get('imageAP').value);
  }
}