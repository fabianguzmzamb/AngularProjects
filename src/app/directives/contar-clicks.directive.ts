import {Directive,HostListener,HostBinding} from "@angular/core";
@Directive({
	selector:'li[contar-clicks]'
})
export class ContarClickDirective{
	clickn = 0;
	@HostBinding('style.opacity') opacity: number =.1;
	@HostListener('click',['$event.target']) onClick(btn){
		console.log('a',btn,'Numero de clicks:' , this.clickn ++);
		this.opacity += .1;
	}
}