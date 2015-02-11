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

class MainHandler(tornado.web.RequestHandler):
	def get(self):
            path=os.path.join(os.path.dirname(__file__), "static/")
            filepath=os.path.join(path, 'singles.txt')
            files=open(filepath, 'r')
            temp1=files.read().splitlines()
            for item in temp1:
                smallitem=item.split(",")
                if smallitem[0] == self.get_secure_cookie("name"):
                    personal=smallitem
                    break
            suit=[]
            self.set_secure_cookie("name", "")
            temp=[]
            image=[]
            files1=os.path.join(os.path.dirname(__file__), "static/images")
            images=os.listdir(files1)
            count=0
            allsingles=temp1
            for item in allsingles:
                temp=item.split(',')
                count=0
                personalAge=int(personal[2])
                personalMinAge=int(personal[6])
                personalMaxAge=int(personal[7])
                tempAge=int(temp[2])
                tempMinAge=int(temp[6])
                tempMaxAge=int(temp[7])
                if personal[0] != temp[0]:
                    if personal[1] == "M":
                        if len(personal[5]) == 2:
                            if len(temp[5]) == 2 or (len(temp[5]) == 1 and temp[5] == "M"):
                                i=1
                            else:
                                continue
                        elif personal[1] == "M":
                            if temp[1] == "M" and (len(temp[5]) == 2 or temp[5] == "M"):
                                i=1
                            else:
                                continue
                        else:
                            if temp[1] == "F" and (len(temp[5]) == 2 or temp[5] == "M"):
                                i=1
                            else:
                                continue
                    if personal[1] == "F":
                        if len(personal[5]) == 2:
                            if len(temp[5]) == 2 or (len(temp[5]) == 1 and temp[5] == "F"):
                                i=1
                            else:
                                continue
                        elif personal[1] == "F":
                            if temp[1] == "F" and (len(temp[5] == 2 or temp[5] == "F")):
                                i=1
                            else:
                                continue
                        else:
                            if temp[1] == "M" and (len(temp[5]) == 2 or temp[5] == "F"):
                                i=1
                            else:
                                continue
                    if personalAge >= tempMinAge and personalAge <= tempMaxAge and tempAge <= personalMaxAge and tempAge >= personalMinAge:
                        count = count + 1
                    if personal[4] == temp[4]:
                        count = count + 2
                    for smallperson in personal[3]:
                        for smalltemp in temp[3]:
                            count = count + 1
                    if count >= 3:
                        personalname="default_user.jpg"
                        ispi1=temp[0].lower() + ".jpg"
                        j = 0
                        ispi=""
                        for i in ispi1:
                            if i == " ":
                                ispi = ispi + "_"
                            else:
                                ispi = ispi + i
                            j = j + 1
                        for imagesname in images:
                            if ispi == imagesname:
                                personalname=ispi
                                break;
                        temp.append(personalname)
                        temp.append(count)
                        suit.append(temp)
            files.close()
            self.render("results.html", suit=suit)



    


class LoginHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

    def post(self):
        age1=0
        age2=0
        age3=0
        nameforsignin=self.get_argument("nameForSignin")
        print nameforsignin
        if nameforsignin != "":
            coun1 = 0
            files=open("./static/singles.txt", 'r')
            self.set_secure_cookie("name", nameforsignin)
            temp2=files.read().splitlines()
            for item in temp2:
                smallitem=item.split(",")
                if smallitem[0] == nameforsignin:
                    coun1=1
                    break
            if coun1 == 1:
                self.redirect("/result")
            else:
                self.set_secure_cookie("name", "")
                self.redirect("/error")
        else:
            name=self.get_argument("name")
            gender=self.get_argument("gender")
            age=self.get_argument("age")
            personality=self.get_argument("personality")
            os=self.get_argument("favoriteOS")
            seeking=self.get_arguments("seeking")
            ageMin=self.get_argument("ageMin")
            ageMax=self.get_argument("ageMax")
            age1=int(age)
            age2=int(ageMin)
            age3=int(ageMax)
            if name is not None and age1 > 0 and age1 < 99 and (personality[0] == "I" or personality[0] == "E") and (personality[1] == "N" or personality[1] == "S") and (personality[2] == "F" or personality[2] == "T") and (personality[3] == "J" or personality[3] == "P") and len(seeking) >= 1 and age2 > 0 and age3 < 99:
                 self.set_secure_cookie("name", self.get_argument("name"))
                 files=open("./static/singles.txt", 'a')
                 files.write(name)
                 files.write(",")
                 files.write(gender)
                 files.write(",")
                 files.write(age)
                 files.write(',')
                 files.write(personality)
                 files.write(",")
                 files.write(os)
                 files.write(",")
                 if len(seeking) == 1:
                    files.write(seeking[0])
                    files.write(",")
                 if len(seeking) == 2:
                    files.write(seeking[0])
                    files.write(seeking[1])
                    files.write(",")
                 files.write(ageMin)
                 files.write(",")
                 files.write(ageMax)
                 files.write("\n")
                 files.close()
                 self.redirect("/result")
            else:
                self.redirect("/error")


class ErrorHandler(tornado.web.RequestHandler):
	def get(self):
		self.render("error.html")

application = tornado.web.Application(
    handlers=[
    (r"/result", MainHandler),
    (r"/register", LoginHandler),
    (r"/error", ErrorHandler)
], 
   cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
   static_path=os.path.join(os.path.dirname(__file__), "static"),
   template_path=os.path.join(os.path.dirname(__file__), "templates"))

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()