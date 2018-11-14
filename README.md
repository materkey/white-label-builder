## Not Quick Start Guide
1. `git clone https://github.com/materkey/white-label-builder.git`
2. `virtualenv -p python3 env`
3. `source env/bin/activate`
4. `pip install -r requirements.txt`
5. `npm install`
6. `npm run-script start`
7. In new terminal tab `celery -A whitelabelbuilder worker -l INFO -E`
8. Setup `django.conf` in root of project, and create db for app
9. `mkdir white-label`
10. `cd white-label`
11. `git clone https://github.com/materkey/white-label.git`
12. `git checkout develop`
13. `cd ../`
14. Create new terminal tab for centrifugo
15. `wget https://github.com/centrifugal/centrifugo/releases/download/v1.8.0/centrifugo-1.8.0-linux-amd64.zip`
16. `unzip centrifugo-1.8.0-linux-amd64.zip`
17. `cd centrifugo-1.8.0-linux-amd64/`
18. `./centrifugo genconfig` and write centrifuge secret from `config.json` to `django.conf`
19. `./centrifugo --config=config.json --insecure --web --admin --port=8081 --address=127.0.0.1`
20. run `./manage.py runserver` in `white-label-builder/whitelabelbuilder/`
