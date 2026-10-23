import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector   : 'app-lugar',
  standalone : false,
  templateUrl: './lugar.component.html',
  styleUrl   : './lugar.component.scss'
})
export class LugarComponent implements OnInit{

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private categoriaSerivce: CategoriaService,
    private lugarService: LugarService
  ){
    this.camposForm = new FormGroup({
      nome       : new FormControl('', Validators.required),
      categoria  : new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto    : new FormControl('', Validators.required),
      avaliacao  : new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.categoriaSerivce.obterTodasCategorias().subscribe({
      next: (listaCategorias) => {
        console.log("Listando Categorias... ", listaCategorias);
        this.categorias = listaCategorias
      },
      error: erro => console.error("Erro ao obter a lista de categorias: ", erro)
    })
  }

  salvar(){
    this.camposForm.markAllAsTouched();
    
    if(this.camposForm.valid){
      this.lugarService.salvarLugar(this.camposForm.value).subscribe({
        next: (lugar) => {
          console.log("Cadastrado com sucesso!", lugar),
          this.camposForm.reset();
        },
        error: erro => console.error("Ocorreu o seguinte erro ao salvar o Lugar: ", erro)
      });
    }
  }

  isCampoInvalido(nomeCampo: string): boolean{
    const campo = this.camposForm.get(nomeCampo);
    return (campo?.invalid && campo?.touched && campo?.errors?.['required']) || false;
  }
}
