var tela = 'desenhar';
var status = 'notdrawing';
var memorypoints = [];
var retangulos = [];
var triangulos=[];
var linhas=[];
var areatotal = 0;
var somaXarea = 0;
var somaYarea = 0;
var historico = [];
var Ix=0;
var Iy=0;
var pontosremovidos = [];
var escala=1;
var desx=0;
var desy=0;

function textofixo(texto,x,y,tamanho,grossura)
{
	push();
	textSize(tamanho);
	strokeWeight(grossura);
	text(texto,x,y);
	pop();
}
function textoposicional(texto,x,y,tamanho,grossura)
{
	push();
	textSize(tamanho/escala);
	strokeWeight(grossura/escala);
	text(texto,x,y);
	pop();
}

function arredonda20(n) // arredonda um numero n para uma base m. ex: arred(134,10 = 130)
{
	return Math.ceil(n/20/escala)*20/escala;
}
function arredonda(n) // arredonda um numero n para uma base m. ex: arred(134,10 = 130)
{
	return Math.ceil(n/10/escala)*10/escala;
}
function MX()
{
	return Math.round(mouseX-x/escala+)
}
function MY()

function setup()
{
	width = arredonda20(windowWidth*0.9);
	height = arredonda20(windowHeight*0.9);

	xbarra=width/2;
	ybarra=height/2;
	createCanvas(width,height);
	noCursor();


}
function eixoscentrais()
{
	push();
	stroke('black');
	strokeWeight(1);
	translate(desx,desy);
	line(width/2*escala,-desy,width/2*escala,height-desy);
	line(-desx,height/2*escala,width-desx,height/2*escala);


	pop();
}
function draw()
{
	if (tela=='desenhar')
	{

		background('white')
		push();
		eixoscentrais();
		stroke('black');
		textofixo("Centróide",width*0.60,height*0.85,20,1);      //CENTROIDE TXT
		textofixo("X = "+Math.round((xbarra-width/2)*100)/100,width*0.60,height*0.9,20,1);      //CENTROIDE TXT
		textofixo("Y = "+Math.round((-ybarra+height/2)*100)/100,width*0.60,height*0.95,20,1);	//CENTROIDE TXT
		textofixo("AreaTotal = "+areatotal,width*0.60,height,20,1);  //display area total
		textofixo("Ix = "+Ix,width*0.8,height*0.9,20,1);  //IX TXT
		textofixo("Iy = "+Iy,width*0.8,height*0.95,20,1);  //IX TXT
		if (status=='drawingrec')
		{
			stroke('black');
			textofixo("("+(-width/2 + arredonda(memorypoints[0]))+","+(+height/2 - arredonda(memorypoints[1]))+")",arredonda(memorypoints[0])-10,arredonda(memorypoints[1])-30,20,1);
			textofixo("X1="+(+arredonda(memorypoints[0])-width/2),10,10,12,1);
			textofixo("Y1="+(-arredonda(memorypoints[1])+height/2),10,30,12,1);
			textofixo("LARGURA="+arredonda(mouseX-memorypoints[0]),10,50,12,1);
			textofixo("ALTURA="+arredonda(mouseY-memorypoints[1]),10,70,12,1);
			stroke('red');
			textofixo("RETANGULO",10,90,15,2);
		}

		scale(escala);
		translate(desx/escala,desy/escala);
		stroke(0,0,0);								//linhas pretas
		strokeWeight(2/escala);						//linhas grossura 2
		fill(0,0,0,150);						//fundo preto opacidade 150/255
		
		line(arredonda(mouseX)-20/escala,arredonda(mouseY),arredonda(mouseX)+20/escala,arredonda(mouseY));		//cross
		line(arredonda(mouseX),arredonda(mouseY)+20/escala,arredonda(mouseX),arredonda(mouseY)-20/escala);		//cross

			strokeWeight(1/escala);		//linha grossura 1
			textSize(12/escala);	
			text("("+(-width/2 + arredonda(mouseX))+","+(+height/2 - arredonda(mouseY))+")",arredonda(mouseX)+5/escala,arredonda(mouseY)-10/escala);

		for (i=0;i<retangulos.length;i++) //desenhando retangulos, pegando area total, pegando somatorio Xbarra.Area e Ybarra.Area
		{

			retangulos[i].draw();

		}
		for (i=0;i<triangulos.length;i++)
		{
			triangulos[i].draw();
		}




		for (i=0;i<linhas.length;i++) //desenhando linhas
		{
			linhas[i].draw();
			linhas[i].pointsbyline(xbarra,ybarra,Ix,Iy,areatotal);

			push();
			if (i!=0)
			{
				translate(xbarra,ybarra);
				line(linhas[i-1].a,linhas[i-1].b,linhas[i].a,linhas[i].b);
			}
			else 
			{
				translate(xbarra,ybarra);
				line(linhas[linhas.length-1].a,linhas[linhas.length-1].b,linhas[i].a,linhas[i].b);
			}
			pop();
		}

		push();						//PONTO VERMELHO CENTROIDE
		strokeWeight(4/escala);		//PONTO VERMELHO CENTROIDE
		stroke('red');				//PONTO VERMELHO CENTROIDE
		point(xbarra,ybarra);		//PONTO VERMELHO CENTROIDE
		pop();						//PONTO VERMELHO CENTROIDE


		
		pop();
		pop();

	
		if (status=='drawingrec')
		{
			fill(0,0,0,0);
			rect(
			memorypoints[0],
			memorypoints[1],
			arredonda(mouseX)-memorypoints[0],
			arredonda(mouseY)-memorypoints[1])
			push();

			strokeWeight(1);
			stroke(0);
			textSize(12);
			translate(20,20);

			stroke('black');
			
			pop();
		}
		else if (status =='drawingline')
		{

			push();
			fill(0,0,0,0);
			strokeWeight(1/escala);
			line(memorypoints[0],memorypoints[1],arredonda(mouseX),arredonda(mouseY));
			translate(-desx/escala,-desy/escala);
			scale(1/escala);
			strokeWeight(1);
			stroke(0);
			textSize(20);
			translate(20,20);
			text("X1="+(arredonda(memorypoints[0])-width/2),10,10);
			text("Y1="+(-arredonda(memorypoints[1])+height/2),10,30);
			text("X2="+arredonda(mouseX-width/2),10,50);
			text("Y2="+(-arredonda(mouseY+height/2),10,70));
			pop();
		}
		else if(status =='drawingtristart')
		{

			line(memorypoints[0],memorypoints[1],arredonda(mouseX),memorypoints[1]);
		}
			else if(status =='drawingtriend')
		{
			if (Math.abs(arredonda(mouseX)-memorypoints[0])>Math.abs(arredonda(mouseX)-memorypoints[2]))
			{

			triangle(memorypoints[0],memorypoints[1],memorypoints[2],memorypoints[3],memorypoints[2],arredonda(mouseY));
			}
			else
			{
				triangle(memorypoints[0],memorypoints[1],memorypoints[2],memorypoints[3],memorypoints[0],arredonda(mouseY));
			}
		}
	}

}
function keyPressed()
{
	if (key=='r')
	{
		if (status == 'notdrawing')
		{
			memorypoints = [arredonda(mouseX),arredonda(mouseY)];
			status = 'drawingrec';
		}
		else if (status == 'drawingrec')
		{
			retangulos.push(new retangulo(memorypoints[0],memorypoints[1],arredonda(mouseX),arredonda(mouseY)));
			historico.push('retangulo');
			status = 'notdrawing';
		}

	}
	//
	//
	if (key=='d')
	{
		status = 'notdrawing';
	}

	if (key=='z'&& status=='notdrawing')
	{
		ultimo = historico[historico.length-1];
		if (ultimo=='retangulo')
		{
			retangulos.pop();
			historico.pop();
		}
		else if(ultimo=='triangulo')
		{
			triangulos.pop();
			historico.pop();
		}
		else if(ultimo == 'linha')
		{
			linhas.pop();
			historico.pop();
		}
	}
	//
	//
	if (key=='l')
	{
		if (status == 'notdrawing')
		{
			memorypoints = [arredonda(mouseX),arredonda(mouseY)];
			status = 'drawingline';
		}
		else if (status=='drawingline')
		{
			linhas.push(new linha(memorypoints[0],memorypoints[1],arredonda(mouseX),arredonda(mouseY)));

			historico.push('linha');
			status='notdrawing';
		}
	}
	//
	//

	if (keyCode==UP_ARROW)
	{
		desy+=100;
	}
	if (keyCode==DOWN_ARROW)
	{
		desy-=100;
	}
	if (keyCode==LEFT_ARROW)
	{
		desx+=100;
	}
	if (keyCode==RIGHT_ARROW)
	{
		desx-=100;
	}

	if (key=='s')
	{
		escala = 1;
		desx=0;
		desy=0;
	}
	if(key=='+')
	{
		escala+=0.1;
	}
	if(key=='-')
	{
		escala-=0.1;
	}
	if (key=='t')
	{
		if(status=='notdrawing')
		{
			memorypoints = [arredonda(mouseX),arredonda(mouseY)];
			status = 'drawingtristart'
		}
		else if(status=='drawingtristart')
		{
			if (Math.abs(memorypoints[0]-arredonda(mouseX))>Math.abs(memorypoints[1]-arredonda(mouseY)))
			{
				memorypoints.push(arredonda(mouseX));
				memorypoints.push(memorypoints[1]);
			}
			else
			{
				memorypoints.push(memorypoints[0]);
				memorypoints.push(arredonda(mouseY));
			}
			status = 'drawingtriend';
		}
		else if(status=='drawingtriend')
		{
			if (Math.abs(arredonda(mouseX)-memorypoints[0])>Math.abs(arredonda(mouseX)-memorypoints[2]))
			{
				triangulos.push(new triangulo(memorypoints[0],memorypoints[1],memorypoints[2],memorypoints[3],memorypoints[2],arredonda(mouseY)));
			}
			else
			{
				triangulos.push(new triangulo(memorypoints[0],memorypoints[1],memorypoints[2],memorypoints[3],memorypoints[0],arredonda(mouseY)));
			}
			

			historico.push('triangulo');
			status='notdrawing';
		}
	}
	calcularcentroide();
	calcularinercia();
}