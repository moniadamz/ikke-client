import {Routes} from '@angular/router'
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { TransactionComponent } from './transaction/transaction.component';

export const ROUTES: Routes = [
    {path: 'cadastro', component: SignupComponent},
    {path: 'cartoes', component: CardsComponent},
    {path: 'transferencias', component: TransactionComponent},
    {path: '', component: HomeComponent}
]