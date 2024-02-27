import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { ErrorAlert } from '../../../../../shared/errors/error-alert.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();
  users = this.userService.users;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private errorAlert: ErrorAlert
  ) {}

  ngOnInit() {
    this.userService
      .fetchData('user?created=1')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (users: any) => {
          this.users = users.data;
        },
        (error) => {
          this.errorAlert.showErrorAlert(error.error.error);
        }
      );

    this.userService.userDeletedSubject.subscribe((deletedUserId: any) => {
      this.users = this.users.filter((user) => user.id !== deletedUserId);
    });
  }

  onUpdateUser(index: number) {
    const userId = this.users[index].id;
    this.router.navigate(['../', userId, 'update'], {
      relativeTo: this.route,
    });
  }

  onViewUser(index: number) {
    console.log(this.route.url);

    const userId = this.users[index].id;
    this.router.navigate(['../', userId, 'view'], {
      relativeTo: this.route,
    });
  }

  onDeleteUser(index: number) {
    const userId = this.users[index].id;
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(userId);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
