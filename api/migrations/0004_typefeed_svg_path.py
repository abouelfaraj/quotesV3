# Generated by Django 4.2.14 on 2024-10-11 11:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_following'),
    ]

    operations = [
        migrations.AddField(
            model_name='typefeed',
            name='svg_path',
            field=models.TextField(default='<!-- SVG Placeholder -->'),
        ),
    ]