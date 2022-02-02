from django.urls import path
from . import views

urlpatterns = [
   path('api/qs',views.qs),
   path('api/subs',views.subs),
   path('api/results/<str:name>',views.results),
   path('api/marks/<str:sid>',views.marks),
   path('api/subs/<str:subject>',views.subqs),
   path('api/test/<int:idd>',views.tests),
   path('api/codingTests',views.getCodingTests),
   path('api/admin/resultTest/<str:id>',views.resultTest),
   path('api/para',views.comprehension),
   path('api/personality/res',views.personalityR),
   path('api/personality/res',views.personalityR),
   

   # admin
   path('api/admin/addQs',views.addQs),
   path('api/admin/delQs',views.delQs),
   path('api/admin/saveTest',views.saveTest),
   path('api/admin/tests',views.getTests),
]