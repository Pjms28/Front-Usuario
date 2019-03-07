import { Component, OnInit } from '@angular/core';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UbicacionService } from '../shared/ubicacion.service';
import {Router} from "@angular/router";
import { UbicacionModel } from '../shared/Ubicacion.model';
@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {
  data: UbicacionModel[] =[];
  formData : ProyectoComponent;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private ubicacionService: UbicacionService) { }

  ngOnInit() {
    this.resetForm();
    return this.ubicacionService.getLocantions()
      .subscribe(res => {
      this.data = res;
      console.log(this.data);
    
    }, err => {
      console.log(err);
     
    });
  }

  onSubmit(form : NgForm) {
    console.log(form.value);
    this.apiService.addProject(form.value).subscribe(res =>{
      this.resetForm(form)
    });
  }
 

  resetForm(form? : NgForm){
    if(form != null)
      form.resetForm();
    this.apiService.formData = {
    ProyectoID : null,
    NombreProyecto: '',
    FechaTerminacion: null,
    Direccion:'',
    ImgURL:'',
    UbicacionID: null
    }
  }
  

   

    
  }

