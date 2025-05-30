import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const sampleBooks = [
  { id: 1, title: '리액트를 다루는 기술', category: '프로그래밍', createdAt: '2025-05-30' },
  { id: 2, title: '자바의 정석', category: '프로그래밍', createdAt: '2025-05-28' },
  { id: 3, title: '불편한 편의점', category: '소설', createdAt: '2025-05-25' },
  { id: 4, title: '해리포터', category: '판타지', createdAt: '2025-05-22' },
];

export const BookList = () => {
  const [books, setBooks] = useState(sampleBooks);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>글 목록</h1>
      <button style={{ marginBottom: '20px' }}>등록</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {books.map(book => (
          <li
            key={book.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '60px',
                  height: '80px',
                  backgroundColor: '#eee',
                  marginRight: '15px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#888',
                }}
              >
                이미지
              </div>
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>{book.title}</h3>
                <p style={{ margin: 0 }}>카테고리: {book.category}</p>
                <p style={{ margin: 0, fontSize: '0.9em', color: '#555' }}>
                  등록일: {book.createdAt}
                </p>
              </div>
            </div>

            <Link to={`/book/${book.id}`}>
              <button>보기</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
