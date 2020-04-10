import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OfertasService } from "./../ofertas.service";
import { Oferta } from "./../shared/oferta.model";
@Component({
  selector: "app-oferta",
  templateUrl: "./oferta.component.html",
  styleUrls: ["./oferta.component.css"],
  providers: [OfertasService],
})
export class OfertaComponent implements OnInit {
  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) {}

  ngOnInit(): void {
    this.ofertasService
      .getOfertaPorId(this.route.snapshot.params["id"])
      .then((oferta: Oferta) => {
        this.oferta = oferta;
      });

    /*
      this.route.params.subscribe(
        (parametro: any) => console.log(parametro), 
        (err: any ) => console.log(err),
        () => console.log('processamento concluído com sucesso');
      )
      let tempo = Observable.interval(2000)

      tempo.subscribe((intervalo: number) => {
        console.log(intervalo);
      })
      

    let observable = Observable.create((observer: Observer<number>) => {
      observer.next(1)
      observer.next(3)
      observer.complete()
      observer.next(3)
    })

    observable.subscribe(
      (resultado: number) => console.log(resultado + 10),
      (erro: string) => console.log(erro),
      () => console.log('Stream finalizada'),
    )*/
  }
}
