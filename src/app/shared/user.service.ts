import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  //url da parte da API que trata dos registros
  readonly UrlBase = 'http://localhost:5000/api';
  formModel = this.fb.group({
    Cpf : ['',[Validators.required,Validators.minLength(8)]],
    Nome : ['',Validators.required],
    Cep : ['',Validators.required],
    Passwords: this.fb.group({
      Senha : ['',[Validators.required,Validators.minLength(5)]],
      ConfirmSenha: ['',Validators.required],
    },{validator : this.comparePasswords}),
    Email : ['',Validators.required],
    PhoneNumber : ['']
  });
  //função para comparação das senhas
  comparePasswords(fb:FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmSenha');
    //as senhas não são iguais
    if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
      if(fb.get('Senha').value != confirmPasswordCtrl.value )
        confirmPasswordCtrl.setErrors({passwordMismatch: true});
      else
        confirmPasswordCtrl.setErrors({passwordMismatch: null});           
    }
  }
  //função para pegar os valores que são postados pelo formulário
  register(){
    var body = {
      Cpf : this.formModel.value.Cpf,
      Nome : this.formModel.value.Nome,
      Cep : this.formModel.value.Cep,
      Senha : this.formModel.value.Passwords.Senha,
      Email : this.formModel.value.Email,
      PhoneNumber : this.formModel.value.PhoneNumber
    };
    return this.http.post(this.UrlBase + '/ApplicationUser/Register', body)
  }

}
