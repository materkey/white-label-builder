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
