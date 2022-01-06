from django.urls import path
from . import views

urlpatterns = [
   path('api/qs',views.qs),
   path('api/subs/<str:subject>',views.subqs),
   path('api/results/<str:name>',views.results),
   path('api/marks',views.marks),

   # admin
   path('api/admin/addQs',views.addQs)
]