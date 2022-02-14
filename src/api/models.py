from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model
# Create your models here.
User = get_user_model()


import datetime
import random
import string

class Buyer(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank = True)
    latitude = models.CharField(max_length=50, blank = True)
    longitude = models.CharField(max_length=50, blank = True)

class Seller(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank = True)
    latitude = models.CharField(max_length=50, blank = True)
    longitude = models.CharField(max_length=50, blank = True)

class Transporter(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank = True)
    latitude = models.CharField(max_length=50, blank = True)
    longitude = models.CharField(max_length=50, blank = True)
