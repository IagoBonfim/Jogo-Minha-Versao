function Animacao(context){
    this.context = context;
    this.sprites = [];
    this.ligado = false;
	this.processamentos = [];
	this.spritesExcluir = [];
	this.processamentosExcluir = [];
}
Animacao.prototype = {
    novoSprite: function(sprite){
        this.sprites.push(sprite);
		sprite.animacao = this;
    },
    ligar: function() {
        this.ligado = true;
        this.proximoFrame();
    },
    desligar: function() {
        this.ligado = false;
    },
    proximoFrame: function() {
        if (! this.ligado) return;
       		
        for(var i in this.sprites)
            this.sprites[i].atualizar();
        for(var i in this.sprites)
            this.sprites[i].desenhar();
		for (var i in this.processamentos)
			this.processamentos[i].processar();
		
    	this.processarExclusoes();
        var animacao = this;
        requestAnimationFrame(function() {
            animacao.proximoFrame();
        });
    },
   
	novoProcessamento: function(processamento){
		this.processamentos.push(processamento);
		processamento.animacao = this;
	},
	excluirSprite: function(sprite){
		this.spritesExcluir.push(sprite);
	},
	excluirProcessamento: function(processamento){
		this.processamentosExcluir.push(processamento);
	},
	processarExclusoes: function(){
		let novoSprites = [];
		let novoProcessamentos = [];
		
		for(var i in this.sprites){
			if( this.spritesExcluir.indexOf(this.sprites[i]) == -1)
				novoSprites.push(this.sprites[i]);
		}
		for(var i in this.processamentos){
			if(this.processamentosExcluir.indexOf
				(this.processamentos[i]) == -1)
			novoProcessamentos.push(this.processamentos[i]);
		}	
	
		this.spritesExcluir = [];
		this.processamentosExcluir = [];
	
		this.sprites = novoSprites;
		this.processamentos = novoProcessamentos;
	}
}