from django.shortcuts import render
from django.http import HttpResponse
import os

def main(request):
    return render(request, 'items/main.html')



def items(request):
    module_dir = os.path.dirname(__file__)
    file_path = os.path.join(module_dir, 'items.json')
    items = open(file_path, 'r')
    return HttpResponse(items, mimetype='application/json')
