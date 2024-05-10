import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  correoEnviado: string = ''; // Variable para almacenar el correo enviado

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.correoEnviado = this.route.snapshot.queryParams.correo;
  }

}
