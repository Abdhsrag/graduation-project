import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/dataTypes';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  public deleteMsg: string | undefined

  public allProducts: Product[] | undefined

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this.productService.getProducts().subscribe((res)=>{
      if(res){
        this.allProducts = res
      }
    })
  }

  // onDelete(productId: string | undefined){
  //   productId && this.productService.deleteProduct(productId).subscribe((res)=>{
  //     if(res){
  //       this.getAllProducts()
  //       this.deleteMsg = 'Products Has Been Deleted',
  //       console.log('ok')
  //     }
  //     this.getTimeout()
  //   }, (err)=>{
  //     if(err){
  //       this.deleteMsg = err.statusText
  //     }
  //     this.getTimeout()
  //   })
  // }

  onDelete(productId: string | undefined){
    console.log('onDelete method called with productId:', productId);
    if (!productId) {
      console.error('No productId provided');
      return;
    }
    this.productService.deleteProduct(productId).subscribe((res)=>{
      console.log('deleteProduct response:', res);
      if(res){
        this.getAllProducts()
        this.deleteMsg = 'Products Has Been Deleted'
        console.log('ok')
      }
      this.getTimeout()
    }, (err)=>{
      console.error('Error deleting product:', err);
      if(err){
        this.deleteMsg = err.statusText
      }
      this.getTimeout()
    })
  }

  getTimeout(){
    setTimeout(() => {
      this.deleteMsg = undefined
    }, 4000);
  }

}
