from django.db.models import manager
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.views import APIView
from api.models import Questions,Options,Results,Subject
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt 
from django.contrib.auth.models import User
import datetime
from rest_framework.parsers import JSONParser
from .serializers import SubjectSerializer,QuestionSerializer 

@csrf_exempt
def subqs(request,subject=0):
   if request.method == 'GET': 
       a=[]
       b=[]
       c=[]
       sub =Subject.objects.get(id=subject)
       qs = Questions.objects.filter(subject=sub)
       for x in qs:
            aa={}
            aaOption=[]
            aa['ques']=x.title
            ans = Options.objects.filter(question=x)
            for asss in ans:
                aaaOpt={}
                aaaOpt['opt']=asss.title
                aaaOpt['mrks']=asss.marks
                aaOption.append(aaaOpt)
            
            aa['options']=aaOption
            if x.type==1:
                a.append(aa)
            elif x.type==2:
                b.append(aa)
            elif x.type==3:
                c.append(aa)
       return JsonResponse({'qs':sub.sub_qs,'time':sub.sub_time,'easy':a,'medium':b,'hard':c},safe=False)

# Create your views here.
def qs(request):
    a=[]
    c=[]
    b=[]
    if request.method =='GET':
        qs = Questions.objects.all()
        for x in qs:
            aa={}
            aaOption=[]
            aa['ques']=x.title
            ans = Options.objects.filter(question=x)
            for asss in ans:
                aaaOpt={}
                aaaOpt['opt']=asss.title
                aaaOpt['mrks']=asss.marks
                aaOption.append(aaaOpt)
            
            aa['options']=aaOption
            if x.type==1:
                a.append(aa)
            elif x.type==2:
                b.append(aa)
            elif x.type==3:
                c.append(aa)
            # print(a)
            # print(b)
            # print(c)

                
    return JsonResponse({'easy':a,'medium':b,'hard':c},safe=False)

class BlackListTokenView(APIView):
    permission_classes=[AllowAny]

    def post(self,request):
        try:
            refresh_token=request.data['refresh_token']
            token=RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def results(request,name):
    if request.method == 'POST':
        user = User.objects.get(username = name) 
        if(user):
            d = datetime.datetime.now()
            try:
                Results.objects.get(student = user).delete()
            except Results.DoesNotExist:    
                print('No previous entry')
            result = Results.objects.create(student = user,startTime = d.time())
            result.save()
            return JsonResponse("Result entry created",safe=False)
        else:
            return JsonResponse("User Doesn't exist",safe=False)  

@csrf_exempt        
def marks(request):
    if request.method == 'POST':
        data=JSONParser().parse(request)['data']
        d = datetime.datetime.now()
        user = User.objects.get(username = data['username'])
        if(user):
            result = Results.objects.get(student = user)
            if(result):
                result.endTime = d.time()
                result.marks = data['marks']
                result.save()
                return JsonResponse("Marks stored",safe=False)
            else:
                return JsonResponse("Restart Test",safe=False)    
        else:
            return JsonResponse("User Doesn't exist",safe=False)     
@csrf_exempt        
def addQs(request):
    if request.method == 'POST':
        data=JSONParser().parse(request)['data']
        f=Questions(title=data['question'],type=data['type'])
        f.save()
        optionData = {x: data[x] for x in data if 'option' in x}
        print(data)
        print(data['correctOpt'])
        print(optionData)
        
        for z in optionData:
            print(z)
            print(z==data['correctOpt'])
            if z==data['correctOpt']:
                if data['type']==str(1):
                    marks=1
                elif data['type']==str(2):
                    marks=2
                elif data['type']==str(3):
                    marks=5
            else:
                marks=0
            print(marks)
            ff=Options(question=f,marks=marks,title=optionData[z])
            ff.save()
        return JsonResponse("saved",safe=False)
        
 
        # d = datetime.datetime.now()
        # user = User.objects.get(username = data['username'])
        # if(user):
        #     result = Results.objects.get(student = user)
        #     if(result):
        #         result.endTime = d.time()
        #         result.marks = data['marks']
        #         result.save()
        #         return JsonResponse("Marks stored",safe=False)
        #     else:
        #         return JsonResponse("Restart Test",safe=False)    
        # else:
        #     return JsonResponse("User Doesn't exist",safe=False)     