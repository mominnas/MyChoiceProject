from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Item
from .serializers import ItemSerializer
from django.shortcuts import get_object_or_404


class ItemViewSet(viewsets.ViewSet):
    """Simple ViewSet implementing list, create, retrieve, partial_update, and destroy"""

    def list(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            item = serializer.save()
            return Response(ItemSerializer(item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        item = get_object_or_404(Item, pk=pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        item = get_object_or_404(Item, pk=pk)
        serializer = ItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            item = serializer.save()
            return Response(ItemSerializer(item).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        item = get_object_or_404(Item, pk=pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
