from django.db import models, transaction

from core.utils import transform_date

# Create your models here.

class Todo(models.Model):
  name = models.CharField(max_length=255, unique=True)
  cost = models.DecimalField(max_digits=11, decimal_places=2)
  due_date = models.DateField()
  order = models.IntegerField(unique=True)

  class Meta:
    ordering = ('order',)

  @classmethod
  def create(cls, name, cost, due_date):
    order = cls.objects.count()
    with transaction.atomic():
      todo = cls.objects.create(name=name, cost=cost, due_date=transform_date(due_date), order=order)
    return todo

  def move_upward(self):
    if self.order == 0:
      return self
    order = self.order
    prev_order = order - 1
    prev = Todo.objects.get(order=prev_order)
    with transaction.atomic():
      self.order = -1
      self.save(update_fields=['order'])
      prev.order = order
      prev.save(update_fields=['order'])
      self.order = prev_order
      self.save(update_fields=['order'])


    return self

  def move_downward(self):
    if self.order == Todo.objects.count():
      return self
    order = self.order
    next_order = order + 1
    next_todo = Todo.objects.get(order=next_order)
    with transaction.atomic():
      self.order = -1
      self.save(update_fields=['order'])
      next_todo.order = order
      next_todo.save(update_fields=['order'])
      self.order = next_order
      self.save(update_fields=['order'])

    return self

  def edit(self, name, cost, due_date):
    with transaction.atomic():
      self.name = name
      self.cost = cost
      self.due_date = due_date

      self.save(update_fields=['name', 'cost', 'due_date'])

    return self

  def pre_delete(self):
    order = self.order


    todos = Todo.objects.filter(order__gt=order)

    todos = sorted(todos, key=lambda t: t.order)

    with transaction.atomic():
      self.order = -1
      self.save()
      for t in todos:
        t.order -= 1
        t.save()
