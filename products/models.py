from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(default='', blank=True)
    def __str__(self):
        return self.title
    
class Product(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(default='', blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField()
    stock = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default="pending")
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Order {self.id}"

class OrderItem(models.Model):
    user = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity =models.PositiveBigIntegerField() 
    price = models.DecimalField(max_digits=8, decimal_places=2)
    def __str__(self):
        return f"{self.product.name} {self.quantity}"