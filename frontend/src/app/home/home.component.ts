import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/users.types';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  users$: Observable<User[]> | undefined;
  searchForm!: FormGroup;
  constructor(private userService: UserService, private router: Router, private matDialog: MatDialog, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.searchForm = new FormGroup({
      query: new FormControl('')
    });
  }

  createUser(): void{
    this.router.navigate(['/create-user']);
  }

  deleteUser(user: User): void{
    console.log(user);
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event === 'yes'){
        this.userService.deleteUser(user._id!).subscribe(() => {
          this.snack.open('User deleted successfully', undefined, {duration: 2000});
          this.users$ = this.userService.getUsers();
        }, err => {
          this.snack.open('Something went wrong', undefined, {duration: 2000});
        })
      }
    })
  }

  editUser(user: User): void{
    this.router.navigate([`/edit-user/${user._id}`]);
  }


  searchUser(): void{
    const query = this.searchForm.get('query')?.value;
    if(query !== ''){
      this.users$ = this.userService.searchUser(query);
    }else{
      this.users$ = this.userService.getUsers();
    }
  }
}
