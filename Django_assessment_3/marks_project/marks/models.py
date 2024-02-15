# marks/models.py
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=10, unique=True)
    math_marks = models.IntegerField()
    science_marks = models.IntegerField()
    english_marks = models.IntegerField()

    def __str__(self):
        return self.name
