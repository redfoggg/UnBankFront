import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel={
    N_Conta:'',
    Senha:''
  }

  constructor(private service:UserService, private router:Router, private toastr:ToastrService) { }

  ngOnInit() {
    //se o usuário já estiver logado
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }
  onSubmit(form:NgForm)
  {
    this.service.login(form.value).subscribe(
      (res:any)=>{
        //salva o token no localstorage do navegador
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
      },
      err => {
        if(err.status == 400)
        this.toastr.error('Número da conta incorreta ou senha incorreta');
        else
        console.log(err);
      }
    );
  }
}
