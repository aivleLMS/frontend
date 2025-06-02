# 도서관리시스템

# 📘 AIVLE LMS Frontend - AI 기반 도서 표지 생성 웹

React 기반 도서 등록/조회 UI + OpenAI DALL·E API 연동

KT AIVLE SCHOOL 4차 미니 프로젝트

> 사용자가 도서 정보를 입력하면, AI가 자동으로 표지를 생성해주는 도서 관리 웹 애플리케이션입니다.
> 
> 
> 본 레포지토리는 프론트엔드(React) UI 및 OpenAI 연동 로직을 포함합니다.
> 


---
## 🛠️ 기술 스택

| 구분 | 사용 기술 / 도구 |
| --- | --- |
| **Frontend** | React 18, React Router, Axios, MUI (Material UI) |
| **API 연동** | OpenAI API (DALL·E image generation) |
| **상태 관리** | useState, useEffect (React 기본 훅) |
| **스타일링** | MUI 컴포넌트 기반 커스터마이징 |
| **HTTP 통신** | Axios 인스턴스를 통한 REST API 연동 |
| **이미지 처리** | OpenAI DALL·E API로 표지 이미지 생성 및 프리뷰 렌더링 |
| **데이터 처리** | 도서 등록, 수정, 삭제, 상세 조회 API 연동 |
| **라우팅** | react-router-dom을 통한 SPA 라우팅 처리 |
| **기타** | 로컬스토리지(LocalStorage)를 통한 사용자 정보 저장 |


---
## 📡 API 연동 및 기능 구현

### ✅ OpenAI API를 활용한 도서 표지 생성

- 사용자가 도서 제목과 내용을 입력하면, 해당 내용을 기반으로 DALL·E 모델을 이용해 표지 이미지를 생성합니다.
- 이미지 생성은 `generateBookCoverImage()` 함수를 통해 수행되며, 프롬프트 문장은 사용자가 입력한 제목/내용을 조합해 자동 생성됩니다.
- 생성된 이미지 URL을 미리보기로 보여주고, 서버에 함께 저장되도록 구성했습니다.

```jsx
const prompt = `다음 설명을 바탕으로 한 도서 표지 일러스트를 그려주세요.\n제목: ${title}\n내용: ${story}`;
const imageUrl = await generateBookCoverImage(apiKey, prompt);
```

### 📚 도서 관리 기능

- **도서 등록 / 수정 / 삭제 / 조회** 기능은 `bookService.js`를 통해 백엔드와 REST API로 통신합니다.
- Axios 인스턴스를 활용하여 공통 baseURL 및 에러 핸들링을 적용했습니다.

**주요 API 함수**

```jsx
export const fetchBooks = (title = '') => axiosInstance.get('/books', { params: { title } });
export const fetchBookById = (id) => axiosInstance.get(`/books/${id}`);
export const createBook = (bookData) => axiosInstance.post('/books', bookData);
export const updateBook = (id, bookData) => axiosInstance.put(`/books/${id}`, bookData);
export const deleteBook = (id) => axiosInstance.delete(`/books/${id}`);
```

### 📚 도서 API 명세서

| 기능 | 메서드 | 경로 | 요청 Body 예시 | 응답 예시 |
| --- | --- | --- | --- | --- |
| 도서 목록 조회 | `GET` | `/api/books` | *(없음)*  `?title=검색어` | `[{ id, title, ... }]` |
| 도서 상세 조회 | `GET` | `/api/books/{id}` | *(없음)* | `{ id, title, story, ... }` |
| 도서 등록 | `POST` | `/api/books` | `{<br> title: "제목",<br> story: "내용",<br> category: "NOVEL",<br> bookCoverUrl: "https://...",<br> userId: "minji"<br>}` | `{ data: { id: 1, ... } }` |
| 도서 수정 | `PUT` | `/api/books/{id}` | `{<br> title: "수정된 제목",<br> story: "수정된 내용",<br> ...<br>}` | `{ data: { id: 1, ... } }` |
| 도서 삭제 | `DELETE` | `/api/books/{id}` | *(없음)* | `{ message: "삭제 완료" }` |

### 🔐 사용자 정보 처리

- **로컬 테스트 시**에는 `localStorage`를 활용하여 `username`과 OpenAI API 키(`token`)를 수동으로 설정하여 테스트했습니다.
- **팀 최종 구현에서는** 사용자가 직접 `로그인 페이지`에서 정보를 입력하고, 이를 통해 사용자 인증 및 API 키 설정이 가능하도록 구성되어 있습니다.
    - 로그인 (`/`)
    - 사용자 정보 확인 (`/userinfo`)

---

### 🖥️ 화면 구성 및 주요 UI 설명

이 프로젝트는 React Router를 사용하여 페이지 전환이 이루어지며, 각 주요 페이지는 `pages/` 폴더에 정의되어 있습니다.

Material UI(MUI)를 기반으로 일관된 디자인 요소(버튼, 카드, 입력창 등)를 사용하며, 사용자 경험을 고려해 반응형 스타일이 적용되어 있습니다.

<aside>
💡

**Page**

</aside>

### 1. `BookList.jsx`

- 등록된 도서들의 목록을 보여주는 컴포넌트입니다.
- 도서들의 제목, 저자, 출판일 등의 기본 정보를 리스트 형태로 출력합니다.
- 각 도서를 클릭하면 상세 페이지(`BookDetail.jsx`)로 이동할 수 있습니다.
- RegisterBook.jsx와 BookDetail.jsx로 와연결되어있습니다.

### 2. `RegisterBook.jsx`

- 새 도서를 등록할 수 있는 폼 컴포넌트입니다.
- 제목, 내용,카테고리  도서 정보를 입력 받아 등록 처리합니다.
- 등록 이미지를 openAI와 연결하여 글에 관련된 표지를 생성 시킵니다.

### 3. `EditBook.jsx`

- 기존 도서 정보를 수정할 수 있는 컴포넌트입니다.
- 선택한 도서의 현재 정보를 불러와서 수정 폼을 제공합니다.
- 수정 완료 후 도서 상세 페이지로 이동합니다.

### 4. `BookDetail.jsx`

- 개별 도서의 상세 정보를 보여주는 컴포넌트입니다.
- 도서의 제목,  출판일, 상세 설명 등을 표시합니다.
- 도서 수정(`EditBook.jsx`) 및 삭제 기능을 포함할 수 있습니다.

## 📝 작성자

- 강서연
- 최민지
- 현승아
