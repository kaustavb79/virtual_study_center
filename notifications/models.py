from swapper import swappable_setting
from django.db import models


from .base.models import AbstractNotification, notify_handler  # noqa


class Notification(AbstractNotification):

    # custom field example
    # type = models.ForeignKey('myapp.Category', on_delete=models.CASCADE)

    notification_type = models.CharField(max_length=30, blank=True, null=True)


    class Meta(AbstractNotification.Meta):
        abstract = False
        swappable = swappable_setting('notifications', 'Notification')