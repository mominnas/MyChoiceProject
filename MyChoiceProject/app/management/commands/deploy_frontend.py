from django.core.management.base import BaseCommand
from django.conf import settings
import shutil
import os

class Command(BaseCommand):
    help = 'Copy frontend build files into Django static/templates directories for production serve'

    def handle(self, *args, **options):
        base = settings.BASE_DIR
        build_dir = os.path.join(base, 'frontend', 'build')
        if not os.path.exists(build_dir):
            self.stdout.write(self.style.ERROR('Frontend build directory not found: %s' % build_dir))
            return

        # Copy index.html into templates root (frontend build is in TEMPLATES DIRS)
        target_index = os.path.join(base, 'frontend', 'build', 'index.html')
        if os.path.exists(target_index):
            self.stdout.write(self.style.SUCCESS('Index found: %s' % target_index))

        # Copy static files into STATIC_ROOT (optional)
        static_src = os.path.join(build_dir, 'static')
        static_dst = settings.STATIC_ROOT
        if os.path.exists(static_src):
            if os.path.exists(static_dst):
                self.stdout.write('Removing existing static root: %s' % static_dst)
                shutil.rmtree(static_dst)
            shutil.copytree(static_src, os.path.join(static_dst, 'static'))
            self.stdout.write(self.style.SUCCESS('Copied static files to %s' % static_dst))
        else:
            self.stdout.write(self.style.WARNING('No static directory in build'))

        self.stdout.write(self.style.SUCCESS('Frontend deploy completed.'))
