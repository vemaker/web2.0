import os.path
import os
import io

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
from os.path import join, getsize

define("port", default=8000, help="run on the given port", type=int)

class file:
    def __init__(self, name, size):
        self.name=name
        if size < 1024:
            self.size = "%d b" % size
        elif size < 1024 * 1024:
            self.size = "%d kb" % (size / 1024)
        else:
            self.size = "%d mb" % (size / (1024 * 1024))

class BookHandler(tornado.web.RequestHandler):
    def get(self):
        songsMlink1=[];
        playlist=self.get_argument('playlist', 'None')
        path=os.path.join(os.path.dirname(__file__), "static/")
        if playlist is not 'None':
            f = open(os.path.join(path, playlist))
            for line in f.readlines():
                songsMlink1.append(line.strip())
            f.close()
        else:
            songsMlink1=[
                "Be More.mp3",
                "Drift Away.mp3",
                "Hello.mp3",
                "Panda Sneeze.mp3"
            ]
        music1=[];
        for music2 in songsMlink1:
            music1.append(file(music2, os.path.getsize(os.path.join(path, music2))))
        self.render(
            "music.html",
            isset=playlist,
            title="Music Viewer",
            header1="190M Music Playlist Viewer",
            header2="Search Through Your Playlists and Music",
            songsMlink=music1,
            songsPlink=[
                 "mypicks.txt",
                 "playlist.txt"
            ]
        )

if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[(r'/', BookHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static")
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
