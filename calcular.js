function calcularcentroide()
{
	areatotal=0;
	somaXarea=0;
	somaYarea=0;
	for (i=0;i<retangulos.length;i++) //desenhando retangulos, pegando area total, pegando somatorio Xbarra.Area e Ybarra.Area
	{
		areatotal+= retangulos[i].area;
		somaXarea+=retangulos[i].xbarra*retangulos[i].area;
		somaYarea+=retangulos[i].ybarra*retangulos[i].area;
	}
	for (i=0;i<triangulos.length;i++)
	{
		areatotal+= triangulos[i].area;
		somaXarea+=triangulos[i].xbarra*triangulos[i].area;
		somaYarea+=triangulos[i].ybarra*triangulos[i].area;
	}

	ybarra=somaYarea/areatotal;  //calculo ybarra
	xbarra=somaXarea/areatotal;  //calculo xbarra


}
function calcularinercia()
{

		Ix=0;
		Iy=0;
		for (i=0;i<retangulos.length;i++)  //TEOREMA DOS EIXOS PARALELOS COM RETANGULOS
		{
			Ix +=retangulos[i].Ix+retangulos[i].area*(retangulos[i].ybarra-ybarra)**2; 
			Iy +=retangulos[i].Iy+retangulos[i].area*(retangulos[i].xbarra-xbarra)**2; 
		}


		for (i=0;i<triangulos.length;i++)  //TEOREMA DOS EIXOS PARALELOS COM TRIANGULOS
		{
			Ix +=triangulos[i].Ix+triangulos[i].area*(triangulos[i].ybarra-ybarra)**2;
			Iy +=triangulos[i].Iy+triangulos[i].area*(triangulos[i].xbarra-xbarra)**2;
		}
}