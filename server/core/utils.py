from datetime import datetime

from django.utils.timezone import make_aware


def transform_date(date: str):
  """ Get the date in the format yyyy-mm-dd to a python date instance. """
  new_date = datetime.strptime(date, '%Y-%m-%d').date()

  return new_date
