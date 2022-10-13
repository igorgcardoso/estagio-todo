from django.urls import path

from .views import move, todos, todos_

urlpatterns = [
  path('todos/', todos),
  path('todos/<int:id>/', todos_),
  path('todos/<int:id>/', move),
]
