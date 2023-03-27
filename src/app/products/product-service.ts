import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,catchError,tap, throwError, map } from "rxjs";
import { IProduct } from "./products";

@Injectable({
    providedIn: 'root'
})
export class ProductService {


 private productUrl = 'api/products/products.json';
 constructor(private http:HttpClient){

 }

 getProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl).pipe(
        tap(data=> console.log('ALL',JSON.stringify(data))),
        catchError(this.handleError)
    );
 

 }
 getProductId(id:number):Observable<IProduct | undefined>{
    return this.getProducts().pipe(
        map((products:IProduct[])=>products.find(p=>p.productId==id))
    );
    

 }
    private handleError(err: HttpErrorResponse) {
        let errMessage ='';
        if(err.error instanceof ErrorEvent)
        errMessage=`An Error occured ${err.error.message}`;
        else{
            errMessage = ` Server returned code :${err.status}, error message is ${err.message}`;

        }
        console.error(errMessage);
        return throwError(()=>errMessage)
    }
}