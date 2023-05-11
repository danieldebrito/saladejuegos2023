import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public error = false;
  public mostrarPass = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(public authService: AuthService){}

  async onLogin(): Promise<void> {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      try {
        const user = await this.authService.SignIn(email, password);
      } catch (error) {
        console.log(error);
      }
    }
  }

  public AutoSignIn(){
    this.loginForm.setValue( { email: 'danieldebrito@outlook.com', password: '123456' });
  }

  public errorFalse(): void {
    this.error = false;
  }

  verOcultarPass() {
    this.mostrarPass = !this.mostrarPass;
  }

}
