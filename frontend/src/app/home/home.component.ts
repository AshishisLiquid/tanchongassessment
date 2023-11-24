import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/users.types';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  users$: Observable<User[]> | undefined;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  createUser(): void{
    this.router.navigate(['/create-user']);
  }

  deleteUser(user: User): void{
    this.userService.deleteUser(user._id!).subscribe(() => {
      this.users$ = this.userService.getUsers();
    })
  }

  editUser(user: User): void{
    this.router.navigate([`/edit-user/${user._id}`]);
  }
}
