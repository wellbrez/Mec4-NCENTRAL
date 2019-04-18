function botaoalt(x,y,tamx,tamy,variavel,texto)
{
	
	this.draw = function()
	{
	if (window[variavel])
	{
		push();
		fill('green')
		rect(x,y,tamx,tamy);
		fill('black');
		text(texto,x,y + tamy/2);
		pop();
	}
	else
	{
		push();
		fill('red');
		rect(x,y,tamx,tamy);
		fill('black');
		text(texto,x,y+tamy/2);
		pop();
	}
	}

	this.checarpressao = function()
	{
		if (MX()>=x && MX()<=x+tamx && MY() >=y && MY()<=y+tamy)
		{
			window[variavel] = !window[variavel];
		}
	}
}
function botaodes()
{
	
}
function botaosf()
{
	
}