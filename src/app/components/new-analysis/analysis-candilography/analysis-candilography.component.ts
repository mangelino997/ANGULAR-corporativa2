import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { AtImageGifService } from 'src/app/services/at-image-gif.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-analysis-candilography',
  templateUrl: './analysis-candilography.component.html',
  styleUrls: ['./analysis-candilography.component.scss']
})
export class AnalysisCandilographyComponent implements OnInit {
  //Define el evento que emite datos al componente padre
  @Output() dataEvent = new EventEmitter<any>();
  //Define un evento escuchador de redimension de pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.clearCanva();
  }
  //Define el formulario Analisis de la Ortopantomografia
  public acForm: FormGroup;
  //Define el elemento canvas html
  public canvasEl: HTMLCanvasElement;
  //Define el elemento canvas que se muestra al finalizar los puntos
  public canvaElStart: HTMLCanvasElement;
  //Define el ancho del canvas
  @Input() public width = 650;
  //Define la altura del canvas
  @Input() public height = 380;
  //Define el elemento canvas
  @ViewChild('canvasAC') public canvas: ElementRef;
  //Define cx
  public cx: CanvasRenderingContext2D;
  //Difine la lista de puntos que se van marcando
  public pointsGlobal: Array<any> = [];
  //Difine la lista de puntos que se van marcando
  public points: Array<any> = [];
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
  //Define un booleano para controlar la visualizacion de boton Listo
  public flag: boolean = false;
  //Define la imagen final con los trazos
  public imageFinalLines: any;
  //Constructor
  constructor(private appService: AppService, private atImageGifService: AtImageGifService) {}
  //Al inicializarse el componente
  //Al inicializarse el componente
  ngOnInit() {
    //Incializa la imagen gif indicativa
    this.indicativeImage = {
      image: null,
      pointName: null,
      pointDescription: null
    }
    //Establece el formulario Analisis de la Condilografia
    this.acForm = new FormGroup({});
    //Establece el gif por defecto
    this.nextGif();
    //Define los puntos y colores para el analisis fotografico
    this.lines = [
      { x: 0, y: 0, stretch: false }, { x: 1, y: 1, stretch: false }, { x: 2, y: 2, stretch: false }, { x: 3, y: 3, stretch: false },
      { x: 4, y: 8, stretch: false }, { x: 5, y: 9, stretch: false }, { x: 6, y: 10, stretch: false }, { x: 7, y: 11, stretch: false },
      { x: 12, y: 16, stretch: false }, { x: 13, y: 17, stretch: false }, { x: 14, y: 18, stretch: false }, { x: 15, y: 19, stretch: false }];
    this.pointsGlobal = [{ cantidad: 4, color: '#C20017', colorLine: '#ECEC1C' }, { cantidad: 8, color: '#6E3B8B', colorLine: '#ECEC1C' },
    { cantidad: 12, color: '#6EA63B', colorLine: '#ECEC1C' }, { cantidad: 16, color: '#0397D5', colorLine: '#ECEC1C' }, { cantidad: 20, color: '#FBEB03', colorLine: '#ECEC1C' }]
    this.totalCount = 5;
  }
  //Establece el gif correspondiente
  private nextGif(): void {
    this.atImageGifService.getByPosition(this.count + 1).subscribe(res => {
      let data = res.json();
      this.indicativeImage.image = this.appService.getUrlBase() + '/acImageGif/getImageByPosition/' + data.position;
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
        let point = { x: null, y: null, color: null, colorLine: null };
        let x = r.clientX - rect.left;
        let y = r.clientY - rect.top;
        let color = this.pointsGlobal[this.count].color;
        let colorLine = this.pointsGlobal[this.count].colorLine;
        point.x = x;
        point.y = y;
        point.color = color;
        point.colorLine = colorLine;
        //Controla si permite marcar mas puntos, segun si se hizo click en el boton "listo"
        if (this.points.length < this.pointsGlobal[this.count].cantidad) {
          this.points.push(point);
          this.drawOnCanvas(x, y, color);
          if (this.points.length == this.pointsGlobal[this.count].cantidad) {
            this.flag = true;
          }
        }
        else if (this.pointsGlobal.length == this.points[this.count].cantidad) {
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
    if (this.flag == true) {
      this.flag = false;
      //Aumenta en 1 el contador
      this.count++;
      this.clearCanva();
      //Verifica si ya se marcaron todos los puntos
      if (this.count == this.totalCount) {
        let canvas = document.getElementById('idCanvasAC');
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        //Muestra la imagen indicativa por defecto
        this.indicativeImage.image = this.indicativeImageSex;
        this.indicativeImage.pointName = null;
        this.indicativeImage.pointDescription = null;
        //Muestra la imagen final con puntos y lineas
        document.getElementById('idFinalCardAC').classList.remove("display-none");
        document.getElementById('idInitCardAC').classList.add("display-none");
        //Dibuja las lineas a partir de los puntos marcados por el usuario
        this.drawPointsWithLines();
      } else {
        this.nextGif();
      }
    } else {
      console.log("Debe marcar todos los puntos solicitados");
    }
  }
  //Reestablece el canvas y los gifs
  public resetCanvas(): void {
    this.clearCanva();
    this.points.splice(0, this.points.length);
    this.count = 0;
    this.nextGif();
  }
  //Reestablece todos los puntos y lineas
  public resetAll(): void {
    //Muestra el gifs y el canvas para marcado nuevamente de puntos
    document.getElementById('idFinalCardAC').classList.add("display-none");
    document.getElementById('idInitCardAC').classList.remove("display-none");
    this.points.splice(0, this.points.length);
    this.count = 0;
    this.cx.canvas.width = this.width;
    this.cx.canvas.height = this.height;
    var image = new Image();
    image.src = this.imageReal;
    this.cx.drawImage(image, 0, 0, this.width, this.height);
    this.nextGif();
    this.resetCanvas();
  }
  //Limpia el canva completo
  public clearCanva() {
    let canvas = document.getElementById('idCanvasAC');
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    this.cx.canvas.width = width;
    this.cx.canvas.height = height;
    var image = new Image();
    image.src = this.imageReal;
    this.cx.drawImage(image, 0, 0, width, height);
  }
  //Traza las lineas con sus colores correspondientes a partir de los puntos marcados
  public drawPointsWithLines() {
    for (let i = 0; i < this.lines.length; i++) {
      //Obtiene el indice de los puntos a unir
      let x = this.lines[i].x;
      let y = this.lines[i].y;
      let stretch = this.lines[i].stretch;
      this.cx.beginPath();
      this.fillLines(this.points[x]);
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
        if (i == 4 || i == 5 || i == 6 || i == 7) { //solo marca 4 perpendiculares
          //dibujamos primero el trazo y luego llamamos a la funcion que trazara su perpendicular 
          this.cx.moveTo(this.points[x].x, this.points[x].y);
          this.cx.lineTo(this.points[y].x, this.points[y].y);
          var index = i - 4; //posicion del punto inicial desde donde se comienza a trazar la perpendicular
          this.perpendicularLine(this.points[x].x, this.points[x].y, this.points[y].x, this.points[y].y, index);
        } else {
          //Dibuja la linea de los puntos marcados por el usuario
          this.cx.moveTo(this.points[x].x, this.points[x].y);
          this.cx.lineTo(this.points[y].x, this.points[y].y);
        }
      }
      this.fillLines(this.points[y]);
      this.cx.stroke();
    }
    this.fillPoint();
    this.setImageFromCanvas();
    this.clearCanva();
  }
  //Dibuja y pinta los puntos
  public fillPoint() {
    for (let i = 0; i < this.points.length; i++) {
      this.cx.beginPath();
      this.cx.fillStyle = this.points[i].color;
      //Dibuja el punto (circulo)
      this.cx.arc(this.points[i].x, this.points[i].y, 3, 0, Math.PI * 2, true);
      this.cx.fill();
    }
  }
  //Dibuja y pinta los trazos
  public fillLines(p) {
    this.cx.strokeStyle = p.colorLine;
    this.cx.fillStyle = p.color;
    this.cx.closePath();
  }
  //Muestra los trazos del análisis en formato de imagen
  public setImageFromCanvas() {
    let canvas: HTMLCanvasElement;
    canvas = this.canvas.nativeElement;
    var dataURL = canvas.toDataURL();
    this.imageFinalLines = dataURL;
  }
  // Traza la perpendicular segun el Trazo A<-->B (x1, y1, x2, y2) y el punto inicial (index)
  public perpendicularLine(x1, y1, x2, y2, index) {
    //obtenemos el x,y del punto inical (punto rojo)
    var X = this.points[index].x;
    var Y = this.points[index].y
    //calculamos la distancia desde los puntos ya trazados
    var dx = (x2 - x1);
    var dy = (y2 - y1);
    //comienza la linea perpendicular desde el punto inicial rojo (index)
    this.cx.moveTo(X, Y);
    this.cx.lineTo(X + dy * 2, Y - dx * 2); //dy*2 duplica la linea del trazo para que sea mas larga
    this.cx.stroke();
  }
  //Envia el formulario a Nuevo Analisis luego a Resultados
  public sendDataAC(): void {
    this.dataEvent.emit(this.imageFinalLines);
  }
}