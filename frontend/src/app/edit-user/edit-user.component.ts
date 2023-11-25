import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/users.types';
import { UserService } from '../shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  userForm!: FormGroup;
  id!: string;
  user!: User
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private snack: MatSnackBar) { }
  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(0)]),
      contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    });
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    this.userService.getUser(this.id).subscribe((user: User) => {
      this.user = user;
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        age: user.age,
        contact: user.contact
      })
    }, err => {
      alert('User Not Found, Redirecting to Home');
      this.router.navigate(['/']);
    });
  }

  updateUser() {
    if (this.userForm.invalid) {
      return;
    }
    this.userService.updateUser(this.userForm.value, this.id).subscribe((user: User) => {
      console.log('here');
      this.snack.open('User Updated Successfully', undefined, { duration: 2000 });
      this.router.navigate(['/']);
    }, err => {
      this.snack.open('Something went wrong', undefined, { duration: 2000 });
    })
  }
}
