function TemBotaoApertado()
{
	for (i=0;i<botoesalt.length;i++)
	{
		if(botoesalt[i].checarpressao())
		{
		return true;
		}
		
	}
	for (i=0;i<botoesdes.length;i++)
	{
		if(botoesdes[i].checarpressao())
		{
		return true;
		}
	}
	for (i=0;i<botaosf;i++)
	{
		if(botoessf[i].checarpressao())
		{
		return true;
		}
	}
	return false;
}