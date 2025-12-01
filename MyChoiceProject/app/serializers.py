from rest_framework import serializers
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["id", "name", "group", "created_at", "updated_at"]

    def validate(self, data):
        # Ensure name uniqueness within group
        name = data.get("name", None)
        group = data.get("group", None)
        # When updating, instance will exist
        instance = getattr(self, "instance", None)
        if name and group:
            qs = Item.objects.filter(name=name, group=group)
            if instance:
                qs = qs.exclude(pk=instance.pk)
            if qs.exists():
                raise serializers.ValidationError(
                    "An item with this name already exists in the specified group."
                )
        return data
