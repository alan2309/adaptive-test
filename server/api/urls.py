from django.urls import path
from . import views

urlpatterns = [
   path('api/qs',views.qs),
   path('api/subs',views.subs),
   path('api/results/<str:name>',views.results),
   path('api/marks',views.marks),
   path('api/subs/<str:subject>',views.subqs),

   # admin
   path('api/admin/addQs',views.addQs),
   path('api/admin/delQs',views.delQs),
]