# Generated by Django 4.0 on 2022-02-17 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_subject_max_qs'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='token',
            field=models.CharField(blank=True, max_length=400, null=True),
        ),
    ]
