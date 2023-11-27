import { Component } from '@angular/core';
import { Hit, User } from '../shared/users.types';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  users: User[] = [];
  searchForm!: FormGroup;
  count = 0;
  pageSize = 10;
  page = 0;
  query = '';
  constructor(private userService: UserService, private router: Router, private matDialog: MatDialog, private snack: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl('')
    });
    this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 0;
      this.pageSize = params['pageSize'] || 10;
      this.query = params['query'] || '';
      this.searchForm.get('query')?.setValue(this.query);
      if (this.query !== '') {
        this.searchUserbyQuery();
      } else {
        this.searchUserWithoutQuery()
      }
    });

  }

  createUser(): void {
    this.router.navigate(['/create-user']);
  }

  deleteUser(user: User): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'yes') {
        this.userService.deleteUser(user._id!).subscribe(() => {
          this.snack.open('User deleted successfully', undefined, { duration: 2000 });
          if(this.query !== ''){
            this.searchUserbyQuery();
          }else{
            this.searchUserWithoutQuery();
          }
        }, err => {
          this.snack.open('Something went wrong', undefined, { duration: 2000 });
        })
      }
    })
  }

  editUser(user: User): void {
    this.router.navigate([`/edit-user/${user._id}`]);
  }

  changePaging(event: any): void {
    this.page = event.pageIndex;
    this.query = this.searchForm.get('query')?.value;
    if (this.query !== '') {
      this.searchUserbyQuery();
    } else {
      this.searchUserWithoutQuery();
    }
  }

  searchUserbyQuery() {
    this.router.navigate([''], { queryParams: { page: this.page, pageSize: this.pageSize, query: this.query } });
    this.userService.searchUser(this.query, this.pageSize, this.page).subscribe((result: Hit) => {
      this.users = result.hits;
      this.count = result.total;
    });
  }

  searchUserWithoutQuery() {
    this.router.navigate([''], { queryParams: { page: this.page, pageSize: this.pageSize } });
    this.userService.getUsers().subscribe((result: Hit) => {
      this.users = result.hits;
      this.count = result.total;
    });
  }


  searchUser(): void {
    this.query = this.searchForm.get('query')?.value;
    if (this.query !== '') {
      this.searchUserbyQuery();
    } else {
      this.searchUserWithoutQuery();
    }
  }
}
