import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { User } from '../interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  userDeletedSubject = new Subject();
  ID: any = this.authService.gettingId();
  users: any[] = [];
  baseUrl: string = 'https://dummyapi.io/data/v1/';
  headers = new HttpHeaders({
    'app-id': this.ID,
  });

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchData(endPoint: string) {
    const url = `${this.baseUrl}${endPoint}`;
    return this.http.get(url);
  }

  createUser(user: User) {
    const url = `${this.baseUrl}user/create`;
    return this.http.post(url, user);
  }

  updateUser(userId: string, formData: any) {
    const url = `${this.baseUrl}user/${userId}`;
    return this.http.put(url, formData);
  }

  deleteUser(userId: string) {
    const url = `${this.baseUrl}user/${userId}`;
    return this.http.delete(url).subscribe(() => {
      this.userDeletedSubject.next(userId);
    });
  }

  viewUser(userId: string) {
    const url = `${this.baseUrl}user/${userId}`;
    return this.http.get(url);
  }

  getUserById(id: string) {
    const url = `${this.baseUrl}user/${id}`;
    return this.http.get(url);
  }
}
