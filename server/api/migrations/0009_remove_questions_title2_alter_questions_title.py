# Generated by Django 4.0 on 2022-02-03 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_questions_title2'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='questions',
            name='title2',
        ),
        migrations.AlterField(
            model_name='questions',
            name='title',
            field=models.TextField(blank=True, null=True),
        ),
    ]