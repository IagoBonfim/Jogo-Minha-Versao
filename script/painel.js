function Painel(context, Nave){
	this.context = context;
	this.nave = nave;
	this.spritesheet = new Spritesheet(context, nave.imagem, 3, 2);
	this.spritesheet.linha = 0;
	this.spritesheet.coluna = 0;
	this.pontuacao = 0;
}

Painel.prototype = {
	atualizar: function(){
		
	},
	desenhar: function(){
		this.context.scale(0.5, 0.5);
		let x = 20;
		let y = 20;
		
		for(var i =1; i <= this.nave.vidasExtra; i++){
			this.spritesheet.desenhar(x, y);
			x += 40;
		}
		this.context.scale(2, 2);
		let ctx = this.context;
		ctx.save();
		ctx.fillStyle = 'white';
		ctx.font = '18px sans-serif';
		ctx.fillText(this.pontuacao, 100, 27);
		ctx.restore();
	}
}