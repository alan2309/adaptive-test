from django.urls import path
from . import views

urlpatterns = [
   #Authentication
   path('api/log',views.login),

   #student side
   path('api/qs',views.qs),
   path('api/subs',views.subs),
   path('api/results/<str:name>',views.results),
   path('api/marks/<str:sid>',views.marks),
   path('api/subs/<str:subject>/<int:tid>',views.subqs),
   path('api/test/<int:idd>',views.tests),
   path('api/codingTests/<int:tid>',views.getCodingTests),
   path('api/admin/resultTest/<str:id>',views.resultTest),
   path('api/para/<int:tid>',views.comprehension),
   path('api/personality/res',views.personalityR),
   path('api/personality/res',views.personalityR),
   path('api/createUser',views.createUser),
   path('api/newuser',views.newuser),
   path("api/forgotpass",views.forgotpass),
   path("api/changepass",views.changepass),

   # admin
   path('api/admin/addQs',views.addQs),
   path('api/admin/delQs',views.delQs),
   path('api/admin/saveTest',views.saveTest),
   path('api/admin/tests',views.getTests),
   path('api/delres/<int:id>',views.deleteres),
]