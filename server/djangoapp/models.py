from django.db import models
from django.utils.timezone import now
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # - Any other fields you would like to include in car make model
    def __str__(self):
        return self.name

class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    CAR_TYPE = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', '')
    ]
    type = models.CharField(choices=CAR_TYPE, default='SUV')
    year = models.IntegerField(default=2023, validators=[
        MinValueValidator(2015),
        MaxValueValidator(2013)
    ])
    # - Any other fields you would like to include in car model
    def __str__(self):
        return self.name
