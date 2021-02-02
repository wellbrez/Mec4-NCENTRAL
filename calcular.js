
function arredonda20(n) // arredonda um numero n para uma base m. ex: arred(134,10 = 130)
{
	return Math.ceil(n/20/escala)*20/escala;
}
function arredonda(n) // arredonda um numero n para uma base m. ex: arred(134,10 = 130)
{
	return Math.ceil(n/10/escala)*10/escala;
}
function MX()
{
	return Math.round(((mouseX-desx)/escala)/10)*10;
}
function MY()
{
	return (Math.round(((mouseY-desy)/escala)/10)*10);
}
function calcularcentroide()
{
	areatotal=0;
	somaXarea=0;
	somaYarea=0;
	for (i=0;i<retangulos.length;i++) //desenhando retangulos, pegando area total, pegando somatorio Xbarra.Area e Ybarra.Area
	{
		if(retangulos[i].invisi)
		{
			console.log(areatotal);
			areatotal-= retangulos[i].area;
			somaXarea-=retangulos[i].xbarra*retangulos[i].area;
			somaYarea-=retangulos[i].ybarra*retangulos[i].area;
		}else{
		areatotal+= retangulos[i].area;
		somaXarea+=retangulos[i].xbarra*retangulos[i].area;
		somaYarea+=retangulos[i].ybarra*retangulos[i].area;
	}}
	for (i=0;i<triangulos.length;i++)
	{
		if(triangulos[i].invisi)
		{
		areatotal-= triangulos[i].area;
		somaXarea-=triangulos[i].xbarra*triangulos[i].area;
		somaYarea-=triangulos[i].ybarra*triangulos[i].area;
		}
		else{
		areatotal+= triangulos[i].area;
		somaXarea+=triangulos[i].xbarra*triangulos[i].area;
		somaYarea+=triangulos[i].ybarra*triangulos[i].area;
	}}

	ybarra=somaYarea/areatotal;  //calculo ybarra
	xbarra=somaXarea/areatotal;  //calculo xbarra


}
function calcularinercia()
{

		Ix=0;
		Iy=0;
		Ixy = 0;
		for (i=0;i<retangulos.length;i++)  //TEOREMA DOS EIXOS PARALELOS COM RETANGULOS
		{
			if (retangulos[i].invisi)
			{
				Ix -=retangulos[i].Ix+retangulos[i].area*(retangulos[i].ybarra-ybarra)**2; 
				Iy -=retangulos[i].Iy+retangulos[i].area*(retangulos[i].xbarra-xbarra)**2;
				Ixy -=retangulos[i].Ixy+retangulos[i].area*(-xbarra+retangulos[i].xbarra)*(ybarra-retangulos[i].ybarra); 
			}
			else{
			Ix +=retangulos[i].Ix+retangulos[i].area*(retangulos[i].ybarra-ybarra)**2; 
			Iy +=retangulos[i].Iy+retangulos[i].area*(retangulos[i].xbarra-xbarra)**2;
			Ixy +=retangulos[i].Ixy+retangulos[i].area*(-xbarra+retangulos[i].xbarra)*(ybarra-retangulos[i].ybarra); 
		}}


		for (i=0;i<triangulos.length;i++)  //TEOREMA DOS EIXOS PARALELOS COM TRIANGULOS
		{	
			if (triangulos[i].invisi)
			{

			Ix -=triangulos[i].Ix+triangulos[i].area*(triangulos[i].ybarra-ybarra)**2;
			Iy -=triangulos[i].Iy+triangulos[i].area*(triangulos[i].xbarra-xbarra)**2;
			Ixy -=triangulos[i].Ixy+triangulos[i].area*(-xbarra+triangulos[i].xbarra)*(ybarra-triangulos[i].ybarra);
			}
			else{
			Ix +=triangulos[i].Ix+triangulos[i].area*(triangulos[i].ybarra-ybarra)**2;
			Iy +=triangulos[i].Iy+triangulos[i].area*(triangulos[i].xbarra-xbarra)**2;
			Ixy +=triangulos[i].Ixy+triangulos[i].area*(-xbarra+triangulos[i].xbarra)*(ybarra-triangulos[i].ybarra);
		}}
		Imed = (Ix+Iy)/2;
		R = Math.sqrt(((Ix-Iy)/2)**2+Ixy**2);
		Imax = Imed+R;
		Imin = Imed-R;

		
		if (Ix>Iy)
		{
			angulo = Math.atan(-2*Ixy/(Iy-Ix))/2;
			Ixnew = Imax;
			Iynew = Imin;
		}
		else if(Iy>Ix)
		{
			angulo = Math.atan(-2*Ixy/(Iy-Ix))/2;
			Iynew=Imax;
			Ixnew=Imin;
		}
		else
		{
			angulo = Math.PI/4;
			if (Ixy>0)
			{
				Ixnew = Imax;
				Iynew = Imin;
			}
			else
			{
				Iynew = Imax;
				Ixnew = Imin;
			}
		
	}
	if (inputIy.value()!="" && inputIx.value()!="")
	{

		Ixnew = parseFloat(inputIx.value());
		Iynew = parseFloat(inputIy.value());
		areatotal = parseFloat(inputA.value());

	}

}