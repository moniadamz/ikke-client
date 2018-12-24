import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public Form: FormGroup;
  public user: User;

  constructor(private service: UserService, public router: Router, public fb: FormBuilder) {
    this.Form = fb.group({
      cpf: ["", Validators.required],
      name: ["", Validators.required],
      password: ["", Validators.required],
      balance: [0, Validators.nullValidator]
    });
  }

  ngOnInit() {
  }


  insertUser(Form) {

    this.user = {
      cpf: this.Form.controls['cpf'].value,
      name: this.Form.controls['name'].value,
      password: this.Form.controls['password'].value,
      balance: this.Form.controls['balance'].value
    };

    this.service.create(this.user)
      .subscribe(
        res => {
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        });
  }
}
