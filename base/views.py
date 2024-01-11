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


@api_view(["GET"])
def getProduct(request, pk):
    for p in products:
        if p["_id"] == pk:
            product = p
            break

    return Response(product)
