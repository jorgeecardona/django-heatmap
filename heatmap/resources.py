from __future__ import absolute_import

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from .models import MouseEvent


class MouseEventResource(ModelResource):
    class Meta:
        queryset = MouseEvent.objects.all()
        resource_name = 'mouse-events'
        authorization = Authorization()
        always_return_data = True
