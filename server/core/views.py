from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.request import Request
from rest_framework.response import Response

from core.models import Todo
from core.serializers import TodoSerializer

# Create your views here.


def index(request: Request) -> Response:
  todos = Todo.objects.all()

  return Response(TodoSerializer(todos, many=True).data)


def create(request: Request) -> Response:
  data = request.data

  if 'due_date' not in data.keys():
    try:
      data['due_date'] = data.get('dueDate')
      del data['dueDate']
    except KeyError:
      raise ValidationError('Campo de data faltando.')

  todo = Todo.create(**data)

  return Response(TodoSerializer(todo).data, 201)

def delete(request: Request, id: int) -> Response:
  try:
    todo = Todo.objects.get(id=id)
  except Todo.DoesNotExist:
    raise NotFound(detail=f'ToDo não encontrado')

  todo.pre_delete()
  todo.delete()

  return Response(status=204)

def update(request: Request, id: int) -> Response:
  data = request.data

  if 'due_date' not in data.keys():
    try:
      data['due_date'] = data.get('dueDate')
      del data['dueDate']
    except KeyError:
      raise ValidationError('Campo de data faltando.')

  try:
    todo = Todo.objects.get(id=id)

    todo.edit(**data)
  except Todo.DoesNotExist:
    raise NotFound(detail='ToDo não encontrado')

  return Response(TodoSerializer(todo).data)

def move(request: Request, id: int) -> Response:

  direction = request.GET.get('move', '')

  try:
    todo = Todo.objects.get(id=id)
  except Todo.DoesNotExist:
    raise NotFound(detail='ToDo não encontrado')

  if direction == 'up':
    todo.move_upward()
  elif direction == 'down':
    todo.move_downward()
  else:
    raise ValidationError(detail='Não foi possível mover o todo.')

  return Response(TodoSerializer(todo).data)


@api_view(['GET', 'POST'])
def todos(request: Request) -> Response:
  if request.method == 'GET':
    return index(request)
  elif request.method == 'POST':
    return create(request)

@api_view(['DELETE', 'PUT', 'POST'])
def todos_(request: Request, id: int) -> Response:
  if request.method == 'DELETE':
    return delete(request, id)
  elif request.method == 'PUT':
    return update(request, id)
  elif request.method == 'POST':
    return move(request, id)
