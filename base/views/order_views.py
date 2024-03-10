from ..models import Product, Order, OrderItem, ShippingAddress
from ..serializers import ProductSerializer,OrderSerializer
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from datetime import datetime

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'error:No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else :
        #(1) Create Order
        order = Order.objects.create(
            user = user,
            paymentMethod=data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
            
        )
        #(2) Create Shipping Address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalcode'],
            country=data['shippingAddress']['country']
        )
        #(3) Create order items and set order to OrderItem Relationship
        for item in orderItems:
            product = Product.objects.get(_id=item['product'])
            
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=item['qty'],
                price=item['price'],
                image=product.image.url
            )
        #(4) update the countInStock
        product.countInStock -= item.qty
        product.save()
        
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request) :
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request) :
    
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk) : 
    
    user = request.user
    
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user :
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else :
            Response({'error' : 'Not authorized to view the order'}, status=status.HTTP_401_UNAUTHORIZED)
    except:
        return Response({'detail': 'Order does not exists'},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def updateOrderToPaid(request,pk) :
    order = Order.objects.get(_id=pk)
    
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    
    return Response('Order was paid')
    