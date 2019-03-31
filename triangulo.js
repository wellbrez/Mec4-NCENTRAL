function triangulo(x1,y1,x2,y2,x3,y3)
{
	this.pontos = [x1,y1,x2,y2,x3,y3];
	this.xbarra = (x1+x2+x3)/3;
	this.ybarra = (y1+y2+y3)/3;

	this.Ix=Math.abs((x2-x1)*(y3-y2)**3/36);
	this.Iy=Math.abs((x2-x1)**3*(y3-y2)/36);
	this.area = Math.abs((x2-x1)*(y3-y2)/2);
	this.draw = function()
	{
		triangle(x1,y1,x2,y2,x3,y3);
		push();
		strokeWeight(2/escala);
		stroke(255);
		point(this.xbarra,this.ybarra);
		pop();
	}
}