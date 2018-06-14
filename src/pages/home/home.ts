import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { NavController, ToastController, Toast } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public rodada1;
  private toastInstance: Toast;

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase, private toastCtrl: ToastController) {
    this.get1Rodada().subscribe((data) => {
      let selectedDate;
      const groupedObj = data.reduce((prev, cur)=> {
        selectedDate = cur['data_hora'].split('T')[0];
        if(!prev[selectedDate]) {
          prev[selectedDate] = [cur];
        } else {
          prev[selectedDate].push(cur);
        }
        return prev;
      }, {});
      this.rodada1 = Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
      console.log(this.rodada1);
    }, error => {
      console.log("error ", error);
      this.showToastr(error);
    });
  }

  get1Rodada() {
    return this.afDB.list("1_RODADA").valueChanges();
  }

  showToastr(message) {
    this.toastInstance = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      cssClass: "error",
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    this.toastInstance.present();
  }

  goToList(param) {
    this.navCtrl.push(ListPage, {param: param});
  }
}
