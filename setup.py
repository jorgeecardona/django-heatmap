from setuptools import setup

setup(
    name='django-heatmap', 
    description="Django app that track mouse hover and clicks",
    version='0.1',
    author="Jorge E. Cardona", 
    author_email="jorge@cardona.co",    
    packages=['heatmap'],
    install_requires=['django-tastypie']
)
