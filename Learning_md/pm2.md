PM2란?

> 우리가 만들 프로세스를 감시하다가, 꺼지면 다시켜주는 감시 역할을 해줌.
> 파일에 수정이 되는지 관찰하고 있다가, 파일이 수정되면 자동으로 프로그램을 껐따 켜줘서
> 수정할때마다 수동으로 껐다켰다 안해줘도됨

PM2 function

> pm2 start 파일이름.js
> pm2 start 파일이름.js --watch
> pm2 monit (q 를 눌러 나가기)
> pm2 list : 현재 실행되고 있는 process들의 리스트
> pm2 stop main
> pm2 log (문제점이 있으면 화면에 보여줌)
> pm2 kill : pm2관련된것들 다 꺼버림
> pm2 start 파일이름.js --watch --no-daemon : pm2를 시작과 동시에 로그도 켜지게 하는 것. (나가기는 컨트롤+c)
> ->daemon :백그라운드로 실행되는 프로그램을 일걷는 단어
> 그러므로 위 뜻은 데몬이 아닌상태로 실행되게 하라는 뜻.
> pm2 start 파일이름.js --watch --ignore-watch="data/\*" --no-daemon : data디렉토리에 있는 모든 파일에 대해서, create, update delte등을 해도, pm2프로그램이 다시 꺼졌다 켜지지 않게함. 꺼졌다 켜지면 그전에 저장했던 메모리, 데이터가 사라지므로 프로젝트를 하다보면 곤란한 상황이 있을수도 있으므로, 사전에 방지하기위해 이렇게 실행하는것이 좋음.

> "data/_ section/_" data와 section디렉토리에 있는 파일 모두다를 가리킴.
