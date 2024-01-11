from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .products import products


# Create your views here.
@api_view(["GET"])
def getRoutes(request):
    return Response("Welcome to E-commerce BackEnd")


@api_view(["GET"])
def getProducts(request):
    return Response(products)
