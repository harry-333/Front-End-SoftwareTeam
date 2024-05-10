import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda } from 'app/models/Agenda';
import { AgendaService } from 'app/services/agenda.service';
import { AuthService } from 'app/services/auth.service';
import { PropiedadesModalComponent } from './propiedadesmodal/propiedadesmodal.component';
import { UsuariosModalComponent } from './usuariosmodal/usuariosmodal.component';

@Component({
  selector: 'app-editar-agenda',
  templateUrl: './editar-agenda.component.html',
  styleUrls: ['./editar-agenda.component.scss']
})
export class EditarAgendaComponent implements OnInit {
  id = '';
  actualizando: boolean = false;
  agenda: Agenda = new Agenda();

  usuarioId: number | null;

  constructor(
    private agendaService: AgendaService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.authService.getUsuarioId();
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.actualizando = true;
        this.agendaService.getAgenda(params.id).subscribe((data) => {
          if (data.length > 0) {
            this.agenda = data[0];
          }
        });
      }
    });
  }

  guardarAgenda() {
    if (this.agenda.id_agenda) {
      this.agendaService.updateAgenda(this.agenda).subscribe((data) => {
        this.router.navigate(['/agenda']);
      });
    } else {
      this.agenda.id_vendedor = this.usuarioId;
      this.agendaService.addAgenda(this.agenda).subscribe((data) => {
        this.router.navigate(['/agenda']);
      });
    }
  }

  openPropiedadesModal(): void {
    const dialogRef = this.dialog.open(PropiedadesModalComponent, {
      width: '800px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Lógica a ejecutar después de cerrar el modal
      if (result) {
        this.agenda.id_propiedad = result.id_propiedad;
      }
    });
  }
  
  openUsuariosModal(): void {
    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Lógica a ejecutar después de cerrar el modal
      if (result) {
        this.agenda.id_usuario = result.id;
      }
    });
  }
}
