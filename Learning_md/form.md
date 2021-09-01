<form action="http://localhost:3000" method="post">
  <p><input type="text" name="title"></p>
  <p><textarea name="description"></textarea></p>
  <p><button type="submit"><p>
</form>

> 버튼 클릭 시, action에 있는 주소로 데이터를 전송 함.
> 전송하기 위해서는 각 요소에 이름이 있어야됨.

> 서버에서 데이터를 가져올때는 "localhose:3000/?id=~~"와 같이 query형식으로 쓰임.
> form에 method="get"혹은 생략

> 서버에 데이터를 생성,수정,삭제와 같은 수정행위를 가할때는,
> form에 method="post"
