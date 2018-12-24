import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  user: User;
  disable: boolean;
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
   }

  ngOnInit() {
  this.disable = true;
  }

  getUser(cpf: string){
    cpf = this.searchForm.controls['searchControl'].value;

    if(!cpf){
      this.disable = true;
      return;
    }

    this.userService.getByCpf(cpf)
    .subscribe( 
      (user) => { 
        this.user = user;
        this.disable = false
     }, 
      (error) => console.log(error));
  }
}
