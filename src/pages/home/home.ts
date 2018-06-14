import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public rodada1 = [];

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase) {
    this.get1Rodada().subscribe((data) => {
      this.rodada1 = data;
    }, error => {
      console.log("error ", error);
    });
  }

  get1Rodada() {
    return this.afDB.list("1_RODADA").valueChanges();
  }
}
