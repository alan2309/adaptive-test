# Generated by Django 4.0 on 2022-03-29 15:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_myuser_view_result_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='myuser',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.myuser'),
        ),
    ]
