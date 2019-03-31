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

		if ((mx1>mx2 && my1>my2) || (mx1<mx2 && my1<my2))
		{
			this.tipo = "crescente";
			coef_angular = abs((my1-my2)/(mx1-mx2));
			coef_linear = my1 - coef_angular*mx1;
			x_auxiliar = -coef_linear/coef_angular;
			y_auxiliar = coef_linear;
			this.a = (-Iy/(A*x_auxiliar));
			this.b = (-Ix/(A*y_auxiliar));


		}
		else if(mx1-mx2==0)
		{
			this.tipo = "vertical";
			this.b=0;
			this.a=(-Iy/(A*mx1));

		}
		else if(my1-my2==0)
		{
			this.tipo = "horizontal";
			this.a=0;
			this.b=(-Ix/(A*my1));
		}
		else
		{
			this.tipo = "decrescente";
			coef_angular = -abs((my1-my2)/(mx1-mx2));
			coef_linear = my1 - coef_angular*mx1;
			x_auxiliar = -coef_linear/coef_angular;
			y_auxiliar = coef_linear;
			this.a = (-Iy/(A*x_auxiliar));
			this.b = (-Ix/(A*y_auxiliar));

		}






		push();
		strokeWeight(1);
		translate(xbarra,ybarra);
		point(this.a,this.b);

		pop();
		console.log(this.a,this.b);

	}
}