from django.db import models


class MouseEvent(models.Model):
    " Track the mouse events."

    #: X-Coordinate.
    x = models.IntegerField(null=True, default=None)

    #: Y-Coordinate.
    y = models.IntegerField(null=True, default=None)

    #: Click?
    is_click = models.BooleanField(default=False)

    #: Timestamp.
    timestamp = models.DateTimeField(null=True, default=None)
        
    
