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
var Ixy=0;
var Imed=0;
var Imax=0;
var Imin=0;
var Ixnew=0;
var Iynew=0;
var pontosremovidos = [];
var escala=1;
var desx=0;
var desy=0;
var angulo = Math.PI/2;
var final = false;
var invisi = false;



function setup()
{
	width = arredonda20(windowWidth*0.9);
	height = arredonda20(windowHeight*0.9);

	xbarra=width/2;
	ybarra=height/2;
	createCanvas(width,height);
	noCursor();


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
		textofixo("AreaTotal = "+Math.round(areatotal*100)/100,width*0.60,height,20,1);  //display area total
		textofixo("Ix = "+Math.round(Ix*100)/100,width*0.8,height*0.9,20,1);  //IX TXT
		textofixo("Iy = "+Math.round(Iy*100)/100,width*0.8,height*0.95,20,1);
		textofixo("Ixrodado = "+Math.round(Ixnew*100)/100,width*0.4,height*0.95,20,1);  //IX TXT
		textofixo("Iyrodado = "+Math.round(Iynew*100)/100,width*0.4,height*1,20,1);
		textofixo("Ixy = "+Math.round(Ixy*100)/100,width*0.4,height*0.90,20,1);  //IX TXT
		if (status=='drawingrec')
		{
			push();
			stroke('black');
			textofixo("("+(-width/2 + arredonda(memorypoints[0]))+","+(+height/2 - arredonda(memorypoints[1]))+")",arredonda(memorypoints[0])-10,arredonda(memorypoints[1])-30,20,1);
			textofixo("X1="+((memorypoints[0])-width/2),10,10,12,1);
			textofixo("Y1="+(-(memorypoints[1])+height/2),10,30,12,1);
			textofixo("LARGURA="+(MX()-memorypoints[0]),10,50,12,1);
			textofixo("ALTURA="+(MY()-memorypoints[1]),10,70,12,1);
			stroke('red');
			textofixo("RETANGULO",10,90,15,2);
			pop();
		}
		else if (status =='drawingline')
		{
			push();
			textofixo("X1="+(memorypoints[0]-width/2),10,10,12,1);
			textofixo("Y1="+(-memorypoints[1]+height/2),10,30,12,1);
			textofixo("X2="+(MX()-width/2),10,50,12,1);
			textofixo("Y2="+(-MY()+height/2),10,70,12,1);
			stroke('red');
			textofixo("CONTORNO",10,90,15,2);
			pop();
		}
		
		scale(escala);
		translate(desx/escala,desy/escala);
		cross();
		push();
			
			if (final)
			{
				translate(xbarra,ybarra);
				rotate(-angulo);
				translate(-xbarra,-ybarra);
			}
			
			


		for (i=0;i<retangulos.length;i++) //desenhando retangulos, pegando area total, pegando somatorio Xbarra.Area e Ybarra.Area
		{
			retangulos[i].draw();

		}
		for (i=0;i<triangulos.length;i++)
		{
			triangulos[i].draw();
		}



		pop();
		for (i=0;i<linhas.length;i++) //desenhando linhas
		{
			push();
			if (final)
			{
				translate(xbarra,ybarra);
				rotate(-angulo);
				translate(-xbarra,-ybarra);
			}
			linhas[i].draw();
			linhas[i].pointsbyline(xbarra,ybarra,Ix,Iy,areatotal);
			pop();
			push();
			if (final){
			if (i!=0)
			{
				translate(xbarra,ybarra);
				line(linhas[i-1].a,linhas[i-1].b,linhas[i].a,linhas[i].b);
			}
			else 
			{
				translate(xbarra,ybarra);
				line(linhas[linhas.length-1].a,linhas[linhas.length-1].b,linhas[i].a,linhas[i].b);
			}}
			pop();
		}

		push();						//PONTO VERMELHO CENTROIDE
		strokeWeight(1/escala);		//PONTO VERMELHO CENTROIDE
		if (!final)
		{
			stroke('green');
		}
		else
		{
			stroke('red');
		}
		translate(xbarra,ybarra);

		line(100,0,-100,0);
		line(0,100,0,-100);	

		if (final)
		{
			stroke('green');
			rotate(-angulo)
			line(100,0,-100,0);
			line(0,100,0,-100);	
		}		//PONTO VERMELHO CENTROIDE
		pop();						//PONTO VERMELHO CENTROIDE

		stroke('black');

		

	
		if (status=='drawingrec')
		{
			fill(0,0,0,0);
			rect(
			memorypoints[0],
			memorypoints[1],
			MX()-memorypoints[0],
			MY()-memorypoints[1]);
		}
		else if (status =='drawingline')
		{

			push();
			strokeWeight(1/escala);
			line(memorypoints[0],memorypoints[1],MX(),MY());
			pop();
		}
		else if(status =='drawingtristart')
		{

			line(memorypoints[0],memorypoints[1],MX(),memorypoints[1]);
		}
		else if(status =='drawingtriend')
		{
			if (Math.abs(MX()-memorypoints[0])>Math.abs(MX()-memorypoints[2]))
			{

				triangle(memorypoints[0],memorypoints[1],memorypoints[2],memorypoints[3],memorypoints[2],MY());
			}
			else
			{
				triangle(memorypoints[0],memorypoints[1],memorypoints[2],memorypoints[3],memorypoints[0],MY());
			}
		}
	}

}
function keyPressed()
{
	
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
			memorypoints = [MX(),MY()];
			status = 'drawingline';
		}
		else if (status=='drawingline')
		{
			linhas.push(new linha(memorypoints[0],memorypoints[1],MX(),MY()));

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
		angulo = 0;
	}
	if(key=='+')
	{
		escala+=0.1;
	}
	if(key=='-')
	{
		escala-=0.1;
	}
	if(key=='f')
	{
		final= !final;
	}

	if(key=='o')
	{
		invisi= !invisi;
	}
	if (key=='t')
	{
		if(status=='notdrawing')
		{
			memorypoints = [MX(),MY()];
			status = 'drawingtristart'
		}
		else if(status=='drawingtristart')
		{
			if (Math.abs(memorypoints[0]-MX())>Math.abs(memorypoints[1]-MY()))
			{
				memorypoints.push(MX());
				memorypoints.push(memorypoints[1]);
			}
			else
			{
				memorypoints.push(memorypoints[0]);
				memorypoints.push(MY());
			}
			status = 'drawingtriend';
		}
		else if(status=='drawingtriend')
		{
			if (Math.abs(MX()-memorypoints[0])>Math.abs(MX()-memorypoints[2]))
			{
				triangulos.push(new triangulo(memorypoints[0],memorypoints[1],memorypoints[2],memorypoints[3],memorypoints[2],MY()));
				triangulos[triangulos.length-1].invisi = invisi;
			}
			else
			{
				triangulos.push(new triangulo(memorypoints[0],memorypoints[1],memorypoints[2],memorypoints[3],memorypoints[0],MY()));
				triangulos[triangulos.length-1].invisi = invisi;
			}
			

			historico.push('triangulo');
			status='notdrawing';
		}
	}
	if (key=='r')
	{
		if (status == 'notdrawing')
		{
			memorypoints = [MX(),MY()];
			status = 'drawingrec';
		}
		else if (status == 'drawingrec')
		{
			retangulos.push(new retangulo(memorypoints[0],memorypoints[1],MX(),MY()));
			retangulos[retangulos.length-1].invisi = invisi;
			historico.push('retangulo');
			status = 'notdrawing';
		}

	}
	calcularcentroide();
	calcularinercia();
}