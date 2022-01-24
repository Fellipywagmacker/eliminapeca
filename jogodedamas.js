const tamanhoCelula = 40;
let pecaId = 0;
document.body.append(criaTabuleiro());

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
            linha.append(celula);

            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            if (i % 2 == j % 2) {
                celula.style.backgroundColor = 'black';
                if (i * 8 + j <= 24) {
                    celula.append(criaPeca('black'));
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red'));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    return tabela;
}

function criaPeca(cor) {
    let imagem = document.createElement('img');
    imagem.setAttribute('src', `img/${cor}.png`);
    imagem.setAttribute('width', `${tamanhoCelula-4}px`);
    imagem.setAttribute('height', `${tamanhoCelula-4}px`);
    return imagem;
}


// Dividindo em x e y 
ajd = 0
pixeis = document.querySelectorAll('td');
pixeis.forEach(celula => {
	if (ajd > 7) {
		ajd = 0
	}
	celula.setAttribute('id', ajd)
	ajd += 1
})



id = 0
tr = document.querySelectorAll('tr')
tr.forEach(item => {
	item.setAttribute('id', id);
	id += 1
})



// achado todas as peças e aplicando alguns eventos a elas.
peca = document.querySelectorAll('img')
peca.forEach(pe => {
	pe.setAttribute('draggable', 'true')
	pe.addEventListener('dragstart', dragstart);
	pe.addEventListener('dragend', dragend);
})


// definindo as funções
function dragend() {
	this.classList.remove('achado')
}

function dragover(e) {
	e.preventDefault()
}

function dragstart() {
	this.classList.add('achado')
}

function dragleave() {
	this.style.backgroundColor = 'black'
}


// Organizando as peças em listas diferentes
p_Vermelhas = []
p_Pretas = []


aux = 0
while (aux < 12) {
	p_Pretas.push(peca[aux]);
	aux += 1
}

aux2 = 12
while (aux < 24) {
	p_Vermelhas.push(peca[aux]);
	aux += 1
}

// Dando nomes as peças
function orga() {
	peca.forEach(peca => {
		peca.setAttribute('name', '')
		peca.name = peca.parentNode.id;
	})
}


pretas = []

pixeis.forEach(celula =>{
	if (celula.style.backgroundColor == 'black'){
	pretas.push(celula)}
})


// Arrastando as peças
pretas.forEach(celulapreta => {
	celulapreta.addEventListener('dragover', dragover)
	celulapreta.addEventListener('dragenter', dragenter);
	celulapreta.addEventListener('dragleave', dragleave);
celulapreta.addEventListener('drop', drop)
})




function drop(){
	mata = p_Vermelhas.indexOf(document.querySelector('.achado'))
	p_ini = parseInt(document.querySelector('.achado').parentNode.parentNode.id)
	p_fim = parseInt(this.parentNode.id)
	pi_ini = parseInt(document.querySelector('.achado').name)
	pi_fim = parseInt(this.id)
	movimento = this
	
	if (f_Vlimit(p_ini, p_fim, pi_ini, pi_fim, movimento) == true) {
		this.style.backgroundColor = 'black'
		this.append(document.querySelector('.achado'))
		document.querySelector('.achado').setAttribute('name', this.id)
		if(positivos(p_fim, pi_fim, pi_ini, mata) == true) {
		if (p_Vermelhas.indexOf(document.querySelector('.achado')) !== -1){
			if(pi_fim < pi_ini){
				tr[p_fim +1].childNodes[pi_fim +1].childNodes[0].remove()
			}
			else{
				tr[p_fim+1].childNodes[pi_fim -1].childNodes[0].remove()
			}
		}
		else {
			if(pi_fim < pi_ini){
				tr[p_fim -1].childNodes[pi_fim +1].childNodes[0].remove()
			}
			else{
				tr[p_fim -1].childNodes[pi_fim -1].childNodes[0].remove()
			}
		}
	}			
}
	
	else {
		this.style.backgroundColor = 'black' 
	}
					
}

// Limitando os movimentos das peças
function positivos(p_ini, p_fim, pi_ini, pi_fim, movimento){
	
	if (p_Vermelhas.indexOf(document.querySelector('.achado')) !== -1 )	{
		if (p_ini == p_fim + 1){
			if (pi_fim == pi_ini + 1 || pi_fim == pi_ini - 1){
				if (movimento.hasChildNodes() == false){
					return true
				}
				else {
					return false
				}
			}
		}
	}
	else{
		if (p_ini == p_fim - 1){
			if (pi_fim == pi_ini + 1 || pi_fim == pi_ini - 1){
				if (movimento.hasChildNodes() == false){
					return true
				}
				else {
					return false
				}
			}
		}
	}
	
}


// Adicionado cores de limitações onde a peça pode e não pode ser colocada 
function dragenter(t) { 
	t.preventDefault();
	p = parseInt(document.querySelector('.achado').parentNode.parentNode.id)
	o = parseInt(this.parentNode.id)
	s = parseInt(document.querySelector('.achado').name)
	i = parseInt(this.id)
	t = this
	if (f_Vlimit(p,o,s,i,t) == true) {
		this.style.backgroundColor = '#00FF00'
	}
	else {
		this.style.backgroundColor = '#FF0000'
	}
}




function f_Vlimit(p_ini, p_fim, pi_ini, pi_fim, fim){
	mata = p_Vermelhas.indexOf(document.querySelector('.achado'))
	if (p_Vermelhas.indexOf(document.querySelector('.achado')) !== -1 )	{
		if (p_ini == p_fim + 1){
			if (pi_fim == pi_ini + 1 || pi_fim == pi_ini - 1){
				if (fim.hasChildNodes() == false){
					return true
				}
				else {
					return false
				}
			}
		}
		else if (p_ini == p_fim +2){
			if(pi_fim == pi_ini + 2 || pi_fim == pi_ini -2){
					if(positivos(p_fim,pi_fim,pi_ini,mata) == true){
						if (fim.hasChildNodes() == false){
						return true}
					}
				}
		}
	else {
		return false	}
			
		
}
	else{
		if (p_ini == p_fim - 1){
			if (pi_fim == pi_ini + 1 || pi_fim == pi_ini - 1){
				if (fim.hasChildNodes() == false){
					return true
				}
				else {
					return false
				}
			}
		}
		else  if (p_ini == p_fim -2){
			if(pi_fim == pi_ini + 2 || pi_fim == pi_ini -2){
					if(positivos(p_fim,pi_fim,pi_ini,mata) == true){
						if(fim.hasChildNodes() == false){
						return true}
					}
				}
			else{
				return false
			}
	}
	
}}


// Função que elimina a peça de cor diferente 
function positivos(p_fim, pi_fim, pi_ini, mata){
	if (mata !== -1){
	if (pi_fim < pi_ini) {
		if (tr[p_fim +1].childNodes[pi_fim +1].hasChildNodes() == true){
			if (p_Vermelhas.indexOf(tr[p_fim +1].childNodes[pi_fim +1].childNodes[0]) == -1){
			return true}
		}
		else {
			return false
		}
	}
	else {
		if (tr[p_fim +1].childNodes[pi_fim -1].hasChildNodes() == true){
			if (p_Vermelhas.indexOf(tr[p_fim +1].childNodes[pi_fim -1].childNodes[0]) == -1){
			return true}
		}
		else {
			return false
		}
	}
	}
	else {
		if (pi_fim < pi_ini){
		if (tr[p_fim -1].childNodes[pi_fim +1].hasChildNodes() == true){
			if (p_Pretas.indexOf(tr[p_fim -1].childNodes[pi_fim +1].childNodes[0]) == -1){
			return true}
		}
		else {
			return false
		}
	}
		else{
			if (tr[p_fim -1].childNodes[pi_fim -1].hasChildNodes() == true){
			if (p_Pretas.indexOf(tr[p_fim -1].childNodes[pi_fim -1].childNodes[0]) == -1){
			return true}
		}
		else {
			return false
		}
		}
	
	}


}
