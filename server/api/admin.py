from django.contrib import admin
from .models import (Questions,Options,Results,Subject,Test)

# Register your models here.
admin.site.register(Questions)
admin.site.register(Options)
admin.site.register(Results)
admin.site.register(Subject)
admin.site.register(Test)
