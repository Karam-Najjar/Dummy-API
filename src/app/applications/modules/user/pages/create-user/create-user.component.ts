import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomValidators } from '../../validations/custom-validators';
import { UsersService } from '../../services/users.service';
import { FullUser } from '../../interfaces/full-user.interface';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  formTitle: string = 'Create new user';
  userId!: any;
  createForm!: FormGroup;
  users = this.usersService.users;
  user: FullUser = {};
  isReadOnly: boolean = false;
  customValidator = CustomValidators;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];

    if (this.userId) {
      this.isReadOnly = true;
      this.formTitle = 'Update user';
      this.usersService
        .getUserById(this.userId)
        .subscribe((userData: FullUser) => {
          this.user = userData;
          this.createForm.patchValue(userData);
        });
    }
    this.createForm = this.fb.group({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      title: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
    });
  }

  onSubmit() {
    const formData = this.createForm.value;
    if (this.userId) {
      this.usersService.updateUser(this.userId, formData).subscribe((data) => {
        console.log('Response data', data);
      });
      console.log('update => ', formData);
    } else {
      this.usersService.createUser(formData).subscribe();
      console.log('create => ', formData);
    }
    this.router.navigate(['/users']);
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

  getValidationErrorMessage(controlName: string): string {
    const control = this.createForm.get(controlName);

    if (control?.hasError('required')) {
      return this.customValidator.required;
    }

    if (control?.hasError('minlength')) {
      return this.customValidator.minLength;
    }

    if (control?.hasError('maxlength')) {
      return this.customValidator.maxLength;
    }
    if (control?.hasError('email')) {
      return this.customValidator.email;
    }

    return '';
  }
}
