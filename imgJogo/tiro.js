function Tiro(context, nave, animacao){
	this.context = context;
	this.nave = nave;
	this.animacao = animacao;
	this.largura = 4;
	this.altura = 20;
	this.x = nave.x + nave.imagem.width / 2 - this.largura / 2;
	this.y = nave.y - this.altura;
	this.velocidade = 10;
	this.cor = 'orange';
}
Tiro.prototype = {
	atualizar: function(){
		this.y -= this.velocidade;
		if(this.y < -this.altura){
			this.animacao.excluirSprite(this);
			this.colisor.excluirSprite(this);
		}
	},
	desenhar: function (){
		var ctx = this.context;
		ctx.save();
		ctx.fillStyle = this.cor;
		ctx.fillRect(this.x, this.y, this.largura, this.altura);
		ctx.restore();
	},
	retangulosColisao: function(){
		return [ {x: this.x, y: this.y, largura: this.largura, altura: this.altura}];
	},
	colidiuCom: function(outro){
		
	}
	
}