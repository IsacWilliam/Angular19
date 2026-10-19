import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { BrasilapiService } from '../brasilapi.service';
import { Municipio, UF } from '../brasilapi.models';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    NgxMaskDirective,
    CommonModule
],
  providers: [ provideNgxMask() ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit{
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  ufs: UF[] = [];
  municipios: Municipio[] = [];

  constructor(
    private service: ClienteService,
    private brasilApiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => { 
      const params = query['params'];
      const id = params['id'];

      if(id) {
        let clienteEncontrado = this.service.buscarClientePorId(id);

        if(clienteEncontrado){
          this.atualizando = true;
          this.cliente = clienteEncontrado;
          if(this.cliente.uf){
            const event = { value: this.cliente.uf };
            this.carregarMunicipios(event as MatSelectChange);
          }
        }
      }
    });
    
    this.carregarUFs();
  }

  carregarUFs(){
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstados => this.ufs = listaEstados,
      error: erro => console.log("ocorreu um erro ao listar os estados: ", erro)
    });
  }

  carregarMunicipios(event: MatSelectChange){
    const ufSelecionada = event.value;
    this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listarMunicipios => this.municipios = listarMunicipios,
      error: erro => console.log("Ocorreu um erro ao listar os municipios: ", erro)
    })
  }

  salvar(){
    if(!this.atualizando){
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem("Salvo com sucesso!");
    }else{
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem("Atualizado com sucesso!");
    }
  }

  mostrarMensagem(mensagem: string){
    this.snack.open(mensagem, "OK");
  }
}
