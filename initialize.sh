clear
echo "
###############################################
#          INSTALANDO DEPENDENCIAS            #
###############################################
"
cd ./backend
npm install --quiet
wait
cd ..
clear
# 
cd ./frontend
npm install --quiet
wait
cd ..
clear

echo "
###############################################
#             INICIANDO APLICACAO             #
###############################################
"

gnome-terminal --window --working-directory=$PWD/backend --title="backend" -- npm start
wait
sleep 5
gnome-terminal --window --working-directory=$PWD/frontend --title="frontend" -- npm start

clear
echo "
###############################################
#             APLICACAO INICIADA              #
#    Frontend: http://localhost:3000/login    #
#  Backend: http://localhost:4000/helloworld  #
###############################################"

google-chrome http://localhost:3000/login