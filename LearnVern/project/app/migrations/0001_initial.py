# Generated by Django 4.2.6 on 2023-11-05 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Lastname', models.CharField(max_length=50)),
                ('Firstname', models.EmailField(max_length=50)),
                ('Contact', models.CharField(max_length=50)),
            ],
        ),
    ]