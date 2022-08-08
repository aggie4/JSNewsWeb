// API 출처 명시하기..!! 중요!
// https://app.newscatcherapi.com/dashboard/
let articles = []; //빈 배열을 만들어 놓는다.
let menus = document.querySelectorAll('#menu-list button'); // html에 있는 메뉴를 불러온다 , 클릭이벤트를 만들기 위해서
menus.forEach((menu) => menu.addEventListener('click', (event) => getNewsByTopic(event))); //foreach사용, 각각의 메뉴를 클릭하면 getNewsByTopic 함수 실행 event 클릭한 인자값 받기
let searchButton = document.getElementById('search-button'); // 버튼태그 연결
let url; // 전역변수로 만들어서 기존에 썼던 let을 지운다.
let page; // 전역변수
let totalPage = 1; // 전역변수

const getNews = async () => {
    //에러 핸들링 만들기.
    try {
        let header = new Headers({ 'x-api-key': 'iLhEJlB1qDCLavaq_8zd7iQTST7mIl0_iM7EZZUm2Vs' });
        url.searchParams.set('page', page);
        console.log('유알엘 잘 생김??', url);
        let response = await fetch(url, { headers: header });
        let data = await response.json();
        if (response.status == 200) {
            news = data.articles;
            console.log('내가 받은 데이터는?', data);
            if (data.total_hits == 0) {
                throw new Error('검색된 결과가 없습니다.');
            }
            totalPage = data.total_pages;
            page = data.page;
            render();
            pagention();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.log('잡힌 에러는?', error.message);
        errorRender(error.message);
    }

    // header = new Headers({ })
    // fetch = 대기상태를 말한다
    // async는 await 세트메뉴라고 생각하면 된다. "Response" 응답이 왔다는 의미
    // 펑션 앞에다가 async, fetch앞에다가 await
    // json() = 왠만한 서버통신에 사용한다. 객체랑 같다. 다만, "텍스트 타입"인 객체이다. 시간이 걸려서 await 사용, 데이터 통신이 많으면 오류가 발생할 수 있다, 5초 정도 있다가 새로고침 하면 된다.
    // news = 우리가 볼 뉴스가 담겨져있다.
    // articles = [] 빈 배열에 만든 이유는 데이터를 불러왔는데, 모든 컨텐츠가 articles에 담겨져 있어서.
    // render() = 브라우저에 표시 할 내용
};

/* 
    "코드 리팩토링"
    코드를 짜보니 중복부분이 많아서 코드가 더럽고 복잡해진다. 그래서 하나로 묶어서 사용한다.
    url부분에서 오류가 걸려 전역변수로 다시 만들었다.
    처음부터 할 필요는 없다. 코드를 다 짠 뒤에, 다시 작업을 하는 게 좋다.
*/

const getLatesNews = async () => {
    page = 1;
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    getNews();
};
// page = 1; 를 추가 , 새로운 페이지를 받을 때 1페이지로 가기 위해
// API 정보 불러오기  , 자바스크립트에서 제공해주는 툴 , url 클레스 이용하기
// new URL(`백틱 사용해서 링크 연결하기`) , 분석을 해준다

const getNewsByTopic = async (event) => {
    page = 1;
    //console.log('클릭 확인', event.target.textContent);
    let topic = event.target.textContent.toLowerCase();
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=10`);
    //console.log('url확인', url);
    getNews();
    console.log('토픽 뉴스 잘 나옴?', data);
};
/* 
    위에 만든 forEach문 즉 함수를 만든다.
    링크를 연결을 시켜서 ${topic}로 연결
    topic변수를 만들어서 버튼을 클릭을 했을 때 어떤 걸 클릭했는 지 구분하고 소문자로 바꾼다.
    toLowerCase() = 소문자로 만들어주는 함수
    위에 만든 header, response, data, news, render 를 복사하고 await가 있으니 함수 앞에 async를 붙혀서 오류가 나지 않게 만든다.
*/
const getNewsByKeyword = async () => {
    page = 1;
    // 1. 검색 키워드 읽어 오기
    // 2. 이거를 가지고 url에 검색 키워드 붙이기.
    // 3. header 준비
    // 4. url 부르기..
    // 5. 데이터 가지고 오기 ..
    // 6. 데이터 보여주기..
    let keyword = document.getElementById('search-input').value;
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=KR&page_size=10`);
    getNews();
    //위에 만든 header, response, data, news, render 를 복사하고 await가 있으니 함수 앞에 async를 붙혀서 오류가 나지 않게 만든다.
    //URL에 있는 from 즉 날짜를 지운다.
};
/* 
    버튼이 클릭 됐을 때의 함수,
    화살표 함수를 만들면 순서가 매우매우 중요하다.
    모든 것은 정의 하고 난 뒤에 사용 가능, 특히 let const
    정의를 하고 난 뒤에 사용이 되기 때문에 searchButton.addEventListener('click', getNewsByKeyword); 키워드를 아래로 옮김.
    호이스팅 때문에 오류가 나기 때문에 정의를 하고 난 뒤에 사용하기 때문에 아래로 옮겼다.
    일반함수로 사용하게 되면 옮기지 않아도 된다 추가로 onclick도 가능하다.
    자세한 내용은 프로젝트3 기본원리에 있다.
*/
const render = () => {
    let newsHTML = '';

    newsHTML = news
        .map((news) => {
            return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${news.media || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'}" alt="뉴스 이미지" />
        </div>
        <div class="col-lg-8">
            <h4><a href="${news.link}" class="news-link" target="_blank">${news.title}</a></h4>
            <p>${news.summary == null || news.summary == '' ? '내용 없음' : news.summary.length > 200 ? news.summary.substring(0, 200) + '...' : news.summary}</p>
            <div>${news.rights || 'No source'} * ${moment(news.published_date).fromNow()}</div>
        </div>
    </div>`;
            // 링크타고 넘어가는 방법
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
const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">${message}</div>`;
    document.getElementById('news-board').innerHTML = errorHTML;
};
/* 
    errorRender 함수를 생성
    부트스트랩에 있는 경고창을 갖다 쓰고 ${메세지}를 동적으로 추가를 한 뒤,
    브라우저에 나타나게 설정
*/
const pagention = () => {
    let pagentionHTML = ``;
    // 1. 토탈페이지 수를 알아야 한다.
    // 2. 내가 현제 어떤 페이지를 보고 있는 지를 알아야 한다.
    // 3. 페이지 그룹을 찾아야 한다.
    // 4. 이 그룹을 베이스로 마지막 페이지가 뭔지 찾고,
    // 5. 첫번째 페이지가 뭔지를 찾고,
    // 6. 첫페이지부터 마지막까지 프린트, 출력해주기.
    let pageGroup = Math.ceil(page / 5); //3번
    let last = pageGroup * 5; //4번

    if (last > totalPage) {
        // last 가, 마지막 그룹이 5개 이하라면..
        last = totalPage;
    }
    let first = last - 4 <= 0 ? 1 : last - 4; //5번
    // 페이지가 5개보다 작다면 숨기는 방법

    if (first >= 6) {
        pagentionHTML = `<li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick = "moveToPage(1)">
    <span aria-hidden="true">&laquo;</span>
    </a></li>
    <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick = "moveToPage(${page - 1})">
    <span aria-hidden="true">&lt;</span>
    </a></li>`;
    }
    // 페이지 숨기는 방법
    for (let i = first; i <= last; i++) {
        pagentionHTML += `<li class="page-item ${page == i ? 'active' : ''}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
    } // onclick함수추가해서 만들기. ${i}를 추가해서 어떤 페이지인지 알려준다. 페이지를 눌러도 아무런 변화가 없기 때문에

    if (last < totalPage) {
        pagentionHTML += `
    <li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onclick = "moveToPage(${page + 1})">
    <span aria-hidden="true">&gt;</span>
    </a></li>

    <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick = "moveToPage(${totalPage})">
    <span aria-hidden="true">&raquo;</span>
    </a></li>`;
        //마지막 페이지로 옮기는 것 안됨.. 뭐가 문제인 지 모르겠음 totalPage
    }
    document.querySelector('.pagination').innerHTML = pagentionHTML;
};
const moveToPage = (pageNumber) => {
    // 페이지 이동
    // 1. 우리가 이동하고 싶은 페이지를 알아야 한다. 1인지 8인지 19인지 143인지..
    // 2. 이 페이지를 가지고, API를 호출해준다.
    console.log(pageNumber);
    page = pageNumber;
    getNews();
};
/* 
    페이지네이션 만들기.
    total page : 15
    page(현재 보고 있는 페이지) : 12
    page Group : 3
    5칸씩 보여주고 싶다 가정하에)
    1,2,3,4,5
    1번그룹 : 1 ~ 5
    2번그룹 : 6 ~ 10
    3번그룹 : 11 ~ 15
    공식 : ex) 12페이지가 있다 5페이지로 보여주고 싶다하면 12 나누기 5 그냥 올림 하면 3 그룹 찾는 방법 = Math.ceil() 올림 할 때 쓰는 함수
    마지막을 구하는 방법  = 그룹 * 5

*/
searchButton.addEventListener('click', getNewsByKeyword); // 버튼이 클릭됐을 때 함수 실행
getLatesNews();
