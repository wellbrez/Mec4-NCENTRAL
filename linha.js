function linha(x1,y1,x2,y2)
{
	this.pontos = [];
	this.a;
	this.b;

	this.tipo;
	this.draw = function()
	{	push();
		strokeWeight(3/escala);
		stroke(255,0,255);
		line(x1,y1,x2,y2);
		pop();
	}
	this.pointsbyline = function(xbarra,ybarra,Ix,Iy,A)
	{
		mx1 = -xbarra+x1;
		mx2 = -xbarra+x2;
		my1 = -ybarra+y1;
		my2 = -ybarra+y2;

		if (final)
		{
			tempy1 = my1;
			my1 = my1*cos(angulo)-mx1*sin(angulo);
			mx1 = mx1*cos(angulo)+tempy1*sin(angulo);
			tempy2 = my2;
			my2 = my2*cos(angulo)-mx2*sin(angulo);
			mx2 = mx2*cos(angulo)+tempy2*sin(angulo);
		}


		if ((mx1>mx2 && my1>my2) || (mx1<mx2 && my1<my2))
		{
			this.tipo = "crescente";
			coef_angular = abs((my1-my2)/(mx1-mx2));
			coef_linear = my1 - coef_angular*mx1;
			x_auxiliar = -coef_linear/coef_angular;
			y_auxiliar = coef_linear;
			this.a = (-Iynew/(A*x_auxiliar));
			this.b = (-Ixnew/(A*y_auxiliar));


		}
		else if(mx1-mx2==0)
		{
			this.tipo = "vertical";
			this.b=0;
			this.a=(-Iynew/(A*mx1));

		}
		else if(my1-my2==0)
		{
			this.tipo = "horizontal";
			this.a=0;
			this.b=(-Ixnew/(A*my1));
		}
		else
		{
			this.tipo = "decrescente";
			coef_angular = -abs((my1-my2)/(mx1-mx2));
			coef_linear = my1 - coef_angular*mx1;
			x_auxiliar = -coef_linear/coef_angular;
			y_auxiliar = coef_linear;
			this.a = (-Iynew/(A*x_auxiliar));
			this.b = (-Ixnew	/(A*y_auxiliar));

		}






		push();

		translate(xbarra,ybarra);

		strokeWeight(1/escala);
		
		push();
		if (final){

		rotate(angulo);
		point(this.a,this.b);
		textoposicional('('+(Math.round(this.a*100)/100)+' , '+(-Math.round(this.b*100)/100)+")",this.a,this.b,12,1);}
		pop();
		pop();

	}
}