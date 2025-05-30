import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();

  // 이 부분은 추후 실제 DB나 상태에서 가져오도록 구현 가능
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>책 상세 페이지</h1>
      <p><strong>책 ID:</strong> {id}</p>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <h3>줄거리</h3>
        <p>이 책의 줄거리를 여기에 표시합니다. (책 ID에 따라 다르게 보여줄 수 있음)</p>
      </div>
    </div>
  );
};

export default BookDetail;
