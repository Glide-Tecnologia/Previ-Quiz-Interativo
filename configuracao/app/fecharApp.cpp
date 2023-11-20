#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <string.h>

int main(){
//    while(1){
//    	printf("Ola mundo.");
//    	system("magick -delay 20 -loop 0 imagem*.png test.gif");
//    	system("timeout /T 5");
//	}


	FILE *arq;
	char Linha[100];
  	
  	while(1){
		arq = fopen("ArqTeste.txt", "rt");
		fgets(Linha, 100, arq);
		if(strcmp(Linha,"1") == 0){
			system("taskkill /f /im chrome.exe");
			system("start explorer");
			strcpy(Linha,"0");
			arq = fopen("ArqTeste.txt", "wt");
			fputs(Linha, arq);
			break;
		}
		fclose(arq);
	}
	return 0;
}
