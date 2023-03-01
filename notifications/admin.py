''' Django notifications admin file '''
# -*- coding: utf-8 -*-
from django.contrib import admin
from .models import Notification


class NotificationAdmin(admin.ModelAdmin):
    raw_id_fields = ('recipient',)

    list_display = (
        'recipient',
        'actor',
        'verb',
        'level',
        'action_object',
        'target',
        'unread',
        'public',
        'timestamp'
    )

    list_filter = (
        'verb',
        'level',
        'unread',
        'public',
        'timestamp',
    )

    def get_queryset(self, request):
        qs = super(NotificationAdmin, self).get_queryset(request)
        return qs.prefetch_related('actor')


admin.site.register(Notification, NotificationAdmin)