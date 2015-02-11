# -*- coding: utf-8 -*-
import os.path
import os
import io
import re
import sys

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
from os.path import join, getsize


from tornado.options import define, options

reload(sys)
sys.setdefaultencoding('utf-8')
define("port", default=8000, help="run on the given port", type=int)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
    	self.render("signinup.html",
    		title="singup-SegmentFault",
    		h1="sign up for new user",
    		do="signup",
    		do1="signin",
    		do2="login"
    		)
    def post(self):
     	name=self.get_argument("name")
     	password=self.get_argument("password")
     	if name == "" or password == "":
     		self.redirect("/signup")
     	else:
     		count = 0
     		files=open("./static/userData/users.txt", 'r').read().splitlines()
     		for line in files:
     			temp=line.split(",")
     			if temp[0] == name:
     				count = 1
     				break
     		if count==1:
     			self.redirect("/signup")
     		else:
     			user=open("./static/userData/users.txt", 'a')
     			user.write(name)
     			user.write(",")
     			user.write(password)
     			user.write("\n")
     			self.set_secure_cookie("name", self.get_argument("name"))
     			self.redirect("/")

class LoginHandler(tornado.web.RequestHandler):
	def get(self):
	        isLogin=self.get_secure_cookie("name")
	        if isLogin != "":
	        	print isLogin
	        	self.redirect("/")
	        else:
				self.render("signinup.html",
		    		title="singin-SegmentFault",
		    		h1="sign in to SegmentFault",
		    		do="sign in",
		    		do1="signup",
		    		do2="signup"
		    		)
	def post(self):
	     	name=self.get_argument("name")
	     	password=self.get_argument("password")
	     	if name == "" or password == "":
	     		self.redirect("/login")
	     	else:
	     		count = 0
	     		files=open("./static/userData/users.txt", 'r').read().splitlines()
	     		for line in files:
	     			temp=line.split(",")
	     			if temp[0] == name:
	     				count = 1
	     				break
	     		if count==1:
	     			self.set_secure_cookie("name", self.get_argument("name"))
	     			self.redirect("/")
	     		else:
	     			self.redirect("/login")

class MainHandler(tornado.web.RequestHandler):
	def get(self):
		name=self.get_secure_cookie("name")
		content=open("./static/questionData/questions.txt", 'r').read().splitlines()
		contents=[]
		for item in content:
			temp=item.split(";")
			contents.append(temp)
		self.render("index.html",
            name1=name,
            content1=contents
			)

class AskHandler(tornado.web.RequestHandler):
	def get(self):
		self.render("ask.html",
			title="提出问题",
			name=self.get_secure_cookie("name")
			)
	def post(self):
		pattern = re.complie(r'[A-Za-z1-9]+\,')
		tag=pattern.findall(tag)
		title=self.get_argument("title")
		tags=self.get_argument("tags")
		content=self.get_argument("contents")
		if title == "" or tags == "" or content == "":
			self.redirect("/ask")


class LogoutHandler(tornado.web.RequestHandler):
	def get(self):
		self.set_secure_cookie("name", "")
		self.redirect("/login")


if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application(handlers=[
    	(r"/signup", IndexHandler),
        (r"/", MainHandler),
    	(r"/login", LoginHandler),
    	(r"/ask", AskHandler),
    	(r"/logout", LogoutHandler)
    	],
    	cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        template_path=os.path.join(os.path.dirname(__file__), "template")
    	)
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()