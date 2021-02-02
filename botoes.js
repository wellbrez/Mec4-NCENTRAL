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
		if (mouseX>=x && mouseX<=x+tamx && mouseY >=y && mouseY<=y+tamy)
		{
			window[variavel] = !window[variavel];
		}
	}
}

function botaodes(x,y,tamx,tamy,tipo,texto)
{
	this.pressed = false;
	this.draw = function()
	{
	if (this.pressed)
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
	}}
	this.checarpressao = function()
	{
		if(mouseX>=x && mouseX<=x+tamx && mouseY >=y && mouseY<=y+tamy)
		{
			if (!this.pressed)
			{
				for (i=0;i<botoesdes.length;i++)

				{
					botoesdes[i].pressed = false;
				}
				this.pressed = true;
				status = tipo;

			}
			else
			{	
			this.pressed = !this.pressed;
			status = 'notdrawing'
			}

			return true;

		}
		else
		{
			return false;
		}
	}
}
function botaosf(x,y,tamx,tamy,acao,texto)
{
	this.draw = function()
	{
		push();
		fill('green')
		rect(x,y,tamx,tamy);
		fill('black');
		text(texto,x,y + tamy/2);
		pop();
	}
	this.checarpressao = function()
	{
	
		if (mouseX>=x && mouseX<=x+tamx && mouseY >=y && mouseY<=y+tamy)
		{
			acionar = acao;
		}
	
	}


}