import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import "../util/rxjs-extensions";

import { OfertasService } from "./../ofertas.service";
import { Oferta } from "./../shared/oferta.model";

@Component({
  selector: "app-topo",
  templateUrl: "./topo.component.html",
  styleUrls: ["./topo.component.css"],
  providers: [OfertasService],
})
export class TopoComponent implements OnInit {
  public ofertas: Observable<Oferta[]>;
  public ofertasArray: Oferta[];
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) {}

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((termo: string) => {
        if (termo.trim() === "") {
          return Observable.of<Oferta[]>([]);
        }

        return this.ofertasService.pesquisaOfertas(termo);
      })
      .catch((err: any) => {
        console.log(err);
        return Observable.of<Oferta[]>([]);
      });

    this.ofertas.subscribe((ofertas: Oferta[]) => {
      this.ofertasArray = ofertas;
    });
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca);
  }
}
