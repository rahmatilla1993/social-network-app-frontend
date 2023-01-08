import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm : FormGroup

  constructor(
    private authService : AuthService,
    private tokenService : TokenStorageService,
    private notificationService : NotificationService,
    private router : Router,
    private formBuilder : FormBuilder
  )
    {
      if(this.tokenService.getUser()) {
        this.router.navigate(['/'])
    }
    this.loginForm = this.createLoginForm()
  }

  ngOnInit(): void {
  }

  createLoginForm() : FormGroup {
    return this.formBuilder.group({
      'email' : ['',Validators.compose([
        Validators.required,
        Validators.email])
      ],
      'password' : ['',Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])]
    })
  }

  submit() : void {

    this.authService.login({ ...this.loginForm.value })
      .subscribe(data => {
        this.tokenService.saveToken(data.message)
        this.tokenService.saveUser(data)

        this.notificationService.showSnackBar('Login successful')
        this.router.navigate(['/main'])
        window.location.reload()
      })
  }
}
