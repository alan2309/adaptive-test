from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.views import APIView
from api.models import Questions,Options,Results,Subject,Test,CodingTest,Para,Paraopt,Paraqs
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt 
from django.contrib.auth.models import User
import datetime
from rest_framework.parsers import JSONParser
import random
from .serializers import CodingTestSerializer, SubjectSerializer,QuestionSerializer, TestSerializer ,ResultSerializer,OptionSerializer
import math
from django.db.models import Q

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
    user = User.objects.get(username = name) 
    if request.method == 'POST':
        data=JSONParser().parse(request)['data']
        if(user):
            d = datetime.datetime.now()
            try:
                if name != 'a':
                    rr=Results.objects.get(student = user,test=Test.objects.get(id=data['testId']))
                    if rr:
                        return JsonResponse({'resultExists':True},safe=False)
            except Results.DoesNotExist:
                print('No previous entry')
            result = Results.objects.create(student = user,startTime = d.time(),test=Test.objects.get(id=data['testId']),
            marks={"ap":0,'cf':0,'c':0,'d':0,'p':0,'a':0,'apMax':[],'cfMax':[],'cMax':[],'dMax':[],'pMax':[],'aMax':[],'apGot':[],'cfGot':[],'cGot':[],'dGot':[],'pGot':[],'aGot':[]}
            )
            result.save()
            return JsonResponse({'resultExists':False},safe=False)
        else:
            return JsonResponse("User Doesn't exist",safe=False)
    elif request.method=='GET':
        if user:
            testId=request.GET.get('testId')
            data=chartData(user,testId)
            
            return JsonResponse(data,safe=False)

def chartData(user,testId=-1):
    totalQs=0
    subs=Subject.objects.all()
    a=[]
    aa={}
    mrksScored=[]
    mrksScoredPercent=[]
    for sub in subs:
        totalQs+=sub.sub_qs
        avgMarks=sub.sub_qs*2*0.7 # 70% average
        avgMarks=math.ceil(avgMarks)
        aa[sub.sub_name]=avgMarks
    a=[aa['Aptitude'],aa['Computer Fundamentals'],aa['Domain'],aa['Personality'],aa['Coding'],aa['Analytical Writing']]
    try:
        resl=Results.objects.get(student = user,test=Test.objects.get(id=testId))
        apMax=1
        cfMax=1
        dMax=1
        pMax=1
        aMax=1
        cMax=1
        print('-----------')
        if(sum(resl.marks['apMax'])>0):
            apMax=sum(resl.marks['apMax'])
        if(sum(resl.marks['cfMax'])>0):
            cfMax=sum(resl.marks['cfMax'])
        if(sum(resl.marks['dMax'])>0):
            dMax=sum(resl.marks['dMax'])
        if(sum(resl.marks['pMax'])>0):
            pMax=sum(resl.marks['pMax'])
        if(sum(resl.marks['cMax'])>0):
            cMax=sum(resl.marks['cMax'])
        if(sum(resl.marks['aMax'])>0):
            aMax=sum(resl.marks['aMax'])
        mrksScoredPercent=[round((resl.marks['ap']/apMax)*100,2),round((resl.marks['cf']/cfMax)*100,2),round((resl.marks['d']/dMax)*100,2),round((resl.marks['p']/pMax)*100,2),round((resl.marks['c']/cMax)*100,2),round((resl.marks['a']/aMax)*100,2)]
        mrksScored=[resl.marks['ap'],resl.marks['cf'],resl.marks['d'],resl.marks['p'],resl.marks['c'],resl.marks['a']]
        FMT = '%H:%M:%S'
        s1 = "{}:{}:{}".format(str(resl.endTime.hour),str(resl.endTime.minute),str(resl.endTime.second))
        s2 = "{}:{}:{}".format(str(resl.startTime.hour),str(resl.startTime.minute),str(resl.startTime.second))
        tdelta = datetime.datetime.strptime(str(s1), FMT) - datetime.datetime.strptime(str(s2), FMT)

        print(tdelta.seconds)
    except Results.DoesNotExist:
        print('No previous entry')
        resl=0
    return {'startTime':resl.startTime,'endTime':resl.endTime,'marks':resl.marks,'totalQs':totalQs,'avgMarksArr':a,'mrksScored':mrksScored,'mrksScoredPercent':mrksScoredPercent,'totalMarksScored':sum(mrksScored),'timeTaken':tdelta.seconds}

