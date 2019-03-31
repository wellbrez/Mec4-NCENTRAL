function retangulo(x1,y1,x2,y2)
{
	this.pontos = [x1,y1,x2,y2];
	this.xbarra = (x1+x2)/2;
	this.ybarra = (y1+y2)/2;
	this.Ix=Math.abs(x2-x1)*Math.abs(y2-y1)**3/12;
	this.Iy=Math.abs(x2-x1)**3*Math.abs(y2-y1)/12;
	this.area = Math.abs((x2-x1)*(y2-y1));
	this.draw = function()
	{
		
		push();
		rect(x1,y1,x2-x1,y2-y1);
		strokeWeight(2/escala);
		stroke(255);
		point(this.xbarra,this.ybarra);
		pop();
	}
}