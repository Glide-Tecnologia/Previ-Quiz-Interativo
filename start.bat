@REM @echo off

timeout /T 10
timeout /T 10

taskkill /F /IM explorer.exe

timeout /T 5

cd C:\laragon\www\api
start /b pm2 start servidor.js

cd C:\laragon\www\configuracao\app 
start /b fecharApp.exe

cd "C:\Program Files (x86)\Google\Chrome\Application"
start /b chrome --kiosk --disable-component-update --safebrowsing-disable-auto-update --disable-notifications --disabled-new-style-notification --ash-hide-notifications-for-factory --start-maximized --disable-backing-store-limit --enable-audio-focus --enable-media-suspend --process-per-tab --windows10-custom-titlebar --disable-pinch --overscroll-history-navigation=0 file:///C:/laragon/www/carregar.html

cd C:\laragon\www\quiz
npm start

pause


@REM pm2 status
@REM pm2 stop my-app
@REM pm2 start npm --name "Memoria" 
@REM pm2 start npm --name "my-memo" -- start
@REM npm install -g pm2

@REM pm2 --version
@REM pm2 start app.js
@REM pm2 list
@REM pm2 stop 0
@REM pm2 restart <app_id>
@REM Set-ExecutionPolicy RemoteSigned
@REM Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned


