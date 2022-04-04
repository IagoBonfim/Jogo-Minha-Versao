function Nave(context, teclado, imagem, imgExplosao){
	this.context = context;
	this.teclado = teclado;
	this.imagem = imagem;
	this.x = 0;
	this.y = 0;
	this.velocidade = 0;
	this.spritesheet = new Spritesheet(context, imagem, 3, 2);
	this.spritesheet.linha = 0;
	this.spritesheet.intervalo = 100;
	this.imgExplosao = imgExplosao;
	this.vidasExtra = 3;
}
Nave.prototype ={
	atualizar: function(){
		let incremento = this.velocidade * this.animacao.decorrido / 1000;
		if(this.teclado.pressionada(SETA_ESQUERDA) && this.x >0)
			this.x -= incremento;
		if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 36)
			this.x += incremento;
		if (this.teclado.pressionada(SETA_ACIMA) && this.y >0)
			this.y -= incremento;
		if (this.teclado.pressionada(SETA_ABAIXO) && this.y < this.context.canvas.width - 48)
			this.y += incremento;
	},
	desenhar: function(){
		if(teclado.pressionada(SETA_ESQUERDA))
			this.spritesheet.linha =1;
		else if(teclado.pressionada(SETA_DIREITA))
			this.spritesheet.linha = 2;
		else
			this.spritesheet.linha = 0;
		
		this.spritesheet.desenhar(this.x, this.y);
		this.spritesheet.proximoQuadro();
		//this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
	},
	atirar: function(){
		var tiro = new Tiro(this.context, this);
		this.animacao.novoSprite(tiro);
		this.colisor.novoSprite(tiro);
	},
	retangulosColisao:function(){
		let rets = [
			{x: this.x+2, y: this.y+19, largura: 9, altura: 13},
			{x: this.x+13, y: this.y+3, largura: 10, altura: 33},
			{x: this.x+25, y: this.y+19, largura: 9, altura: 13},	
		];
		/*let ctx = this.context;
		for( var i in rets){
			ctx.save();
			ctx.strokeStyle = 'yellow';
			ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
			ctx.restore();
		}*/
		return rets;
	},
	colidiuCom: function(outro){
		this.animacao.excluirSprite(this);
		this.animacao.excluirSprite(outro);
		this.colisor.excluirSprite(this);
		this.colisor.excluirSprite(outro);
		
		let exp1 = new Explosao(this.context, this.imgExplosao, this.x, this.y);
		let exp2 = new Explosao(this.context, this.imgExplosao, outro.x, outro.y);
		
		this.animacao.novoSprite(exp1);
		this.animacao.novoSprite(exp2);
		
		let nave = this;
		exp1.fimDaExplosao = function() {
			nave.vidasExtra --;
			if(nave.vidasExtra <= 0){
				if(nave.acabaramVidas) nave.acabaramVidas();
			}else{
				nave.colisor.novoSprite(nave)
				nave.animacao.novoSprite(nave);
				
				nave.posicionar();
			}
				
		}
		},
	posicionar: function(){
		let canvas = this.context.canvas;
		this.x = canvas.width /2 -18;
		this.y = canvas.height - 48;
	}

}
