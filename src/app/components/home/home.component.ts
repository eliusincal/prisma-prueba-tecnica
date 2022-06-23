import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nombre: string          = '';
  email: string           = '';
  msgError: string        = '';
  load: string            = '';
  url_download_cv: string = '';
  msg: string             = '';
  successStatus: boolean  = false;
  errorStatus: boolean    = false;
  findCV: boolean         = false;
  selectedFile!: File;
  cvForm = new FormGroup({
    curriculum: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.viewProfile();
    this.verifyCV();
  }

  viewProfile() {
    try {
      this.authService.viewProfile().subscribe((res: any) => {
        console.log(res);
        if (res.estado) {
          this.nombre = res.nombre;
          this.email = res.email;
        }
      });
    } catch (error) {}
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  submitCV() {
    this.load = 'Subiendo archivo...';
    console.log((this.selectedFile.size / 1048576).toFixed(2));
    if (Number((this.selectedFile.size / 1048576).toFixed(2)) > 5) {
      this.load = '';
      this.errorStatus = true;
      this.msgError = 'Archivo mayor a 5 MB';
    } else {
      try {
        this.authService.uploadCV(this.selectedFile).subscribe((res: any) => {
          console.log(res);
          if (res.mensaje == 'Carga correctamente') {
            this.successStatus = true;
            this.msg = 'Carga de cv realizada correctamente';
            this.verifyCV();
          }
          this.load = '';
        });
      } catch (error) {
        this.load = '';
        console.log(error);
      }
    }
  }

  verifyCV(){
    try {
      this.authService.verifyCV().subscribe((res: any) => {
        console.log('Respuesta');
        console.log(res);
        if (res.url) {
          this.findCV = true;
          this.url_download_cv = res.url;
        }else{
          this.findCV = false;
        }
      });
    } catch (error) {}
  }
}
