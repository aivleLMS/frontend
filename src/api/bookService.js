import axiosInstance from "./axiosInstance";

//도서 목록 조회
export const fetchBooks = async (title = "") => {
  try {
    const response = await axiosInstance.get("/books", {
      params: { title },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

//도서 상세 조회
export const fetchBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`/books/${id}`);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

//도서 등록
export const createBook = async (bookData) => {
  try {
    const response = await axiosInstance.post(`/books`, bookData);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

//도서 수정
export const updateBook = async (id, bookData) => {
  try {
    const response = await axiosInstance.put(`/books/${id}`, bookData);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

//도서 삭제
export const deleteBook = async (id) => {
  try {
    const reponse = await axiosInstance.delete(`/books/${id}`);
    return reponse.data.message;
  } catch (error) {
    handleError(error);
  }
};

//공통 에러
function handleError(error) {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 401 || status === 400) {
      alert(data.message);
    } else if (status === 500) {
      alert("서버 오류");
    } else {
      alert("네트워크 오류");
    }
    throw error;
  }
}
