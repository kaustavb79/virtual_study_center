from django.dispatch import Signal

# notify = Signal(providing_args=[  # pylint: disable=invalid-name
#     'actor', 'recipient',  'verb', 'action_object', 'target', 'description',
#     'timestamp', 'level', 'notification_type'
# ])

notify = Signal()


