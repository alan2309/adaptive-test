from django.urls import path
from . import views

urlpatterns = [
   path('api/qs',views.qs),
   path('api/results/<str:name>',views.results),
   path('api/marks',views.marks),
]