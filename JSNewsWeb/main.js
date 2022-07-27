let articles = []; //빈 배열을 만들어 놓는다.

const getLatesNews = async () => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=food&page_size=2`);
    let header = new Headers({ 'x-api-key': 'iLhEJlB1qDCLavaq_8zd7iQTST7mIl0_iM7EZZUm2Vs' });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    console.log(news);
};
getLatesNews();
// API 정보 불러오기  , 자바스크립트에서 제공해주는 툴 , url 클레스 이용하기
// new URL(`백틱 사용해서 링크 연결하기`) , 분석을 해준다
// header = new Headers({ })
// fetch = 대기상태를 말한다
// async는 await 세트메뉴라고 생각하면 된다. "Respones" 응답이 왔다는 의미
// 펑션 앞에다가 async, fetch앞에다가 await
// json() = 왠만한 서버통신에 사용한다. 객체랑 같다. 다만, "텍스트 타입"인 객체이다. 시간이 걸려서 await 사용, 데이터 통신이 많으면 오류가 발생할 수 있다, 5초 정도 있다가 새로고침 하면 된다.
// articles = [] 빈 배열에 만든 이유는 데이터를 불러왔는데 모든 컨텐츠가 articles에 담겨져 있었다.