@csrf_exempt
def resultTest(request,id):
    testData=Results.objects.filter(test=Test.objects.get(id=id))
    a={}
    a=ResultSerializer(testData,many=True)
    
    cc=[]
    for x in a.data:
        c={}
        print(x)
        c['name']=User.objects.get(id=x['student']).username
        c['sdate']=x['startTime'].split('.')[0]
        c['edate']=x['endTime'].split('.')[0]
        c['marks']=x['marks']['ap']+x['marks']['cf']+x['marks']['c']+x['marks']['d']+x['marks']['p']+x['marks']['a']
        cc.append(c)

    return JsonResponse({'testData':a.data,'studentNameArr':cc},safe=False)


@csrf_exempt        
def marks(request,sid=0):
    if request.method == 'POST':
        data=JSONParser().parse(request)['data']
        sid = int(sid)
        d = datetime.datetime.now()
        user = User.objects.get(username = data['username'])
        if(user):
            result = Results.objects.get(student = user,test=Test.objects.get(id=data['testId']))
            
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
                data=chartData(user,data['testId'])
                return JsonResponse(data,safe=False)
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
        data=JSONParser().parse(request)['data']
        print(data['saveTest'])
       
        print('##################')
        print(data['createTest'])
        
        print('##################')
       
        tst=Test(test_name=data['createTest']['testName'],test_start=data['createTest']['sTime'],test_end=data['createTest']['eTime'])
        print(tst.test_start)
        tst.save()
        print('---------------')

        for x in range(0,len(data['saveTest'])):
            b=Subject.objects.get(sub_name=data['saveTest'][x]['sub'])
            b.sub_qs=data['saveTest'][x]['totalQs']
            b.sub_time=data['saveTest'][x]['time']
            b.save()
        return JsonResponse('success',safe=False)

@csrf_exempt
def tests(request):
    if request.method == 'GET':
        d = datetime.datetime.now()
        ll=Test.objects.filter(test_start__lte = d,test_end__gte=d)
        if(ll.exists()):
            return JsonResponse({'testId':ll[0].id},safe=False)
        else:
            return JsonResponse({'testId':-1},safe=False)    

    elif request.method == 'POST':
        data=JSONParser().parse(request)['data']
        if not data['delete']:
            if not data['update']:
                test = Test.objects.create(test_name =data['name'],test_start=data['start'],test_end=data['end'])
                test.save()
            else:
                test=Test.objects.get(id=data['id'])
                test.test_name=data['name']
                test.test_start=data['start']
                test.test_end=data['end']
                test.save()
        else:
            Test.objects.get(id=data['id']).delete()
        return JsonResponse('Created',safe=False)
        
def getTests(request):
    if request.method == 'GET':
        d = datetime.datetime.now()
        stests = Test.objects.filter(Q(test_end__lte=d) | Q(test_start__lt=d))
        utests = Test.objects.filter(test_start__gt=d) 
        print(stests)
        stestS = TestSerializer(stests,many=True)
        utestS = TestSerializer(utests,many=True)
        return JsonResponse({"stests":stestS.data,"utests":utestS.data},safe=False)



def getCodingTests(request):
    if request.method == 'GET':
        t1=CodingTestSerializer(CodingTest.objects.filter(type=1),many=True).data
        t2=CodingTestSerializer(CodingTest.objects.filter(type=2),many=True).data
        t3=CodingTestSerializer(CodingTest.objects.filter(type=3),many=True).data
        itemsType1={}
        itemsType2={}
        itemsType3={}
        if len(t1)>0:
            itemsType1=CodingTest.objects.get(id=list(random.sample(t1,1)[0].items())[0][1])
            itemsType1=CodingTestSerializer(itemsType1).data
        if len(t2)>0:
            itemsType2=CodingTest.objects.get(id=list(random.sample(t2,1)[0].items())[0][1])
            itemsType2=CodingTestSerializer(itemsType2).data
        if len(t3)>0:
            itemsType3=CodingTest.objects.get(id=list(random.sample(t3,1)[0].items())[0][1])
            itemsType3=CodingTestSerializer(itemsType3).data
        sub =Subject.objects.get(id=6)
        return JsonResponse({'time':sub.sub_time,'cQs':[itemsType1,itemsType2,itemsType3]},safe=False)

def comprehension(request):
    if request.method == 'GET':
        sub = Subject.objects.get(id=5)
        paras = Para.objects.order_by('?')[:3]
        f=[]
        for para in paras:
            x={}
            x['title'] = para.title
            x['para'] = para.data
            questions = Paraqs.objects.filter(para=para)
            qs = []
            for question in questions:
                op={}
                options = Paraopt.objects.filter(paraqs=question)
                op['question'] = question.title
                op['options'] =OptionSerializer(options,many=True).data
                qs.append(op)
            x['questions'] = qs 
            f.append(x)    
        return JsonResponse({'data':f,'time':sub.sub_time},safe=False)   
