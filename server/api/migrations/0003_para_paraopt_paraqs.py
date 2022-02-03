# Generated by Django 3.2.7 on 2022-01-29 11:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_codingtest'),
    ]

    operations = [
        migrations.CreateModel(
            name='Para',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('data', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Paraqs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('para', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.para')),
            ],
        ),
        migrations.CreateModel(
            name='Paraopt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('marks', models.IntegerField()),
                ('paraqs', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.paraqs')),
            ],
        ),
    ]