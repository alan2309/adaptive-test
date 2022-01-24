from django.db.models import manager
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.views import APIView
from api.models import Questions,Options,Results,Subject,Test
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
            aa['id']=x.id
            ans = Options.objects.filter(question=x)
            for asss in ans:
                aaaOpt={}
                aaaOpt['opt']=asss.title
                aaaOpt['id']=asss.id
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
@csrf_exempt
def subs(request):
    if request.method == 'GET':
        f={}
        subs=Subject.objects.all()
        for sub in subs:
            f[sub.sub_name]={}
            f[sub.sub_name]['easy']=[]
            f[sub.sub_name]['medium']=[]
            f[sub.sub_name]['hard']=[]
            f[sub.sub_name]['qs']=sub.sub_qs
            f[sub.sub_name]['time']=sub.sub_time
        qs=Questions.objects.all()
        for q in qs:
            a={}
            a['ques']=q.title
            a['id']=q.id
            a['options']=[]
            opts=Options.objects.filter(question=q)
            for opt in opts:
                o={}
                o['opt']=opt.title
                o['id']=opt.id
                o['mrks']=opt.marks
                a['options'].append(o)
            if q.type==1:
                f[str(q.subject)]['easy'].append(a)
            if q.type==2:
                f[str(q.subject)]['medium'].append(a)
            elif q.type==3:
                f[str(q.subject)]['hard'].append(a)
    return JsonResponse({'data':f},safe=False)


    

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
            result = Results.objects.create(student = user,startTime = d.time(),
            marks={"ap":0,'cf':0,'c':0,'d':0,'p':0,'a':0,'apMax':[],'cfMax':[],'cMax':[],'dMax':[],'pMax':[],'aMax':[],'apGot':[],'cfGot':[],'cGot':[],'dGot':[],'pGot':[],'aGot':[]}
            )
            result.save()
            return JsonResponse("Result entry created",safe=False)
        else:
            return JsonResponse("User Doesn't exist",safe=False) 

@csrf_exempt        
def marks(request,sid=0):
    if request.method == 'POST':
        data=JSONParser().parse(request)['data']
        sid = int(sid)
        d = datetime.datetime.now()
        user = User.objects.get(username = data['username'])
        if(user):
            result = Results.objects.get(student = user)
            
            if(result):
                if sid == 1:
                   result.marks['ap'] = data['marks']
                   result.marks['apMax'] = data['maxMarks']
                   result.marks['apGot'] = data['gotMarks']
                   print('.................')
                   print(data['maxMarks'])
                   print('.................')
                elif sid == 2:
                    result.marks['cf'] = data['marks']
                    result.marks['cfMax'] = data['maxMarks']
                    result.marks['cfGot'] = data['gotMarks']
                elif sid == 3:
                    result.marks['c'] = data['marks']
                    result.marks['cMax'] = data['maxMarks']
                    result.marks['cGot'] = data['gotMarks']
                elif sid == 4:
                    result.marks['d'] = data['marks']
                    result.marks['dMax'] = data['maxMarks']
                    result.marks['dGot'] = data['gotMarks']
                elif sid == 5:
                    result.marks['p'] = data['marks']
                    result.marks['pMax'] = data['maxMarks']
                    result.marks['pGot'] = data['gotMarks']
                elif sid == 6:
                    result.marks['a'] = data['marks'] 
                    result.marks['aMax'] = data['maxMarks']
                    result.marks['aGot'] = data['gotMarks']
                    
                else:
                    print('**error**')
                    return JsonResponse("Error",safe=False)
                result.endTime = d.time()
                result.save()
                return JsonResponse({'resultMarks':result.marks,'startTime':result.startTime,'endTime':result.endTime,'student':result.student.username},safe=False)
            else:
                return JsonResponse("Restart Test",safe=False)
        else:
            return JsonResponse("User Doesn't exist",safe=False)  
@csrf_exempt        
def addQs(request):
    if request.method == 'POST':
        data=JSONParser().parse(request)['data']
        print(data)
        if data['action']=='Save':
            f=Questions(subject=Subject.objects.get(sub_name=data['sectionName']),title=data['questionNew'],type=data['type'])
            f.save()
              
        elif data['action']=='Update':
            print('update')
            qData = {x: data[x] for x in data if 'question' in x}
            print(qData)
            for qs in qData:
                f=Questions.objects.get(id=qs.split('question')[1])
                f.title=qData[qs]
                f.save()

                print(f)
                print(qData[qs])
                Options.objects.filter(question=f).delete()
        optionData = {x: data[x] for x in data if 'Option' in x}
        print(data)
        for z in optionData:
            print(z)
            print(z==data['rightOpt'])
            if z==data['rightOpt']:
                if data['type']==1:
                    marks=1
                elif data['type']==2:
                    marks=2
                elif data['type']==3:
                    marks=5
            else:
                marks=0
            print(marks)
            ff=Options(question=f,marks=marks,title=optionData[z])
            ff.save()
        return JsonResponse("Done",safe=False) 

@csrf_exempt
def delQs(request):
    if request.method == 'POST':
        data=JSONParser().parse(request)['delQs']
        print(data)
        for x in data:
            Questions.objects.get(id=x).delete()
        return JsonResponse('success',safe=False)
@csrf_exempt
def saveTest(request):
    if request.method == 'POST':
        data=JSONParser().parse(request)['saveTest']
        print(data)
        print('---------------')
        print(data[0]['sub'])
        print('---------------')

        for x in range(0,len(data)):
            b=Subject.objects.get(sub_name=data[x]['sub'])
            b.sub_qs=data[x]['totalQs']
            b.sub_time=data[x]['time']
            b.save()
        return JsonResponse('success',safe=False)

@csrf_exempt
def tests(request):
    if request.method == 'GET':
        d = datetime.datetime.now()
        if(Test.objects.filter(test_start__lte = d,test_end__gte=d)):
            return JsonResponse(1,safe=False)
        else:
            return JsonResponse(0,safe=False)    

    if request.method == 'POST':
        data=JSONParser().parse(request)['data']
        # test = Test.objects.create(test_name =data['name'],test_start=data['start'],test_end=data['end'])
        test = Test.objects.create(test_name=data['name'],test_start = datetime.datetime.now(),test_end=datetime.datetime.now())
        test.save()
        return JsonResponse('Created',safe=False)
