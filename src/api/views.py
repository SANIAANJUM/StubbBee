from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import User, Buyer, Seller, Transporter
# Create your views here.

class SignUp(APIView):
    permission_classes = (AllowAny,)
    def post(self, request, *args, **kwargs):
        qs = User.objects.filter(email=request.data["email"])
        if not qs:
            ob = User.objects.create_user(
                username = request.data["email"],
                email=request.data["email"],
                password=request.data["password"],
                first_name=request.data["first_name"],
                last_name=request.data["last_name"]
            )
            if request.data["category"] == "seller":
                o = Seller(owner=ob)
                o.save()
            elif request.data["category"] == "buyer":
                o = Buyer(owner=ob)
                o.save()
            else:
                o = Transporter(owner=ob)
                o.save()
            return Response({'status':'created'})
        else:
            if request.data["category"] == "seller":
                ob = Seller.objects.filter(owner=qs[0])
                if ob:
                    return Response({'status':'exists'})
                else:
                    o = Seller(owner=qs[0])
                    o.save()
                return Response({'status':'created'})
            elif request.data["category"] == "buyer":
                ob = Buyer.objects.filter(owner=qs[0])
                if ob:
                    return Response({'status':'exists'})
                else:
                    o = Buyer(owner=qs[0])
                    o.save()
                return Response({'status':'created'})
            else:
                ob = Transporter.objects.filter(owner=qs[0])
                if ob:
                    return Response({'status':'exists'})
                else:
                    o = Transporter(owner=qs[0])
                    o.save()
                return Response({'status':'created'})

class Logout(APIView):
    def post(self, request, *args, **kwargs):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class UserData(APIView):
    def get(self, request, *args, **kwargs):
        return Response({
            'first_name' : request.user.first_name,
            'last_name' : request.user.last_name,
            'email' : request.user.email,
        })