# Generated by Django 3.2.7 on 2022-02-18 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_feedback'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='takeFeeback',
            field=models.IntegerField(default=1),
        ),
    ]