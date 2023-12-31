import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  userForm!: FormGroup;
  constructor(private userService: UserService, private router: Router, private snack: MatSnackBar) { }
  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(0)]),
      contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  createUser(){
    if(this.userForm.invalid){
      return;
    }
    this.userService.createUser(this.userForm.value).subscribe((user) => {
      this.snack.open('User deleted successfully', 'OK', {duration: 2000});
      this.router.navigate(['/']);
    }, err => {
      this.snack.open('Something went wrong', undefined, {duration: 2000});
    });
  }
}
