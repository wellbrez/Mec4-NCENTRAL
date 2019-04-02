function textofixo(texto,x,y,tamanho,grossura)
{
	push();
	fill(0,0,0);
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
function cross()
{
		strokeWeight(1/escala);		//linha grossura 1
		textSize(12/escala);	
		text("("+(-width/2 + MX())+","+(+height/2 - MY())+")",MX()+5/escala,MY()-10/escala);
		line(MX()-20/escala,MY(),MX()+20/escala,MY());		//cross
		line(MX(),MY()+20/escala,MX(),MY()-20/escala);
}