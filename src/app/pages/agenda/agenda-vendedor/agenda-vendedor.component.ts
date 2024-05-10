import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda } from 'app/models/Agenda';
import { AgendaService } from 'app/services/agenda.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-agenda-vendedor',
  templateUrl: './agenda-vendedor.component.html',
  styleUrls: ['./agenda-vendedor.component.scss']
})
export class AgendaVendedorComponent implements OnInit {

  agendas: Agenda[] = [];
  usuarioId: number | null;

  constructor(
    private agendaService: AgendaService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.authService.getUsuarioId();
    this.route.params.subscribe((params) => {
      if (this.usuarioId) {
        // Obtén las agendas asociadas a un usuario específico
        this.agendaService.getAgendas(this.usuarioId).subscribe((data) => {
          this.agendas = data;
        });
      }
    });
  }

}
