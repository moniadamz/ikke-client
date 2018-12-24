import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  public Form: FormGroup;
  public card: Card;

  constructor(private service: CardsService, public router: Router, public fb: FormBuilder) {
    this.Form = fb.group({
      cpf: ["", Validators.required],
      code: ["", Validators.required],
      expiration_date: ["", Validators.required],
      brand: ["", Validators.required],
      credit: [3000, Validators.nullValidator]
    });
  }

  ngOnInit() {
  }

  createCard() {
    this.card = {
      cpf: this.Form.controls['cpf'].value,
      code: this.Form.controls['code'].value,
      expiration_date: this.Form.controls['expiration_date'].value,
      brand: this.Form.controls['brand'].value,
      credit: this.Form.controls['credit'].value
    };

    this.service.create(this.card)
      .subscribe(
        res => {
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        });
  }
}
