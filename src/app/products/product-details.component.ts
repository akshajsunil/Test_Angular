import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from './product-service';
import { IProduct } from './products';

@Component({
  
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  pageTitle:string='Product Detail';
  product:IProduct|undefined;
  sub!:Subscription;
  errMessage='';


  constructor(private route: ActivatedRoute,private router:Router,private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle+=`:${id}`
    this.sub = this.productService.getProductId(id).subscribe({
      next:product=>{this.product =product;
       
      },
      error: err =>this.errMessage =err
    });
    
  }

  
  onBack():void {
    this.router.navigate(["./products"]);
  }
}
