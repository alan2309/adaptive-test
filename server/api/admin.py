from django.contrib import admin
from .models import (Questions,Options,Results)

# Register your models here.
admin.site.register(Questions)
admin.site.register(Options)
admin.site.register(Results)
