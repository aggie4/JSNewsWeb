let articles = []; //빈 배열을 만들어 놓는다.

const getLatesNews = async () => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    let header = new Headers({ 'x-api-key': 'iLhEJlB1qDCLavaq_8zd7iQTST7mIl0_iM7EZZUm2Vs' });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    console.log(news);
    render();
};
const render = () => {
    let newsHTML = '';

    newsHTML = news
        .map((news) => {
            return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${news.media || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'}" alt="뉴스 이미지" />
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.summary == null || news.summary == '' ? '내용 없음' : news.summary.length > 200 ? news.summary.substring(0, 200) + '...' : news.summary}</p>
            <div>${news.rights || 'No source'} * ${moment(news.published_date).fromNow()}</div>
        </div>
    </div>`;
        })
        .join('');
    /* ``동적인 값을 추가 할 수 있어서 ${}를 써서 사진과 내용을 변경 */
    /* map()각자 배열이라 , 가 있다. 스트링타입으로 변경을 해서 , 를 없앤다. = .join('') */
    /*
        <img class="news-img-size" src="${news.media || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'}" alt="뉴스 이미지" />
        만약 사진이 있다면 사진을 보여주고 만약 사진이 없다면 다른 이미지를 보여준다.
    */
    /*
        <p>${news.summary == null || news.summary == '' ? '내용 없음' : news.summary.length > 200 ? news.summary.substring(0, 200) + '...' : news.summary}</p>
        A ? B : C ? D : E
        null = 비었다면 , 내용없음 표시 , 만약 있다면 길이가 200보다 크다면 substring(잘라내기) (0, 200)를 자르고 ... 을 붙혀서 보여주고 작다면 그냥 summary보여줘라 라는 뜻
    */
    /* 
        moment() 함수는 링크를 걸어서 사용하게 만들고 나서 사용자가 시간을 볼 수 있도록 하는 함수
        fromNow() = 현재 날짜 및 시간을 기준으로 상대적인 시간 구하기 
    */
    document.getElementById('news-board').innerHTML = newsHTML;
};
getLatesNews();
// API 정보 불러오기  , 자바스크립트에서 제공해주는 툴 , url 클레스 이용하기
// new URL(`백틱 사용해서 링크 연결하기`) , 분석을 해준다
// header = new Headers({ })
// fetch = 대기상태를 말한다
// async는 await 세트메뉴라고 생각하면 된다. "Respones" 응답이 왔다는 의미
// 펑션 앞에다가 async, fetch앞에다가 await
// json() = 왠만한 서버통신에 사용한다. 객체랑 같다. 다만, "텍스트 타입"인 객체이다. 시간이 걸려서 await 사용, 데이터 통신이 많으면 오류가 발생할 수 있다, 5초 정도 있다가 새로고침 하면 된다.
// news = 우리가 볼 뉴스가 담겨져있다.
// articles = [] 빈 배열에 만든 이유는 데이터를 불러왔는데, 모든 컨텐츠가 articles에 담겨져 있어서.
// render() = 브라우저에 표시 할 내용
