import { Component, OnInit } from "@angular/core";
import { OrdemCompraService } from "./../ordem-compra.service";
import { Pedido } from "./../shared/pedido.model";

@Component({
  selector: "app-ordem-compra",
  templateUrl: "./ordem-compra.component.html",
  styleUrls: ["./ordem-compra.component.css"],
  providers: [OrdemCompraService],
})
export class OrdemCompraComponent implements OnInit {
  public endereco: string = "";
  public numero: string = "";
  public complemento: string = "";
  public formaPagamento: string = "";

  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public formaPagamentoValido: boolean;

  public enderecoEstadoPrimitivo: boolean = true;
  public numeroEstadoPrimitivo: boolean = true;
  public complementoEstadoPrimitivo: boolean = true;
  public formaPagamentoEstadoPrimitivo: boolean = true;

  public formEstado: string = "disabled";

  public pedido: Pedido = new Pedido("", "", "", "");

  constructor(private ordemCompraService: OrdemCompraService) {}

  ngOnInit(): void {
    //this.ordemCompraService.efetivarCompra()
  }

  public atualizaEnderco(endereco: string): void {
    this.endereco = endereco;
    this.enderecoEstadoPrimitivo = false;

    if (this.endereco.length > 3) {
      this.enderecoValido = true;
    } else {
      this.enderecoValido = false;
    }

    this.habilitarForm();
  }

  public atualizaNumero(numero: string): void {
    this.numero = numero;
    this.numeroEstadoPrimitivo = false;

    if (this.numero.length > 0) {
      this.numeroValido = true;
    } else {
      this.numeroValido = false;
    }

    this.habilitarForm();
  }

  public atualizaComplmento(complemento: string): void {
    this.complemento = complemento;
    this.complementoEstadoPrimitivo = false;

    if (this.complemento.length > 0) {
      this.complementoValido = true;
    }

    this.habilitarForm();
  }

  public atualizaFormaPagamento(formaPagamento: string): void {
    this.formaPagamento = formaPagamento;
    this.formaPagamentoEstadoPrimitivo = false;

    if (this.formaPagamento.length > 0) {
      this.formaPagamentoValido = true;
    } else {
      this.formaPagamentoValido = false;
    }

    this.habilitarForm();
  }

  public habilitarForm(): void {
    if (
      this.enderecoValido === true &&
      this.numeroValido === true &&
      this.formaPagamentoValido === true
    ) {
      this.formEstado = "";
    }
  }

  confirmarCompra(): void {
    this.pedido.endereco = this.endereco;
    this.pedido.numero = this.numero;
    this.pedido.complemento = this.complemento;
    this.pedido.formaPagamento = this.formaPagamento;
    this.ordemCompraService.efetivarCompra(this.pedido).subscribe();
  }
}
