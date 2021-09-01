PM2란?

> 우리가 만들 프로세스를 감시하다가, 꺼지면 다시켜주는 감시 역할을 해줌.
> 파일에 수정이 되는지 관찰하고 있다가, 파일이 수정되면 자동으로 프로그램을 껐따 켜줘서
> 수정할때마다 수동으로 껐다켰다 안해줘도됨

PM2 function

> pm2 start 파일이름.js
> pm2 start 파일이름.js --watch
> pm2 monit (q 를 눌러 나가기)
> pm2 list
> pm2 stop main
> pm2 log (문제점이 있으면 화면에 보여줌)
