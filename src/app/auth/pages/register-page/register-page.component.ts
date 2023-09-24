import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public userForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>('')
  });

  constructor(private authService: AuthService,
    private router: Router,  private snackbar: MatSnackBar,) { }

    get currentUser(): User {
      const user = this.userForm.value as User;
      return user;
    }

    onSubmit(): void {
      this.authService.register(this.currentUser)
      .subscribe(user => {
        this.router.navigate(['/auth/login']);
        this.showSnackbar(`User created!`);
      })
    }

    showSnackbar( message: string ):void {
      this.snackbar.open( message, 'done', {
        duration: 2500,
      })
    }
}
