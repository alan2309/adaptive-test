# Generated by Django 4.0 on 2022-03-08 15:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_myuser_permission_token'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionJson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('apt', models.JSONField()),
                ('cf', models.JSONField()),
                ('dom', models.JSONField()),
                ('code', models.JSONField()),
                ('aw', models.JSONField()),
                ('personality', models.JSONField()),
                ('test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.test')),
            ],
        ),
    ]
