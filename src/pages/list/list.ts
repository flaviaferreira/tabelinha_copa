import { Component } from "@angular/core";
import {
  NavController,
  ToastController,
  Toast,
  NavParams
} from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  public matches;
  public paramTab;
  public paramTitulo;
  private toastInstance: Toast;

  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public afDB: AngularFireDatabase,
    private toastCtrl: ToastController
  ) {
    this.paramTab = this.navParam.data.tab;
    this.paramTitulo = this.navParam.data.titulo;
    this.get1Rodada(this.paramTab).subscribe(
      data => {
        let selectedDate;
        const groupedObj = data.reduce((prev, cur) => {
          selectedDate = cur["data_hora"].split("T")[0];
          if (!prev[selectedDate]) {
            prev[selectedDate] = [cur];
          } else {
            prev[selectedDate].push(cur);
          }
          return prev;
        }, {});
        this.matches = Object.keys(groupedObj).map(key => ({
          key,
          value: groupedObj[key]
        }));
      },
      error => {
        this.showToastr(error);
      }
    );
  }

  get1Rodada(tab) {
    return this.afDB.list(tab).valueChanges();
  }

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
}
