import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenStorage : TokenStorageService
  ) {
    if(this.tokenStorage.getUser()) {
      this.router.navigate(['/'])
    }
    this.registerForm = this.createForm()
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      'email': ['', Validators.compose(
        [Validators.required, Validators.email])],
      'username': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'password': ['', Validators.compose(
        [Validators.required, Validators.minLength(6)])],
      'confirmPassword': ['', Validators.required]
    })
  }

  onSubmit() : void {
    this.authService
      .register({ ...this.registerForm.value })
      .subscribe({
        next : data => {
          this.notificationService.showSnackBar(data.message)
          this.router.navigate(['/'])
          window.location.reload()
        }
      })
  }
}
