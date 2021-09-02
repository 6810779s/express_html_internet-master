sanitize-html

> npm install -S sanitize-html
> -S는 이 프로젝트 안에서만
> -g는 전역에서

sanitize-html 사용법

> 1. 설치
> 2. 선언 lwt sanitizeHtml = require('sanitize-html');
> 3. let sanitizedTitle = sanitizeHtml(title);
> 4. sanitizeHtml로 등록한 거에서는, 업데이트시 <scrip>태그등이 들어가도
>    알아서 다 걸러줌.
> 5. 허용하고 싶은 태그가 있다면, sanitizedTitle = sanitizeHtml(title, {
>    allowedTags: ['b', 'h1','h2','strong'],
>    allowedAttributes:{
>    'a':['href']
>    }, });
