from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer, OrderItemSerializer 
from django.contrib.auth import authenticate
    
class OrderCreateView(APIView):

    def post(self, request):
        serializer = SessionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=int (status.HTTP_201_CREATED)
            )
        return Response(
            serializer.errors,
            status=int (status.HTTP_400_BAD_REQUEST)
        )
    
    def get(self, request):

        sessions = Session.objects.all()

        movie_id = request.query_params.get ("movie")

        if movie_id: 
            sessions = sessions.filter (movie_id=movie_id)

        serializer = SessionSerializer(sessions, many=True)

        return Response(serializer.data)
    
class OrderItemCreateView(APIView):

    def post(self, request):
        ticket = TicketSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=int (status.HTTP_201_CREATED)
            )
        return Response(
            serializer.errors,
            status=int (status.HTTP_400_BAD_REQUEST)
        )
    
    def get(self, request):

        tickets = Ticket.objects.all()

        serializer = TicketSerializer(tickets, many=True)

        return Response(serializer.data)
    
class OrderItemView(APIView):
    
    def get(self, request, session_id):

        tickets = Ticket.objects.filter(session_id=session_id)

        occupied =[]

        for ticket in tickets:
            occupied.append({
                "row": ticket.row,
                "seat": ticket.seat
            })

        return Response({
            "rows": 5,
            "seat_per_row": 6,
            "occupied": occupied
        })

    
class ProductCreateView(APIView):

    def post(self, request):
        serializer = MovieSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=int (status.HTTP_201_CREATED)
            )
        return Response(
            serializer.errors,
            status=int (status.HTTP_400_BAD_REQUEST)
        )
    
    def get(self, request):
        movies = Movie.objects.all()

        serializer = MovieSerializer(movies, many=True)

        return Response(serializer.data)
