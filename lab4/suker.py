import os.path
import os
import io
import re

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
from os.path import join, getsize


class BaseHandler(tornado.web.RequestHandler):
    def get_current_name(self):
        return self.get_secure_cookie("name")
 
    def get_current_section(self):
        return self.get_secure_cookie("selection")

    def get_current_creditcardnumber(self):
        return self.get_secure_cookie("creditCardNumber")
    def get_current_creditcard(self):
        return self.get_secure_cookie("creditCard")

class MainHandler(BaseHandler):
    def get(self):
        path=os.path.join(os.path.dirname(__file__), "static/")
        filepath=os.path.join(path, 'suckers.txt')
        files=open(filepath, 'r')
        self.render("sucker.html",
        name=self.get_current_name(),
        selection=self.get_current_section(),
        creditcardnumber=self.get_current_creditcardnumber(),
        creditCard=self.get_current_creditcard(),
        content=files.read()
        )
        files.close()
        files=open(filepath, 'a')
        files.write(self.get_current_name())
        files.write(";")
        section1=self.get_current_section()
        files.write(section1)
        files.write(";")
        creditcard1=self.get_current_creditcardnumber()
        files.write(creditcard1)
        files.write(";")
        creditcard2=self.get_current_creditcard()
        files.write(creditcard2)
        files.write("\n")
        files.close()

class LoginHandler(BaseHandler):
    def get(self):
        self.render("buyagrade.html")
    
    def post(self):
        self.set_secure_cookie("name", self.get_argument("name"))
        self.set_secure_cookie("selection", self.get_argument("selection"))
        self.set_secure_cookie("creditCardNumber", self.get_argument("creditCardNumber"))
        self.set_secure_cookie("creditCard", self.get_argument("creditCard"))
        cardnumber=self.get_argument("creditCardNumber")
        cardtype=self.get_argument("creditCard")
        if self.get_argument("creditCard") is None or self.get_argument("creditCardNumber") is None or self.get_argument("selection") == "(select a selections)" or self.get_argument("name") is None:
            self.redirect("/error")
        else:
            length=0
            if cardtype == "visa":
                if cardnumber[0] == '4':
                    pattern = re.compile(r'[\d]+')
                    st=pattern.findall(cardnumber)
                    for item in st:
                        length = length + len(item)
                if length != 16:
                    self.redirect("/error1")
                else:
                    self.redirect("/")
            elif cardtype == "mastercard":
                if cardnumber[0] == '5':
                    pattern = re.compile(r'[\d]+')
                    st=pattern.findall(cardnumber)
                    for item in st:
                        length = length + len(item)
                if length != 16:
                    self.redirect("/error1")
                else:
                    self.redirect("/")
            else:
                self.redirect("/error1")

class ErrorHandler(BaseHandler):
    def get(self):
        self.render("error.html")

class CardnumberInvalidHandler(BaseHandler):
    def get(self):
        self.render("error1.html")

application = tornado.web.Application(
    handlers=[
    (r"/", MainHandler),
    (r"/error1", CardnumberInvalidHandler),
    (r"/error", ErrorHandler),
    (r"/login", LoginHandler)
], 
   cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
   static_path=os.path.join(os.path.dirname(__file__), "static"),
   template_path=os.path.join(os.path.dirname(__file__), "templates"))

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
    