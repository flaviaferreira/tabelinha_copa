import { ListPage } from "./../list/list";
import { Component } from "@angular/core";
import { NavController, ToastController, Toast } from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public rodada1;
  private toastInstance: Toast;

  constructor(
    public navCtrl: NavController,
    public afDB: AngularFireDatabase,
    private toastCtrl: ToastController
  ) {}

  showToastr(message) {
    this.toastInstance = this.toastCtrl.create({
      message: message,
      position: "bottom",
      cssClass: "error",
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    this.toastInstance.present();
  }

  goToList(tab, titulo) {
    this.navCtrl.push(ListPage, { tab: tab, titulo: titulo });
  }
}
