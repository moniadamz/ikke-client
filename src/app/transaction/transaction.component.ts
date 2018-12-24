import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  sender: User;
  receiver: User;
  Form: FormGroup;

  constructor(private userService: UserService, public router: Router, public fb: FormBuilder) {
    this.Form = fb.group({
      senderCpf: ["", Validators.required],
      receiverCpf: ["", Validators.required],
      value: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  tranference(Form) {

    const senderCpf = this.Form.controls['senderCpf'].value;
    const receiverCpf = this.Form.controls['receiverCpf'].value;
    const value = this.Form.controls['value'].value;

    this.userService.getByCpf(senderCpf)
      .subscribe(
        res => {
          this.sender = res;
        },
        (error) => console.log(error));
        
    if (this.sender.balance >= value) {
      this.sender.balance -= value;

      this.userService.update(senderCpf, this.sender);

      this.userService.getByCpf(receiverCpf).subscribe(
        receiver => this.receiver = receiver
      )

      this.receiver.balance += value;
      this.userService.update(receiverCpf, this.receiver).subscribe(
        res => {
          this.router.navigate(['/']);
        });
    } else {
      alert('saldo insuficiente');
    }
  }

}
