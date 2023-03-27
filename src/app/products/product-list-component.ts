import { Component, OnInit,OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductService } from "./product-service";
import { IProduct } from "./products";


@Component({
    selector:"pm-products",
    templateUrl:'./product-list-component.html',
    styleUrls:['./product-list-component.css']
})


export class ProductListComponent implements OnInit {
    pageTitle:string = 'Product Listss';
    showImage:boolean=false;
    products:IProduct[]=[];
    errMessage='';
    sub!:Subscription;
    constructor(private productService: ProductService) {
      
    }
      filteredProducts:IProduct[] =[];
      
      imageWidth:number =50;
      imageMargin:number=2;
      toggleImage():void {
        this.showImage=!this.showImage
      }
      private _listFilter:string="";
      get listFilter(): string{
        return this._listFilter;
      }
      set listFilter(value:string)
      {
        this._listFilter=value;
        this.filteredProducts=this.performFilter(value);
      }
      ngOnInit(): void{

          this.sub = this.productService.getProducts().subscribe({
            next:products=>{this.products =products;
              this.filteredProducts= this.products;
            },
            error: err =>this.errMessage =err
          });
          
      }
      ngOnDestroy(){
        this.sub.unsubscribe();
      }
      performFilter(value:string):IProduct[]{
        value = value.toLowerCase();
        return this.products.filter((product: IProduct)=>
            product.productName.toLowerCase().includes(value));

      }
      OnRatingClicked(message:string): void{
        this.pageTitle=message;
        
      }
      
}
