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

class info:
    def __init__(self, contentArr):
        self.title=contentArr[0]
        self.time=contentArr[1]
        self.reviewNum=contentArr[3]
        self.reviewPer=int(contentArr[2])

class review:
    def __init__(self, contentArr):
        self.company=contentArr[3]
        self.content=contentArr[0]
        self.writer=contentArr[2]
        self.reviewType=contentArr[1]

class generaloverview:
    def __init__(self, contentArr):
        self.theme=[];
        self.content=[];
        for colum in contentArr:
            self.theme.append(colum.split(':')[0])
            self.content.append(colum.split(':')[1])

class film:
    def __init__(self, info, reviewLeft, reviewRight, generaloverviewPicture, generaloverview):
        self.info=info
        self.reviewRight=reviewRight
        self.reviewLeft=reviewLeft
        self.generaloverview=generaloverview
        self.generaloverviewPicture=generaloverviewPicture
        

class BookHandler(tornado.web.RequestHandler):
    def get(self):
         film1=self.get_argument("film", 'None')
         path=os.path.join(os.path.dirname(__file__), "static/moviefiles/")
         filepath=os.path.join(path, film1)
         filenames=os.listdir(filepath)
         filenames.sort()
         reviewLastLeft=[]
         reviewLastRight=[]
         films=[]
         for i, filename in enumerate(filenames):
            if i == 0:
                films.append(filename)
            elif i == 1:
                films.append(generaloverview(open(os.path.join(filepath, filename)).read().splitlines()))
            elif i == 2:
                films.append(info(open(os.path.join(filepath, filename)).read().splitlines()))
            elif i >= 3 and i < (len(filenames) - 3) / 2 + 3:
                reviewLastLeft.append(review(open(os.path.join(filepath, filename)).read().splitlines()))
            else:
                reviewLastRight.append(review(open(os.path.join(filepath, filename)).read().splitlines()))

         films.append(reviewLastLeft)
         films.append(reviewLastRight)
         filmContent=film(films[2], films[3], films[4], films[0], films[1])
         self.render("skeleton.html", filmContent=filmContent, filepath=filepath)

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
