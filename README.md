## White-label builder
Customized Android apps builder with scalability in mind

[Video Demonstration](https://youtu.be/bTh_kyXznEk?t=6029)
![Stack](https://i.ibb.co/ysfHqgh/stack.png)
Stack:
- [Centrifugo](https://centrifugal.github.io/centrifugo/) - [🐙](https://github.com/centrifugal/centrifugo) - Scalable real-time messaging server in language-agnostic way. Set up once and forever. Allow users of White-label builder to get build results faster.
- [Celery](https://docs.celeryproject.org/en/stable/) - [🐙](https://github.com/celery/celery) - Distributed Task Queue to scale build workers easily.
- [Redis](https://redis.io/) - [🐙](https://github.com/redis/redis) - In-memory database that persists on disk.
- [ReactJS](https://reactjs.org/) - [🛠️](https://stackshare.io/react) - [🐙](https://github.com/facebook/react) - A declarative, efficient, and flexible JavaScript library for building user interfaces.
- [Redux](https://redux.js.org/) - [🛠](https://stackshare.io/reduxjs) - [🐙](https://github.com/reduxjs/redux) - Predictable state container for JavaScript apps.
- [Django](https://www.djangoproject.com/) - [🛠](https://stackshare.io/django) - [🐙](https://github.com/django/django) - The Web framework for perfectionists with deadlines.
- [Webpack](https://webpack.js.org/) - [🛠️](https://stackshare.io/webpack) - [🐙](https://github.com/webpack/webpack) - A static module bundler for modern JavaScript applications.
- [Babel](https://babeljs.io/) - [🛠️](https://stackshare.io/babel) - [🐙](https://github.com/babel/babel) - A JavaScript compiler; use next generation JavaScript, today.
- [Node.js](https://nodejs.org/) - [🛠️](https://stackshare.io/nodejs) - [🐙](https://github.com/nodejs/node) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Material UI](https://material-ui.com/) - [🛠️](https://stackshare.io/material-ui) - [🐙](https://github.com/mui-org/material-ui) - React components that implement Google's Material Design.
- [Python](https://www.python.org/) - [🛠️](https://stackshare.io/python) - [🐙](https://github.com/python/cpython) - A programming language that lets you work quickly.

Usage:
- User customize app using web form and create build task
- Server emit task in queue for build workers
- Worker create build flavor, edit app resources and start gradle build
- After build user get QR code to download apk

Android App repo for this demo `materkey/white-label.git` is private because it provides Delivery Club API details. Reproducing apk build without android app repository require modifications to existing code. Making it universal solution for arbitrary app is a future plan.

## TODO: Containerize and fix vulnerabilities

## Not Quick Start Guide
1. `git clone git@github.com:materkey/white-label-builder.git` 
2. `cd white-label-builder/`
3. `virtualenv -p python3 env`
4. `source env/bin/activate`
5. `pip install -r requirements.txt`
6. `cd whitelabelbuilder/`
7. `npm install`
8. `npm run-script build` or `npm run-script start`
9. `cd ../` `mkdir white-label` `cd white-label` 
10. `git clone git@github.com:materkey/white-label.git`
11. `cd white-label`
12. `git checkout develop` and add secrets.xml to values folder of android project res in defaultFlavor
13. Change directory to `centrifugo/`
14. `./centrifugo genconfig`
15. Setup `django.conf` in root of project, create db for app and and copy centrifuge secret from `config.json` to `django.conf`  
16. `./centrifugo --config=config.json --insecure --web --admin --port=8081 --address=127.0.0.1`
17. In new terminal tab change dir to white-label-builder/whitelabelbuilder
18. `source ../env/bin/activate`
19. `celery -A whitelabelbuilder worker -l INFO -E`
20. In new tab keep directory to `white-label-builder/whitelabelbuilder/`
21. `source ../env/bin/activate`
22. `./manage.py migrate`
23. `./manage.py runserver`
24. To create task you have to be logged in through VK OAUTH2
